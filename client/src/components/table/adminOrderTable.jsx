import React from "react";
import TableComponent from "./table";
import { columnsForAdminOrdersTable } from "./columns";
function AdminOrdersTable({ orders }) {
    return (
        <TableComponent columns={columnsForAdminOrdersTable} data={orders} />
    );
}

export default AdminOrdersTable;
