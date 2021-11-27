import { API_PRODUCTS, HOST } from "../../utils/consts";
import {
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS
} from "./actionTypes";
// import _ from "lodash";
// _.orderBy(Products, ["name"], ["desc"])
export function fetchProducts() {
    return async (dispatch) => {
        dispatch(fetchProductsStart());
        try {
            const response = await fetch(HOST + API_PRODUCTS);
            const result = await response.json();
            //console.log("result", result);

            dispatch(fetchProductsSuccess(result));
        } catch (error) {
            dispatch(fetchProductsError(error));
        }
    };
}
export function fetchProductsStart() {
    return {
        type: FETCH_PRODUCTS_START
    };
}
export function fetchProductsSuccess(products) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        products
    };
}
export function fetchProductsError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error
    };
}
