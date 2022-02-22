import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/page";
import UserOrdersTable from "../components/userOrdersTable";
import OrderDetail from "../components/orderDetail";
import { getOrderByNumber, getOrders } from "../store/orders";
import { useSelector } from "react-redux";
import _ from "lodash";

const UserOrders = () => {
    const { orderId } = useParams();
    const orders = useSelector(getOrders());
    const order = useSelector(getOrderByNumber(orderId));
    const sortedOrders =
        orders.length > 0
            ? _.orderBy(orders, (order) => new Date(order["createdAt"]), "desc")
            : [];
    return (
        <Page
            title={orderId ? `Детали по заказу ${orderId}` : "История заказов"}
        >
            {orderId ? (
                <OrderDetail order={order} />
            ) : (
                <UserOrdersTable orders={sortedOrders} />
            )}
        </Page>
    );
};

export default UserOrders;
