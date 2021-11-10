import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/page";
import UserOrdersTable from "../components/userOrdersTable";
import UserOrderDetail from "../components/userOrderDetail";

const UserOrders = () => {
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

    return (
        <Page
            title={orderId ? `Детали по заказу ${orderId}` : "История заказов"}
        >
            {orderId ? (
                <UserOrderDetail orderId={orderId} />
            ) : (
                <UserOrdersTable orders={orders} />
            )}
        </Page>
    );
};

export default UserOrders;
