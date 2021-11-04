import { API_CATEGORIES, HOST } from "../../utils/consts";
import {
    FETCH_CATEGORIES_ERROR,
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_SUCCESS
} from "./actionTypes";
// import _ from "lodash";
// _.orderBy(categories, ["name"], ["desc"])
export function fetchCategories() {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart());
        try {
            const response = await fetch(HOST + API_CATEGORIES);
            const result = await response.json();
            // console.log("result", result);
            // console.log("sorted result", result);
            // return result;
            dispatch(fetchCategoriesSuccess(result));
        } catch (error) {
            dispatch(fetchCategoriesError(error));
        }
    };
}
export function fetchCategoriesStart() {
    return {
        type: FETCH_CATEGORIES_START
    };
}
export function fetchCategoriesSuccess(categories) {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        categories
    };
}
export function fetchCategoriesError(error) {
    return {
        type: FETCH_CATEGORIES_ERROR,
        error
    };
}
