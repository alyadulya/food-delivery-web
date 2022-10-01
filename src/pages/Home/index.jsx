import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BounceLoader } from "react-spinners";
import { fetchCategories } from "../../app/features/Category/action";
import { fetchProducts, setCategory, setTags } from "../../app/features/Product/action";
import { fetchTags } from "../../app/features/Tag/action";
import { useDocumentTitle } from "../../app/utils";
import CategorySelection from "../../components/CategorySelection";
import ProductPlaceholder from "../../components/ProductPlaceholder";
import Products from "../../components/Products";
import Tag from "../../components/Tag";

const Home = () => {
    useDocumentTitle('Home');
    
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const tags = useSelector(state => state.tags);
    const [categoryValue, setCategoryValue] = useState('');

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
        dispatch(fetchTags())
    }, [dispatch, products.currentPage, products.keyword, products.category, products.tags]);

    return(
        <div className="row">
            <p>Home</p>
            <div className="col-3 mb-3">
                <CategorySelection
                    value={categoryValue}
                    onChange={event => {
                        dispatch(setCategory(event.target.value));
                        setCategoryValue(event.target.value);
                    }} 
                />
            </div>
            <p>
                <b>Tags: </b>
                {
                    tags.status === 'process' ?
                        <button className="btn btn-outline-primary rounded-5 tag disabled">
                            <BounceLoader size={15} color="#0d6efd" speedMultiplier={2} cssOverride={{'marginTop': '3px'}} /> Loading...
                        </button>
                        :
                        tags.data.map((tag, key) =>
                            <Tag
                                name={tag.name}
                                isActive={[...products.tags].includes(tag.name)}
                                onClick={() => {
                                    if (![...products.tags].includes(tag.name)) {
                                        dispatch(setTags([...products.tags, tag.name]));
                                    } else {
                                        let tags = [...products.tags];
                                        tags.splice(tags.indexOf(tag.name), 1);
                                        delete products.tags;
                                        dispatch(setTags(tags));
                                    }
                                }}
                                key={key}
                            />
                        )
                }
            </p>
            {
                products.status === 'process' ?
                    <div className="row row-cols-1 row-cols-md-4">
                        <ProductPlaceholder />
                        <ProductPlaceholder />
                        <ProductPlaceholder />
                        <ProductPlaceholder />
                    </div>

                    :

                    products.data.length === 0 ?
                        <div className="row">
                            <h2>No results</h2>
                        </div>

                        :

                        <Products />
            }
        </div>
    )
}

export default Home;