import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearItems, removeItem, setItems } from "../../app/features/Cart/action";
import store from "../../app/store";
import { formatRupiah, sumPrice, useDocumentTitle } from "../../app/utils";
import { config } from "../../config";

const Cart = () => {
    useDocumentTitle('Cart');

    const cartItems = useSelector(state => state.cart);
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="card">
            <div className="card-header">
                Keranjang belanja
            </div>
            {
                !cartItems.length ?
                    <div className="card-body text-center">
                        <h5 className="card-text mb-4">
                            Belum ada item di keranjang
                        </h5>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>
                            Tambahkan item
                        </button>
                    </div>

                    :

                    token ?
                        <>
                            <div className="card-body">
                                <h3 className="card-title">
                                    Sub total: {formatRupiah(sumPrice(cartItems))}
                                </h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Gambar</th>
                                            <th scope="col">Barang</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col" style={{ width: '7%' }}>Hapus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.map((cartItem, key) => 
                                                <tr key={key}>
                                                    <td>
                                                        <img
                                                            src={
                                                                `${config.api_host}/images/products/${cartItem.image_url}`
                                                            }
                                                            style={{
                                                                height: '32px',
                                                                width: '32px',
                                                                objectFit: 'cover'
                                                            }}
                                                            alt={cartItem.name}
                                                        />
                                                    </td>
                                                    <td>
                                                        {cartItem.name}
                                                    </td>
                                                    <td>
                                                        {formatRupiah(cartItem.price)}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => {
                                                                cartItems.splice(
                                                                    cartItems.findIndex(x => x._id === cartItem._id),
                                                                    1,
                                                                    {
                                                                        ...cartItem,
                                                                        qty: cartItem.qty - 1
                                                                    }
                                                                );
                                                                store.dispatch(setItems([...cartItems]));
                                                            }}
                                                            disabled={cartItem.qty === 1}
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                        <span className="mx-1">
                                                            {` ${cartItem.qty} `}
                                                        </span>
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => {
                                                                cartItems.splice(
                                                                    cartItems.findIndex(x => x._id === cartItem._id),
                                                                    1,
                                                                    {
                                                                        ...cartItem,
                                                                        qty: cartItem.qty + 1
                                                                    }
                                                                );
                                                                store.dispatch(setItems([...cartItems]));
                                                            }}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => dispatch(removeItem(cartItem))}
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer d-grid gap-2">
                                <Link to="/checkout" className="btn btn-primary">
                                    Checkout
                                </Link>
                                <Link to="/" className="btn btn-secondary">
                                    Add more item
                                </Link>
                                <button className="btn btn-danger" onClick={() => dispatch(clearItems())}>
                                    Remove all items
                                </button>
                            </div>
                        </>

                        :

                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to="/login" style={{ textDecorationLine: 'none' }}>Login</Link> untuk menambah item ke keranjang
                            </h5>
                        </div>
            }
        </div>
    )
}

export default Cart;