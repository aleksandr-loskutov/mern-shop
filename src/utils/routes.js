import {
    ADMIN_ROUTE,
    CART_ROUTE,
    CATEGORY_ROUTE,
    LOGIN_ROUTE,
    ORDER_ROUTE,
    PRODUCT_ROUTE,
    ROOT_ROUTE,
    USER_ROUTE
} from "./consts";
import Admin from "../pages/admin";
import Cart from "../pages/cart";
import User from "../pages/user";
import Category from "../pages/category";
import Product from "../pages/product";
import Order from "../pages/order";
import Login from "../pages/login";
import Main from "../pages/main";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin
    },
    {
        path: CART_ROUTE,
        component: Cart
    },
    {
        path: USER_ROUTE,
        component: User
    }
];

export const publicRoutes = [
    {
        path: CATEGORY_ROUTE,
        component: Category
    },
    {
        path: CART_ROUTE,
        component: Cart
    },
    {
        path: PRODUCT_ROUTE,
        component: Product
    },
    {
        path: ORDER_ROUTE,
        component: Order
    },
    {
        path: LOGIN_ROUTE,
        component: Login
    },
    {
        path: ROOT_ROUTE,
        component: Main
    }
];
