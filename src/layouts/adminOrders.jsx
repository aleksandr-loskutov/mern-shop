import React from "react";
import { useParams } from "react-router-dom";
import PageAdmin from "../components/pageAdmin";
import AdminOrdersTable from "../components/table/adminOrderTable";
import { useSelector } from "react-redux";
import { getOrderByNumber, getOrders } from "../store/orders";
import OrderDetail from "../components/orderDetail";

const AdminOrders = () => {
    const { orderId } = useParams();
    const orders = useSelector(getOrders());
    const order = useSelector(getOrderByNumber(orderId));
    return (
        <PageAdmin
            title={orderId ? `Детали по заказу ${orderId}` : "Все заказы"}
        >
            {orderId ? (
                <OrderDetail order={order} />
            ) : (
                <AdminOrdersTable orders={orders} />
            )}
        </PageAdmin>
    );
};

export default AdminOrders;
