import { useState } from "react";
import { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader, BounceLoader } from "react-spinners";
import { fetchCategories } from "../../app/features/Category/action";
// import { useNavigate } from "react-router";
import { fetchProducts, setCategory } from "../../app/features/Product/action";
import { fetchTags } from "../../app/features/Tag/action";
import { formatRupiah } from "../../app/utils";
import Tag from "../../components/Tag";

const Home = () => {
    // const history = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);
    const tags = useSelector(state => state.tags);
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
        dispatch(fetchTags())
    }, [dispatch, products.currentPage, products.keyword, products.category, products.tags]);

    return(
        <div className="row">
            <p>Home</p>
            <div className="col-3 mb-3">
                <select className="form-select" aria-label="Default select example" value={value} onChange={event => {dispatch(setCategory(event.target.value)); setValue(event.target.value);}}>
                    <option value="">All categories</option>
                    {
                        categories.status === 'process' ?
                            <option>Loading...</option>
                            :
                            categories.data.map((category, key) =>
                                <option value={category.name} key={key}>{category.name}</option>
                            )
                    }
                </select>
            </div>
            <p>
                <b>Tags: </b>
                {
                    tags.status === 'process' ?
                        <button className="btn btn-outline-primary rounded-5 tag disabled">
                            <BounceLoader size={15} color={'#0d6efd'} speedMultiplier={2} cssOverride={{'margin-top': '3px'}} /> Loading...
                        </button>
                        :
                        tags.data.map((tag, key) =>
                            <Tag name={tag.name} key={key} />
                        )
                }
            </p>
                {
                    products.status === 'process' ?
                        <div className="row justify-content-center">
                            <div className="col-4">
                                <BarLoader width={500} color={'#0d6efd'} speedMultiplier={2} />
                            </div>
                        </div>
    
                        :
    
                        products.data.length === 0 ?
                            <div className="row">
                                <h2>No results</h2>
                            </div>

                            :

                            <div className="row row-cols-1 row-cols-md-4">
                                {
                                    products.data.map((product, key) =>
                                        <div className="col" key={key}>
                                            <div className="card h-100">
                                                <img src={`http://167.172.148.55:3000/images/products/${product.image_url}`} className="card-img-top" style={{ height: '212px', objectFit: 'cover' }} alt={product.name} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p className="card-text">{product.category.name}</p>
                                                    <Tag name={product.tags.name} />
                                                    <p className="mt-2">{formatRupiah(product.price)}</p>
                                                    <button className="btn btn-primary" type="submit"><FaCartPlus /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                }
                {/* <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Burger</h5>
                            <p className="card-text">Makanan</p>
                            <Tag name="burger" />
                            <p>Rp 18.000</p>
                            <button className="btn btn-primary" type="submit"><FaCartPlus /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Triple Burger</h5>
                            <p className="card-text">Makanan</p>
                            <Tag name="burger" />
                            <p>Rp 33.000</p>
                            <button className="btn btn-primary" type="submit"><FaCartPlus /></button>
                        </div>
                        </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Burger Package</h5>
                            <p className="card-text">Makanan</p>
                            <Tag name="burger" />
                            <p>Rp 51.000</p>
                            <button className="btn btn-primary" type="submit"><FaCartPlus /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Hot Americano</h5>
                            <p className="card-text">Minuman</p>
                            <Tag name="coffee" />
                            <p>Rp 14.000</p>
                            <button className="btn btn-primary" type="submit"><FaCartPlus /></button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Doubleshot Espresso</h5>
                            <p className="card-text">Minuman</p>
                            <Tag name="coffee" />
                            <p>Rp 12.000</p>
                            <button className="btn btn-primary" type="submit"><FaCartPlus /></button>
                        </div>
                    </div>
                </div><div className="col">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Cappucino ice</h5>
                            <p className="card-text">Minuman</p>
                            <Tag name="coffee" />
                            <p>Rp 16.000</p>
                            <button className="btn btn-primary" type="submit"><FaCartPlus /></button>
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
        </div>
    )
}

export default Home;