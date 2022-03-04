import React from "react";

import TableComponent from "../table/table";
import { columnsForAdminProductsTable } from "../table/columns";

function AdminProductsTable({ products }) {
    return (
        <TableComponent
            columns={columnsForAdminProductsTable}
            data={products}
        />
    );
}

export default AdminProductsTable;
