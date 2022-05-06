import { createAction, createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import history from "../utils/history";
import categoryService from "../services/category.service";
import { toast } from "react-toastify";

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
        },
        categoryAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        categoryUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        categoryUpdateFailed: (state, action) => {
            state.error = action.payload;
        },
        categoryAddFailed: (state, action) => {
            state.error = action.payload;
        },
        categoryDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        categoryDeleteFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});
const { reducer: categoriesReducer, actions } = categoriesSlice;
const {
    categoriesRequested,
    categoriesReceved,
    categoriesRequestFailed,
    categoryAdded,
    categoryAddFailed,
    categoryDeleted,
    categoryDeleteFailed,
    categoryUpdated,
    categoryUpdateFailed
} = actions;
const categoryRequestAdd = createAction("categories/addRequest");
const categoryUpdateRequest = createAction("categories/updateRequest");
const categoryDeleteRequest = createAction("categories/deleteRequest");
export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoryService.fetchAll();
            dispatch(categoriesReceved(content));
        } catch (error) {
            toast.error("Ошибка загрузки");
            dispatch(categoriesRequestFailed(error.message));
        }
    }
};
export function updateCategory(categoryId, payload) {
    return async function (dispatch) {
        dispatch(categoryUpdateRequest());
        try {
            const { content } = await categoryService.update(
                categoryId,
                payload
            );
            toast.success("Обновлено");
            history.push(`/admin/categories/`);
            dispatch(categoryUpdated(content));
        } catch (error) {
            toast.error("Ошибка обновления");
            dispatch(categoryUpdateFailed(error.message));
        }
    };
}
export const addCategory = (payload) => async (dispatch) => {
    dispatch(categoryRequestAdd());
    try {
        const { content } = await categoryService.create(payload);
        dispatch(categoryAdded(content));
        toast.success("Добавлена категория");
        history.push(`/admin/categories/`);
    } catch (error) {
        const { message } = error.response?.data;
        const { status: code } = error.response;
        toast.error(message || error.message || "Ошибка");
        if (code === 400) {
            dispatch(categoryAddFailed(message));
        } else {
            dispatch(categoryAddFailed(error.message));
        }
    }
};
export const deleteCategory = (categoryId) => async (dispatch) => {
    dispatch(categoryDeleteRequest());
    try {
        const { status } = await categoryService.delete(categoryId);
        if (status === 200) {
            toast.success("Категория удалена");
            history.push(`/admin/categories/`);
            dispatch(categoryDeleted(categoryId));
        } else {
            toast.error("Ошибка");
            dispatch(categoryDeleteFailed(categoryId));
        }
    } catch (error) {
        const { message } = error.response?.data;
        const { status: code } = error.response;
        toast.error(message || error.message || "Ошибка");
        if (code === 400) {
            dispatch(categoryDeleteFailed(message));
        } else {
            dispatch(categoryDeleteFailed(error.message));
        }
    }
};
export const getCategories = () => (state) => state.categories.entities;
export const getActiveCategories = () => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.filter((c) => c.status === true);
    }
    return [];
};
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoriesErrors = () => (state) => state.categories.error;
export const getCategoriesByIds = (categoriesIds) => (state) => {
    if (state.categories.entities) {
        const categoriesArray = [];
        for (const prodId of categoriesIds) {
            for (const category of state.categories.entities) {
                if (category._id === prodId) {
                    categoriesArray.push(category);
                    break;
                }
            }
        }
        return categoriesArray;
    }
    return [];
};
export const getCategoryByAlias = (alias) => (state) => {
    if (state.categories.entities) {
        return state.categories.entities[
            state.categories.entities.findIndex((p) => p.urlAlias === alias)
        ];
    }
    return {};
};
export const getCategoryById = (categoryId) => (state) => {
    if (state.categories.entities) {
        return state.categories.entities[
            state.categories.entities.findIndex((p) => p._id === categoryId)
        ];
    }
    return {};
};
export default categoriesReducer;
