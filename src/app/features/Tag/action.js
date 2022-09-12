import debounce from "debounce-promise";
import { getTags } from "../../api/tag";
import { ERROR_FETCHING_TAG, START_FETCHING_TAG, SUCCESS_FETCHING_TAG } from "./constant";

export const startFetchingTag = () => ({
    type: START_FETCHING_TAG
});

export const errorFetchingTag = () => ({
    type: ERROR_FETCHING_TAG
});

export const successFetchingTag = (payload) => ({
    type: SUCCESS_FETCHING_TAG,
    payload
})

let debouncedFetchTag = debounce(getTags, 1000);

export const fetchTags = () => {
    return async (dispatch, getState) => {
        dispatch(startFetchingTag())

        try {
            let { data: {data, count} } = await debouncedFetchTag();
            dispatch(successFetchingTag({ data, count }))
        } catch (err) {
            dispatch(errorFetchingTag());
        }
    }
}