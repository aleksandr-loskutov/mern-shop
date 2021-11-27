import {
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    products: [],
    sort: "desc",
    loading: false,
    error: null
};

// console.log("initialState", initialState);
function productsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.products };

        case FETCH_PRODUCTS_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export default productsReducer;
