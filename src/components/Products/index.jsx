import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { addItem } from "../../app/features/Cart/action";
import { setTags } from "../../app/features/Product/action";
import { formatRupiah } from "../../app/utils";
import { config } from "../../config";
import Tag from "../Tag";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const auth = useSelector(state => state.auth);

    return (
        <div className="row row-cols-1 row-cols-md-4">
            {
                products.data.map((product, key) =>
                    <div className="col" key={key}>
                        <div className="card h-100">
                            <img
                                src={`${config.api_host}/images/products/${product.image_url}`} 
                                className="card-img-top"
                                style={{ height: '212px', objectFit: 'cover' }}
                                alt={product.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {product.name}
                                </h5>
                                <p className="card-text">
                                    {product.category.name}
                                </p>
                                <Tag 
                                    name={product.tags.name}
                                    isActive={
                                        [...products.tags].includes(product.tags.name)
                                    }
                                    onClick={() => {
                                        if (![...products.tags].includes(product.tags.name)) {
                                            dispatch(setTags([...products.tags, product.tags.name]));
                                        } else {
                                            let tags = [...products.tags];
                                            tags.splice(tags.indexOf(product.tags.name), 1);
                                            delete products.tags;
                                            dispatch(setTags(tags));
                                        }
                                    }}
                                />
                                <p className="mt-2">
                                    {formatRupiah(product.price)}
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={_ => {
                                        const { token } =
                                            localStorage.getItem('auth') ?
                                                JSON.parse(localStorage.getItem('auth'))
                                                :
                                                {};

                                        if (!token) {
                                            swal({
                                                text: "Login untuk menambah item ke keranjang!",
                                                icon: "warning"
                                            })
                                        } else {
                                            dispatch(addItem({...product, user: auth.user._id}));
                                        }
                                    }}
                                    title="Tambah ke keranjang"
                                >
                                    <FaCartPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Products;