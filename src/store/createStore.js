import categoriesReducer from "./categories";
import productsReducer from "./products";
import usersReducer from "./users";
import ordersReducer from "./orders";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
