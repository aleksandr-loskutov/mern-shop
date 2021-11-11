import React from "react";
import TableComponent from "./table";
import { columnsForAdminEditUser } from "./columns";
import { Button, Row } from "reactstrap";
import { Link } from "react-router-dom";

function AdminUsersTable({ users }) {
    return (
        <>
            <Row>
                <Button
                    className="ml-auto mb-2"
                    to={`/admin/user/add`}
                    tag={Link}
                >
                    Добавить
                </Button>
            </Row>
            <TableComponent columns={columnsForAdminEditUser} data={users} />
        </>
    );
}

export default AdminUsersTable;
