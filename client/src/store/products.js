import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";
import isOutdated from "../utils/isOutdated";
import history from "../utils/history";
import { toast } from "react-toastify";
import { validateMongoId } from "../utils/validateMongoId";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        productUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        productUpdateFailed: (state, action) => {
            state.error = action.payload;
        },
        productAddFailed: (state, action) => {
            state.error = action.payload;
        },
        productDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        productDeleteFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});
const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceved,
    productsRequestFailed,
    productAdded,
    productAddFailed,
    productDeleted,
    productDeleteFailed,
    productUpdated,
    productUpdateFailed
} = actions;
const productRequestAdd = createAction("products/addRequest");
const productUpdateRequest = createAction("products/updateRequest");
const productDeleteRequest = createAction("products/deleteRequest");
export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.fetchAll();
            dispatch(productsReceved(content));
        } catch (error) {
            toast.error("Ошибка загрузки");
            dispatch(productsRequestFailed(error.message));
        }
    }
};
export function updateProduct(productId, payload) {
    return async function (dispatch) {
        dispatch(productUpdateRequest());
        try {
            const { content } = await productService.update(productId, payload);
            dispatch(productUpdated(content));
            toast.success("Обновлено");
            history.push(`/admin/products/${content._id}/`);
        } catch (error) {
            toast.error("Ошибка обновления");
            dispatch(productUpdateFailed(error.message));
        }
    };
}
export const addProduct = (payload) => async (dispatch) => {
    dispatch(productRequestAdd());
    try {
        const { content } = await productService.create(payload);
        //console.log('content', content)
        dispatch(productAdded(content));
        toast.success("Товар добавлен");
        history.push(`/admin/products/${content._id}/`);
    } catch (error) {
        const { message } = error.response?.data;
        const { status: code } = error.response;
        toast.error(message || error.message || "Ошибка");
        if (code === 400) {
            dispatch(productAddFailed(message));
        } else {
            dispatch(productAddFailed(error.message));
        }
    }
};
export const deleteProduct = (productId) => async (dispatch) => {
    dispatch(productDeleteRequest());
    try {
        const { status } = await productService.delete(productId);
        if (status === 200) {
            toast.success("Товар удален");
            history.push(`/admin/products/`);
            dispatch(productDeleted(productId));
        } else {
            toast.error("Ошибка удаления");
            dispatch(productDeleteFailed(productId));
        }
    } catch (error) {
        const { message } = error.response?.data;
        const { status: code } = error.response;
        toast.error(message || error.message || "Ошибка");
        if (code === 400) {
            dispatch(productDeleteFailed(message));
        } else {
            dispatch(productDeleteFailed(error.message));
        }
    }
};
export const getProducts = () => (state) => state.products.entities;
export const getActiveProducts = () => (state) => {
    if (state.products.entities) {
        return state.products.entities.filter((p) => p.status === true);
    }
    return [];
};
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;
export const getProductsErrors = () => (state) => state.products.error;
export const getProductsByIds = (productsIds) => (state) => {
    if (state.products.entities) {
        const productsArray = [];
        for (const prodId of productsIds) {
            for (const product of state.products.entities) {
                if (product._id === prodId) {
                    productsArray.push(product);
                    break;
                }
            }
        }
        return productsArray;
    }
    return [];
};
export const getProductByAlias = (alias) => (state) => {
    if (state.products.entities) {
        return state.products.entities[
            state.products.entities.findIndex((p) => p.urlAlias === alias)
        ];
    }
    return {};
};
export const getFeaturedProducts = () => (state) => {
    if (state.products.entities) {
        const featured = state.products.entities.filter(
            (p) => p.featured === true
        );
        return featured.length > 0
            ? featured
            : state.products.entities.slice(0, 6);
    }
    return [];
};
export const getProductById = (productId) => (state) => {
    if (validateMongoId(productId) && state.products.entities) {
        return state.products.entities[
            state.products.entities.findIndex((p) => p._id === productId)
        ];
    }
    return null;
};
export default productsReducer;
