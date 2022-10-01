import { useSelector } from "react-redux";

const CategorySelection = ({ value, onChange }) => {
    const categories = useSelector(state => state.categories);

    return (
        <select className="form-select" aria-label="Select category" value={value} onChange={onChange}>
            <option value="">All categories</option>
            {
                categories.status === 'process' ?
                    <option>Loading...</option>
                    :
                    categories.data.map((category, key) =>
                        <option value={category.name} key={key}>
                            {category.name}
                        </option>
                    )
            }
        </select>
    )
}

export default CategorySelection;