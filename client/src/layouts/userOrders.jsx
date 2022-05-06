import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/page";
import UserOrdersTable from "../components/userOrdersTable";
import OrderDetail from "../components/orderDetail";
import { getOrderByNumber, getOrders } from "../store/orders";
import { useSelector } from "react-redux";
import _ from "lodash";
import localStorageService from "../services/localStorage.service";

const UserOrders = () => {
    const { orderId } = useParams();
    const orders = cropOrdersForAdmin(useSelector(getOrders()));
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

function cropOrdersForAdmin(orders) {
    const userRole = localStorageService.getUserRole();
    const userId = localStorageService.getUserId();
    //we have to crop orders for admin on this page coz his getting all orders from all users by default.
    if (userRole === "admin" && orders.length > 0) {
        return orders.filter((o) => o.userId === userId);
    }
}
export default UserOrders;
