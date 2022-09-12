import debounce from "debounce-promise";
import { getCategories } from "../../api/category";
import { ERROR_FETCHING_CATEGORY, START_FETCHING_CATEGORY, SUCCESS_FETCHING_CATEGORY } from "./constant";

export const startFetchingCategories = () => ({
    type: START_FETCHING_CATEGORY
});

export const errorFetchingCategories = () => ({
    type: ERROR_FETCHING_CATEGORY
});

export const successFetchingCategories = (payload) => ({
    type: SUCCESS_FETCHING_CATEGORY,
    payload
})

let debouncedFetchCategories = debounce(getCategories, 1000);

export const fetchCategories = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingCategories())

        try {
            let { data: {data, count} } = await debouncedFetchCategories();
            dispatch(successFetchingCategories({ data, count }))
        } catch (err) {
            dispatch(errorFetchingCategories());
        }
    }
}