import React from "react";
import TableComponent from "./table";
import { columnsForAdminEditUser } from "./columns";

function AdminUsersTable({ users }) {
    return (
        <>
            <TableComponent columns={columnsForAdminEditUser} data={users} />
        </>
    );
}

export default AdminUsersTable;
