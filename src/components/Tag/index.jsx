import { FaTag } from "react-icons/fa";
import './index.css';

const Tag = ({ name, isActive = true, onClick }) => {
    return(
        <button className={ !isActive ? "btn btn-secondary rounded-5 tag" : "btn btn-primary rounded-5 tag"} data-bs-toggle="button" onClick={onClick}>
            <FaTag /> {name}
        </button>
    )
}

export default Tag;