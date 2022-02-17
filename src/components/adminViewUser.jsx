import React from "react";
import { Button, Row, Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { getCityName } from "../utils/getCityName";

function AdminViewUser({ user }) {
    const history = useHistory();
    return (
        <>
            <Row className="justify-content-sm-between">
                <Button onClick={() => history.goBack()}>Назад</Button>

                <Button to={`${user._id}/edit`} tag={Link}>
                    Редактировать
                </Button>
            </Row>
            <Table style={{ tableLayout: "fixed" }}>
                <tbody>
                    <tr>
                        <td>
                            <strong>Email </strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            {user.email}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Имя</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            {" "}
                            {user.name}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Фамилия</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            {user.lastName}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <strong>Город</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            {" "}
                            {getCityName(user.city)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Индекс</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            {user.postalCode}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <strong>Адрес</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            {user.address}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Роль / права</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            {" "}
                            {user.role}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default AdminViewUser;
