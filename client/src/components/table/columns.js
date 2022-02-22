import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import React from "react";
import { getCityName } from "../../utils/getCityName";
import { getDeliveryMethodName } from "../../utils/getDeliveryMethodName";
import { formatDate } from "../../utils/getDate";
import localStorageService from "../../services/localStorage.service";
import { getOrderStatusName } from "../../utils/getOrderStatusName";
export const columnsForAdminOrdersTable = {
    date: {
        path: "createdAt",
        name: "Дата",
        component: (order) => (
            <span>{formatDate(new Date(Date.parse(order.createdAt)))}</span>
        )
    },
    orderNumber: {
        path: "orderNumber",
        name: "Заказ №",
        component: (order) => (
            <Link
                to={
                    localStorageService.getUserRole() === "admin"
                        ? `/admin/orders/${order.orderNumber}/`
                        : `/user/orders/${order.orderNumber}/`
                }
            >
                <span className="text-dark font-weight-bolder border-bottom">
                    {order.orderNumber}
                </span>
            </Link>
        )
    },

    deliveryMethod: {
        path: "deliveryMethod",
        name: "Доставка",
        component: (order) => (
            <span>{getDeliveryMethodName(order.deliveryMethod)}</span>
        )
    },
    products: {
        path: "products",
        name: "Товаров",
        component: (order) => <span>{order.products.length}</span>
    },
    sum: {
        path: "total",
        name: "Итого",
        component: (order) => <span>{order.total} ₽</span>
    },
    status: {
        path: "status",
        name: "Статус",
        component: (order) => (
            <>
                {
                    <span
                        className={`badge badge-pill badge-${
                            order.payment ? "success" : "default"
                        }`}
                    >
                        {getOrderStatusName(order.status)}
                    </span>
                }
            </>
        )
    },

    action: {
        path: "action",
        name: "Действия",
        component: (order) => (
            <Button
                to={
                    localStorageService.getUserRole() === "admin"
                        ? `/admin/orders/${order.orderNumber}/`
                        : `/user/orders/${order.orderNumber}/`
                }
                tag={Link}
                className="btn btn-outline-default btn-round"
            >
                Подробнее
            </Button>
        )
    }
};
export const columnsForUserOrdersTable = columnsForAdminOrdersTable;
export const columnsForAdminEditUser = {
    email: {
        path: "email",
        name: "Почта",
        component: (user) => <span>{user.email}</span>
    },
    name: {
        path: "name",
        name: "Имя",
        component: (user) => <span>{user.name}</span>
    },
    lastName: {
        path: "lastName",
        name: "Фамилия",
        component: (user) => <span>{user.lastName}</span>
    },
    city: {
        path: "city",
        name: "Город",
        component: (user) => <span>{getCityName(user.city)}</span>
    },

    role: {
        path: "role",
        name: "Роль",
        component: (user) => <span>{user.role}</span>
    },
    action: {
        path: "action",
        name: "Действия",
        component: (user) => (
            <>
                <Button
                    className="btn-link mr-1"
                    color="info"
                    size="sm"
                    type="button"
                    to={`/admin/users/${user._id}/`}
                    tag={Link}
                >
                    <i className="nc-icon nc-alert-circle-i" />
                </Button>

                <Button
                    className="btn-link mr-1"
                    color="success"
                    size="sm"
                    type="button"
                    to={`/admin/users/${user._id}/edit`}
                    tag={Link}
                >
                    <i className="fa fa-edit" />
                </Button>
            </>
        )
    }
};
export const columnsForAdminProductsTable = {
    photo: {
        path: "photo",
        name: "Фото",
        component: (product) => (
            <Link to={`/admin/products/${product._id}/`}>
                <img alt="фото." width="70" src={product.images[0]}></img>
            </Link>
        )
    },

    name: {
        path: "name",
        name: "Название",
        component: (product) => (
            <Link to={`/admin/products/${product._id}/`}>
                <span className="pull-left text-dark font-weight-bolder border-bottom">
                    {product.name}
                </span>
            </Link>
        )
    },
    article: {
        path: "code",
        name: "Артикул",
        component: (product) => <span>{product.article}</span>
    },
    price: {
        path: "price",
        name: "Цена",
        component: (product) => <span>{product.price}</span>
    },
    category: {
        path: "category",
        name: "Категория",
        component: (product) => <span>{product.brand}</span>
    },

    quantity: {
        path: "quantity",
        name: "Наличие",
        component: (product) => <span>{product.stock}</span>
    },

    status: {
        path: "status",
        name: "Статус",
        component: (product) => (
            <i
                className={
                    "nc-icon " +
                    (product.status ? "nc-check-2" : "nc-simple-remove")
                }
            ></i>
        )
    },

    action: {
        path: "action",
        name: "Действия",
        component: (product) => (
            <>
                <Button
                    className="btn-link mr-1"
                    color="info"
                    size="sm"
                    type="button"
                    to={`/admin/products/${product._id}/`}
                    tag={Link}
                >
                    <i className="nc-icon nc-alert-circle-i  font-weight-bolder" />
                </Button>

                <Button
                    className="btn-link mr-1"
                    color="success"
                    size="sm"
                    type="button"
                    to={`/admin/products/${product._id}/edit`}
                    tag={Link}
                >
                    <i className="fa fa-edit font-weight-bolder" />
                </Button>
            </>
        )
    }
};
