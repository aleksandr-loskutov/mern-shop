import { HOST, API_CATEGORIES } from "../../utils/consts";
import { getDataFromApi } from "../../utils/utils";
import { combineReducers } from "redux";
const categories = getDataFromApi(HOST + API_CATEGORIES);

const initialState = {
    categories: categories
};
export function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case "TEST":
            console.log("test");
            return {
                categories: state.categories,
                test: "true"
            };
    }

    return state;
}

export default combineReducers({ categories: categoriesReducer });
