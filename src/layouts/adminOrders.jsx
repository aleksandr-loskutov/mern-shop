import React, { useState } from "react";
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
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const searchedOrders = orders
        ? searchQuery
            ? orders.filter((order) => {
                  return (
                      order.orderNumber
                          .toString()
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
                  );
              })
            : orders
        : [];
    return (
        <PageAdmin
            title={orderId ? `Детали по заказу ${orderId}` : "Все заказы"}
            search={!orderId}
            onSearch={handleSearchQuery}
            searchQuery={searchQuery}
            searchTip="номер заказа..."
        >
            {orderId ? (
                <OrderDetail order={order} />
            ) : (
                <AdminOrdersTable orders={searchedOrders} />
            )}
        </PageAdmin>
    );
};

export default AdminOrders;
