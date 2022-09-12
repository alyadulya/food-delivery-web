import axios from "axios";

export const getCategories = async () => {
    return await axios.get('http://167.172.148.55:3000/api/categories')
}