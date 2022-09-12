import axios from "axios"

export const saveCart = async (token, cart) => {
    return await axios.put('http://167.172.148.55:3000/api/carts', {items: cart}, {
        headers: {}
    })
}