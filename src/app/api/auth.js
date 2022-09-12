import axios from 'axios';

 export const registerUser = async(data) => {
    return await axios.post('http://167.172.148.55:3000/auth/register', data);
}

 export const loginUser = async(data) => {
    return await axios.post('http://167.172.148.55:3000/auth/login', data);
}

export const logoutUser = async() => {
    let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post('http://167.172.148.55:3000/auth/login', null, {
        headers: {
            authorization : `Bearer ${token}`
        }
    }).then(res => {
        localStorage.removeItem('auth');
        return res
    });
}