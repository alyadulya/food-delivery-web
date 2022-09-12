import {USER_LOGIN, USER_LOGOUT} from './constant';

const intialState = localStorage.getItem('auth') ?
                        JSON.parse(localStorage.getItem('auth')) :
                        {user : null, token: null};

export default function authReducer( state = intialState, {type, payload}) {
    switch (type) {

        case USER_LOGIN :
            return {user: payload.user, token: payload.token}

        case USER_LOGOUT : 
            return {user : null, token : null}

        default :
            return state
        
    }
}