import {
    FETCH_CATEGORIES_ERROR,
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    categories: [],
    sort: "desc",
    loading: false,
    error: null
};

// console.log("initialState", initialState);
function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_START:
            return { ...state, loading: true };
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.categories };

        case FETCH_CATEGORIES_ERROR:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export default categoriesReducer;
