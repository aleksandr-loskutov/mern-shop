import React from "react";
import TableComponent from "./table/table";
import { columnsForUserOrdersTable } from "./table/columns";
function userOrdersTable({ orders, action, ...rest }) {
    return <TableComponent columns={columnsForUserOrdersTable} data={orders} />;
}

export default userOrdersTable;
