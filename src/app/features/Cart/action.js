import { ADD_ITEM, CLEAR_ITEMS, REMOVE_ITEM, SET_ITEMS } from "./constant"

export const addItem = item => {
    return {
        type: ADD_ITEM,
        payload: {
            item: {
                ...item,
                product: item.product || item
            }
        }
    }
}

export const removeItem = item => {
    return {
        type: REMOVE_ITEM,
        payload: {
            item: item
        }
    }
}

export const clearItems = () => {
    return {
        type: CLEAR_ITEMS
    }
}

export const setItems = items => {
    return {
        type: SET_ITEMS,
        payload: { items }
    }
}