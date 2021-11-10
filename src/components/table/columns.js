import { Link } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";
import React from "react";

export const columnsForAdminOrdersTable = {
    orderNumber: {
        path: "orderNumber",
        name: "Заказ №",
        component: (order) => <span>{order.orderNumber}</span>
    },
    date: {
        path: "orderDate",
        name: "Дата",
        component: (order) => <span>{order.date}</span>
    },
    deliveryMethod: {
        path: "orderDelivery",
        name: "Доставка",
        component: (order) => <span>{order.deliveryMethod}</span>
    },
    paymentMethod: {
        path: "orderPayment",
        name: "Оплата",
        component: (order) => <span>{order.paymentMethod}</span>
    },
    sum: {
        path: "orderSum",
        name: "Итого",
        component: (order) => <span>{order.sum}</span>
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
            <Button to={`${order._id}`} tag={Link} className="btn btn-dark">
                Подробнее
            </Button>
        )
    }
};
export const columnsForUserOrdersTable = columnsForAdminOrdersTable;
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
