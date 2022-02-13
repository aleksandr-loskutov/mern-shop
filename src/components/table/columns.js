import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import React from "react";
import { getCityName } from "../../utils/getCityName";
import { getDeliveryMethodName } from "../../utils/getDeliveryMethodName";
import { formatDate } from "../../utils/getDate";

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
                to={`/user/orders/${order.orderNumber}`}
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
    name: {
        path: "name",
        name: "Имя",
        component: (user) => <span>{user.name}</span>
    },
    email: {
        path: "email",
        name: "Почта",
        component: (user) => <span>{user.email}</span>
    },
    city: {
        path: "city",
        name: "Город",
        component: (user) => <span></span>
    },
    birthDate: {
        path: "birthDate",
        name: "Дата",
        component: (user) => <span>{user.birthDate}</span>
    },
    role: {
        path: "role",
        name: "Роль",
        component: (user) => <span>user</span>
    },
    action: {
        path: "action",
        name: "Действия",
        component: (user) => (
            <>
                <Button
                    className="btn-link mr-1"
                    color="info"
                    data-toggle="tooltip"
                    id="tooltip542628903"
                    size="sm"
                    type="button"
                    to={`${user.id}`}
                    tag={Link}
                >
                    <i className="nc-icon nc-alert-circle-i" />
                </Button>
                <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip542628903"
                >
                    Просмотр
                </UncontrolledTooltip>
                <Button
                    className="btn-link mr-1"
                    color="success"
                    data-toggle="tooltip"
                    id="tooltip278266693"
                    size="sm"
                    type="button"
                    to={`${user.id}/edit`}
                    tag={Link}
                >
                    <i className="fa fa-edit" />
                </Button>
                <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip278266693"
                >
                    Редактировать
                </UncontrolledTooltip>
            </>
        )
    }
};
export const columnsForAdminProductsTable = {
    code: {
        path: "code",
        name: "Артикул",
        component: (product) => <span>{product.code}</span>
    },
    name: {
        path: "name",
        name: "Название",
        component: (product) => <span>{product.name}</span>
    },
    price: {
        path: "price",
        name: "Цена",
        component: (product) => <span>{product.price}</span>
    },
    category: {
        path: "category",
        name: "Категория",
        component: (product) => <span>{product.category}</span>
    },
    photo: {
        path: "photo",
        name: "Изображение",
        component: (product) => <span>{product.photo}</span>
    },
    quantity: {
        path: "quantity",
        name: "Количество",
        component: (product) => <span>{product.quantity}</span>
    },

    status: {
        path: "status",
        name: "Статус",
        component: (product) => <span>{product.status}</span>
    },

    action: {
        path: "action",
        name: "Действия",
        component: (product) => (
            <>
                <Button
                    className="btn-link mr-1"
                    color="info"
                    data-toggle="tooltip"
                    id="tooltip542628903"
                    size="sm"
                    type="button"
                    to={`${product.code}`}
                    tag={Link}
                >
                    <i className="nc-icon nc-alert-circle-i" />
                </Button>
                <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip542628903"
                >
                    Просмотр
                </UncontrolledTooltip>
                <Button
                    className="btn-link mr-1"
                    color="success"
                    data-toggle="tooltip"
                    id="tooltip278266693"
                    size="sm"
                    type="button"
                    to={`${product.code}/edit`}
                    tag={Link}
                >
                    <i className="fa fa-edit" />
                </Button>
                <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip278266693"
                >
                    Редактировать
                </UncontrolledTooltip>
            </>
        )
    }
};
