import React from "react";
import { Button, Row, Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

function AdminViewUser({ user }) {
    const history = useHistory();
    return (
        <>
            <Row className="justify-content-sm-between">
                <Button onClick={() => history.goBack()}>Назад</Button>

                <Button to={`${user.id}/edit`} tag={Link}>
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
                            noreply@email.com
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Имя</strong>
                        </td>
                        <td className="text-dark font-weight-bold">Bootdey</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Фамилия</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            Bootstrap
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <strong>Город</strong>
                        </td>
                        <td className="text-dark font-weight-bold">Spb</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Индекс</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            123123ser
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <strong>Адрес</strong>
                        </td>
                        <td className="text-dark font-weight-bold">
                            Ул. Ххххх ываыва ываыва а ывааываыв ываываыв Ул.
                            Ххххх ываыва ываыва а ывааываыв ываываыв ываыв
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Роль / права</strong>
                        </td>
                        <td className="text-dark font-weight-bold">user</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default AdminViewUser;
