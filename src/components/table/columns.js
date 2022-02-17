import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import React from "react";
import { getCityName } from "../../utils/getCityName";
import { getDeliveryMethodName } from "../../utils/getDeliveryMethodName";
import { formatDate } from "../../utils/getDate";
import { getCategoryById } from "../../store/categories";

export const columnsForAdminOrdersTable = {
    orderNumber: {
        path: "orderNumber",
        name: "Заказ №",
        component: (order) => <span>{order.orderNumber}</span>
    },
    date: {
        path: "createdAt",
        name: "Дата",
        component: (order) => (
            <span>{formatDate(new Date(Date.parse(order.createdAt)))}</span>
        )
    },
    deliveryMethod: {
        path: "deliveryMethod",
        name: "Доставка",
        component: (order) => (
            <span>{getDeliveryMethodName(order.deliveryMethod)}</span>
        )
    },
    payment: {
        path: "payment",
        name: "Оплата",
        component: (order) => (
            <span>{order.payment ? "оплачен" : "не оплачен"}</span>
        )
    },
    sum: {
        path: "total",
        name: "Итого",
        component: (order) => <span>{order.total} ₽</span>
    },
    status: {
        path: "orderStatus",
        name: "Статус",
        component: (order) => <span>{order.status}</span>
    },

    action: {
        path: "action",
        name: "Действия",
        component: (order) => (
            <Button
                to={`${order.orderNumber}`}
                tag={Link}
                className="btn btn-dark"
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
                    to={`${user._id}`}
                    tag={Link}
                >
                    <i className="nc-icon nc-alert-circle-i" />
                </Button>

                <Button
                    className="btn-link mr-1"
                    color="success"
                    size="sm"
                    type="button"
                    to={`${user._id}/edit`}
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
        component: (product) => <img width="70" src={product.images[0]}></img>
    },

    name: {
        path: "name",
        name: "Название",
        component: (product) => (
            <Link to={`${product._id}`}>
                <span className="pull-left font-weight-bold text-dark ">
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
                    to={`${product._id}`}
                    tag={Link}
                >
                    <i className="nc-icon nc-alert-circle-i  font-weight-bolder" />
                </Button>

                <Button
                    className="btn-link mr-1"
                    color="success"
                    size="sm"
                    type="button"
                    to={`${product._id}/edit`}
                    tag={Link}
                >
                    <i className="fa fa-edit font-weight-bolder" />
                </Button>
            </>
        )
    }
};
