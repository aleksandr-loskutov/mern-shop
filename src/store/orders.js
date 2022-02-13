import { createAction, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";
import history from "../utils/history";

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        ordersRequested: (state) => {
            state.isLoading = true;
        },
        ordersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        ordersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        orderAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        orderAddFailed: (state, action) => {
            state.error = action.payload;
        },
        orderDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        orderDeleteFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: ordersReducer, actions } = ordersSlice;
const {
    ordersRequested,
    ordersReceved,
    ordersRequestFiled,
    orderAdded,
    orderAddFailed
} = actions;

const orderRequestAdd = createAction("orders/addRequest");

export const addOrder = (payload, emptyCart) => async (dispatch) => {
    dispatch(orderRequestAdd());
    try {
        const { content } = await orderService.create(payload);
        dispatch(orderAdded(content));
        emptyCart();
        history.push("/user/orders");
    } catch (error) {
        const { message } = error.response?.data;
        const { status: code } = error.response;
        if (code === 400) {
            dispatch(orderAddFailed(message));
        } else {
            dispatch(orderAddFailed(error.message));
        }
    }
};

export const loadOrdersList = () => async (dispatch) => {
    dispatch(ordersRequested());
    try {
        const { content } = await orderService.get();
        dispatch(ordersReceved(content));
    } catch (error) {
        dispatch(ordersRequestFiled(error.message));
    }
};
export const getOrders = () => (state) => state.orders.entities;
export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;
export const getOrderErrors = () => (state) => state.orders.error;
export const getOrderByNumber = (orderNumber) => (state) => {
    if (state.orders.entities) {
        const index = state.orders.entities.findIndex(
            (p) => p.orderNumber + "" === orderNumber + ""
        );
        return state.orders.entities[index];
    }
    return null;
};
export default ordersReducer;
