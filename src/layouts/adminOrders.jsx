import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageAdmin from "../components/pageAdmin";
import AdminOrdersTable from "../components/table/adminOrderTable";
import { useSelector } from "react-redux";
import {
    getOrderByNumber,
    getOrders,
    getOrdersLoadingStatus
} from "../store/orders";
import OrderDetail from "../components/orderDetail";
import Preloader from "../components/preloader";
import _ from "lodash";

const AdminOrders = () => {
    const { orderId } = useParams();
    const orders = useSelector(getOrders());
    const order = useSelector(getOrderByNumber(orderId));
    const isLoading = useSelector(getOrdersLoadingStatus());
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

    const sortedOrders =
        searchedOrders.length > 0
            ? _.orderBy(
                  searchedOrders,
                  (order) => new Date(order["createdAt"]),
                  "desc"
              )
            : [];
    return isLoading ? (
        <Preloader />
    ) : (
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
                <AdminOrdersTable orders={sortedOrders} />
            )}
        </PageAdmin>
    );
};

export default AdminOrders;
