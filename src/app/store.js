import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./features/Auth/reducer";
import cartReducer from "./features/Cart/reducer";
import categoryReducer from "./features/Category/reducer";
import productReducer from "./features/Product/reducer";
import tagReducer from "./features/Tag/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    tags: tagReducer,
    cart: cartReducer
})

const store = legacy_createStore(
    rootReducers,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;