import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/page";
import UserOrdersTable from "../components/userOrdersTable";
import UserOrderDetail from "../components/userOrderDetail";
import { getOrderByNumber, getOrders } from "../store/orders";
import { useSelector } from "react-redux";

const UserOrders = () => {
    const { orderId } = useParams();
    const orders = useSelector(getOrders());
    const order = useSelector(getOrderByNumber(orderId));

    return (
        <Page
            title={orderId ? `Детали по заказу ${orderId}` : "История заказов"}
        >
            {orderId ? (
                <UserOrderDetail order={order} />
            ) : (
                <UserOrdersTable orders={orders} />
            )}
        </Page>
    );
};

export default UserOrders;
