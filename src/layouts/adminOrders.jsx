import React from "react";
import { useParams } from "react-router-dom";
import PageAdmin from "../components/pageAdmin";
import AdminOrderDetail from "../components/adminOrderDetail";
import AdminOrdersTable from "../components/table/adminOrderTable";

const AdminOrders = () => {
    const { orderId } = useParams();
    const orders = [
        {
            _id: "1312313",
            number: 111,
            orderNumber: "100",
            date: "2021",
            deliveryMethod: "Курьер",
            paymentMethod: "При получении",
            status: "Не оплачен",
            sum: "10000"
        },
        {
            _id: "234234",
            number: 112,
            orderNumber: "200",
            date: "3021",
            deliveryMethod: "Курьер",
            paymentMethod: "При получении",
            status: "Оплачен",
            sum: "20000"
        }
    ];
    const order = {
        _id: "1312313",
        number: 111,
        orderNumber: "100",
        date: "2021",
        deliveryMethod: "Курьер",
        paymentMethod: "При получении",
        status: "Не оплачен",
        sum: "10000"
    };
    return (
        <PageAdmin
            title={orderId ? `Детали по заказу ${orderId}` : "Все заказы"}
        >
            {orderId ? (
                <AdminOrderDetail order={order} />
            ) : (
                <AdminOrdersTable orders={orders} />
            )}
        </PageAdmin>
    );
};

export default AdminOrders;
