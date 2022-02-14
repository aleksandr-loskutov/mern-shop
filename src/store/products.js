import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";
import isOutdated from "../utils/isOutdated";
import history from "../utils/history";

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
    productDeleteFailed
} = actions;
const productRequestAdd = createAction("products/addRequest");

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.fetchAll();
            dispatch(productsReceved(content));
        } catch (error) {
            dispatch(productsRequestFailed(error.message));
        }
    }
};

export const addProduct = (payload) => async (dispatch) => {
    dispatch(productRequestAdd());
    try {
        const { content } = await productService.create(payload);
        //console.log('content', content)
        dispatch(productAdded(content));
        history.push("/admin/products/");
    } catch (error) {
        const { message } = error.response?.data;
        const { status: code } = error.response;
        if (code === 400) {
            dispatch(productAddFailed(message));
        } else {
            dispatch(productAddFailed(error.message));
        }
    }
};
export const getProducts = () => (state) => state.products.entities;
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
export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities[
            state.products.entities.findIndex((p) => p._id === productId)
        ];
    }
    return {};
};
export default productsReducer;
