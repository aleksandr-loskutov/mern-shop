import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/category.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceved, categoriesRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoriesService.fetchAll();

            dispatch(categoriesReceved(content));
        } catch (error) {
            dispatch(categoriesRequestFailed(error.message));
        }
    }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoryById = (id) => (state) => {
    if (state.categories.entities) {
        for (const category of state.categories.entities) {
            if (category._id === id) {
                return category;
            }
        }
    }
    return {};
};

export default categoriesReducer;
