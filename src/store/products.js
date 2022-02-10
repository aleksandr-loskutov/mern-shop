import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

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
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceved, productsRequestFiled } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 100) {
        return true;
    }
    return false;
}

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.fetchAll();
            dispatch(productsReceved(content));
        } catch (error) {
            dispatch(productsRequestFiled(error.message));
        }
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;
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
export default productsReducer;
