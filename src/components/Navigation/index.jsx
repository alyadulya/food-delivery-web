import { useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, setKeyword } from "../../app/features/Product/action";

const Navigation = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

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
                <form className="d-flex" role="search">
                    <div className="input-group">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={event => dispatch(setKeyword(event.target.value))} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary rounded-0 me-2" type="submit"><FaSearch /></button>
                        </div>
                    </div>
                    <button className="btn btn-primary position-relative me-2">
                        <FaShoppingCart />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            0
                            <span className="visually-hidden">cart</span>
                        </span>
                    </button>
                    <button className="btn btn-primary">
                        <FaUserAlt />
                    </button>
                </form>
            </div>
        </nav>
    )
}

export default Navigation;