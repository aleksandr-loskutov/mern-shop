import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/page";
import UserOrdersTable from "../components/userOrdersTable";
import UserOrderDetail from "../components/userOrderDetail";

const UserOrders = () => {
    const { orderId } = useParams();

    return (
        <Page
            title={orderId ? `Детали по заказу ${orderId}` : "История заказов"}
        >
            {orderId ? (
                <UserOrderDetail orderId={orderId} />
            ) : (
                <UserOrdersTable />
            )}
        </Page>
    );
};

export default UserOrders;
