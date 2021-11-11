import {
    ADMIN_ROUTE,
    ADMIN_PRODUCT_ADD_ROUTE,
    ADMIN_CATEGORY_ADD_ROUTE,
    ADMIN_USER_ROUTE,
    ADMIN_ORDER_ADD_ROUTE,
    ADMIN_POST_ADD_ROUTE,
    ADMIN_PRODUCTS_ROUTE,
    ADMIN_CATEGORIES_ROUTE,
    ADMIN_USERS_ROUTE,
    ADMIN_ORDERS_ROUTE,
    ADMIN_POSTS_ROUTE,
    CART_ROUTE,
    CATEGORY_ROUTE,
    LOGIN_ROUTE,
    CHECKOUT_ROUTE,
    PRODUCT_ROUTE,
    ROOT_ROUTE,
    USER_ROUTE,
    USER_ORDERS_ROUTE,
    ORDER_SUCCESS_ROUTE,
    CONTACT_ROUTE,
    NOT_FOUND_ROUTE,
    POSTS_ROUTE,
    SEARCH_ROUTE
} from "../utils/consts";
import Admin from "../pages/Admin/admin";
import AddUser from "../components/form/AddUser";
import AdminUsers from "../layouts/adminUsers";
import AddOrder from "../pages/Admin/AddOrder";
import AddPost from "../pages/Admin/AddPost";
import AdminProducts from "../layouts/adminProducts";
import AdminCategories from "../layouts/adminCategories";
import AdminOrders from "../layouts/adminOrders";
import AdminPosts from "../layouts/adminPosts";
import Cart from "../pages/User/cart";
import Index from "../pages/index.jsx";
import ContactUs from "../pages/User/ContactUs.jsx";
import Error404 from "../pages/Error404.jsx";
import ProductPage from "../pages/User/ProductPage.jsx";
import SearchWithSidebar from "../pages/User/SearchWithSidebar.jsx";
import CheckOut from "../pages/User/checkOut";
import UserOrders from "../layouts/userOrders";
import OrderSuccess from "../pages/User/orderSuccess";
import Catalog from "../pages/User/catalog.jsx";
import Posts from "../pages/User/posts";
import AddCategory from "../pages/Admin/AddCategory";
import UserSettings from "../pages/User/userSettings.jsx";
import AddProduct from "../pages/Admin/AddProduct";
import LoginPage from "../pages/User/loginPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin
    },
    {
        path: ADMIN_PRODUCT_ADD_ROUTE,
        component: AddProduct
    },
    {
        path: ADMIN_CATEGORY_ADD_ROUTE,
        component: AddCategory
    },
    {
        path: ADMIN_USER_ROUTE,
        component: AddUser
    },
    {
        path: ADMIN_ORDER_ADD_ROUTE,
        component: AddOrder
    },
    {
        path: ADMIN_POST_ADD_ROUTE,
        component: AddPost
    },
    {
        path: ADMIN_PRODUCTS_ROUTE,
        component: AdminProducts
    },
    {
        path: ADMIN_CATEGORIES_ROUTE,
        component: AdminCategories
    },
    {
        path: ADMIN_USERS_ROUTE,
        component: AdminUsers
    },
    {
        path: ADMIN_ORDERS_ROUTE,
        component: AdminOrders
    },
    {
        path: ADMIN_POSTS_ROUTE,
        component: AdminPosts
    },
    {
        path: CHECKOUT_ROUTE,
        component: CheckOut
    },
    {
        path: USER_ORDERS_ROUTE,
        component: UserOrders
    },
    {
        path: ORDER_SUCCESS_ROUTE,
        component: OrderSuccess
    },
    {
        path: USER_ROUTE,
        component: UserSettings
    }
];

export const publicRoutes = [
    {
        path: CATEGORY_ROUTE,
        component: Catalog
    },
    {
        path: CART_ROUTE,
        component: Cart
    },
    {
        path: PRODUCT_ROUTE,
        component: ProductPage
    },
    {
        path: CHECKOUT_ROUTE,
        component: CheckOut
    },
    {
        path: LOGIN_ROUTE,
        component: LoginPage
    },
    {
        path: ROOT_ROUTE,
        component: Index
    },
    {
        path: ORDER_SUCCESS_ROUTE,
        component: OrderSuccess
    },
    {
        path: POSTS_ROUTE,
        component: Posts
    },
    {
        path: CONTACT_ROUTE,
        component: ContactUs
    },
    {
        path: SEARCH_ROUTE,
        component: SearchWithSidebar
    },
    {
        path: NOT_FOUND_ROUTE,
        component: Error404
    }
];
