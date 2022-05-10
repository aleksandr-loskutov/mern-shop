export const ADMIN_ROUTE = "/admin";
export const ADMIN_PRODUCT_ADD_ROUTE = "/admin/product/add";
export const ADMIN_PRODUCTS_ROUTE = "/admin/products/:productId?/:edit?";
export const ADMIN_CATEGORY_ADD_ROUTE = "/admin/category/add";
export const ADMIN_CATEGORIES_ROUTE = "/admin/categories/:categoryId?/:edit?";
export const ADMIN_USER_ROUTE = "/admin/user/add";
export const ADMIN_USERS_ROUTE = "/admin/users/:userId?/:edit?";
export const ADMIN_ORDER_ADD_ROUTE = "/admin/order/add";
export const ADMIN_ORDERS_ROUTE = "/admin/orders/:orderId?/:edit?";
export const ADMIN_POST_ADD_ROUTE = "/admin/post/add";
export const ADMIN_POSTS_ROUTE = "/admin/posts/:postId?/:edit?";
// auth user
export const USER_ROUTE = "/user";
export const USER_ORDERS_ROUTE = "/user/orders/:orderId?";
export const ORDER_SUCCESS_ROUTE = "/success";
// public
export const POSTS_ROUTE = "/posts/:alias?";
export const CONTACT_ROUTE = "/contact";
export const NOT_FOUND_ROUTE = "/404";
export const CART_ROUTE = "/cart";
export const CHECKOUT_ROUTE = "/checkout";
export const LOGIN_ROUTE = "/login/:register?";
export const LOGOUT_ROUTE = "/logout";
export const PASSWORD_RECOVERY_ROUTE = "/recovery";
export const CATEGORY_ROUTE = "/catalog/:alias?";
export const PRODUCT_ROUTE = "/product/:alias?";
export const SEARCH_ROUTE = "/search/:term?";
export const ROOT_ROUTE = "/";
// etc
export const HOST = "http://localhost:4000/";
export const API_CATEGORIES = "api/category/";
export const API_PRODUCTS = "api/product/";
export const CATALOG_PRODUCT_LIMIT = 15;
export const CITY_LIST = [
    {
        name: "Санкт-Петербург",
        value: "SPb"
    },
    {
        name: "Москва",
        value: "Msk"
    }
];
export const PAYMENT_METHODS = [
    {
        name: "Картой",
        value: "card"
    },
    {
        name: "Курьеру",
        value: "onDelivery"
    }
];
export const ORDER_STATUSES = [
    {
        name: "не оплачен",
        value: "notPayed"
    },
    {
        name: "оплачен",
        value: "payed"
    },
    {
        name: "отправлен",
        value: "shipped"
    }
];
export const DELIVERY_METHODS = [
    {
        name: "самовывоз",
        value: "pickup"
    },
    {
        name: "курьер (+700 руб.)",
        value: "courier",
        price: 700
    }
];
export const DEFAULT_PRODUCT_DATA = {
    name: "",
    urlAlias: "",
    categoryId: "",
    brand: "",
    article: "",
    manufacturerCode: "",
    price: "",
    discount: "",
    image: undefined,
    description: "",
    features: [],
    featured: false,
    status: true,
    stock: "1"
};
