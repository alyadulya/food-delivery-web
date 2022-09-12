import axios from "axios";

export const getTags = async () => {
    return await axios.get(`http://167.172.148.55:3000/api/tags`)
}