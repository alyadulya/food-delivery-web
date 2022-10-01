import { useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, setKeyword } from "../../app/features/Product/action";

const Navigation = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch, products.currentPage, products.keyword, products.category, products.tags]);

    return(
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand mb-1">Eduwork Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <form className="d-flex align-items-center" role="search">
                    <div className="input-group" title="Search product">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={event => dispatch(setKeyword(event.target.value))} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary rounded-0 me-2" type="submit"><FaSearch /></button>
                        </div>
                    </div>
                    <Link to="/cart" className="btn btn-primary position-relative me-3" title="Cart">
                        <FaShoppingCart />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {token ? cart.length : 0}
                            <span className="visually-hidden">cart</span>
                        </span>
                    </Link>
                    {
                        auth.user ?
                            <div className="dropdown text-end">
                                <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title="Account">
                                    <FaUserAlt />
                                </button>
                                <ul className="dropdown-menu text-small">
                                    <li>
                                        <Link to="/account" className="dropdown-item">
                                            {auth.user.full_name}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/logout" className="dropdown-item">Log out</Link>
                                    </li>
                                </ul>
                            </div>

                            :

                            <Link to="/login" className="btn btn-primary" title="Login">
                                <FaUserAlt />
                            </Link>
                    }
                </form>
            </div>
        </nav>
    )
}

export default Navigation;