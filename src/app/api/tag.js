import axios from "axios";
import { config } from "../../config";

export const getTags = async () => {
    return await axios.get(`${config.api_host}/api/tags`)
}