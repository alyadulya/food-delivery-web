import { FaTag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTags } from "../../app/features/Product/action";
import './index.css';

const Tag = ({ name }) => {
    const dispatch = useDispatch();
    return(
        <button className="btn btn-secondary rounded-5 tag" data-bs-toggle="button" onClick={() => dispatch(setTags(name))}>
            <FaTag /> {name}
        </button>
    )
}

export default Tag;