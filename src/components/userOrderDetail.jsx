import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Table, Row, Col } from "reactstrap";
function UserOrderDetail({ orderId }) {
    return (
        <Row>
            <Col className="mx-auto mt-3" md="10">
                <Card className="card-invoice">
                    <CardHeader className="text-center">
                        <Row className="justify-content-md-between">
                            <Col md="4">
                                <h3 className="mt-2 text-left">
                                    Заказ # 0453119
                                </h3>
                            </Col>
                            <Col md="4">
                                <h3 className="mt-2 text-left ">
                                    Статус: не оплачен
                                </h3>
                            </Col>
                            <Col lg="4" md="5">
                                <Row className="mt-2">
                                    <Col md="6">Дата:</Col>
                                    <Col md="6">06/03/2019</Col>
                                </Row>
                                <Row>
                                    <Col md="6">Оплачен:</Col>
                                    <Col md="6">11/03/2019</Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <Table className="table-shopping" responsive>
                                    <thead>
                                        <tr>
                                            <th className="text-center">
                                                Товар
                                            </th>
                                            <th />
                                            <th className="text-right">
                                                Price
                                            </th>
                                            <th className="text-right">
                                                Quantity
                                            </th>
                                            <th className="text-right">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="img-container">
                                                    <img
                                                        alt="..."
                                                        src={
                                                            require("assets/img/tables/agenda.png")
                                                                .default
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="td-product">
                                                <strong>
                                                    Get Shit Done Notebook
                                                </strong>
                                                <p>
                                                    Most beautiful agenda for
                                                    the office, really nice
                                                    paper and black cover. Most
                                                    beautiful agenda for the
                                                    office.
                                                </p>
                                            </td>
                                            <td className="td-price">
                                                <small>€</small>
                                                49
                                            </td>
                                            <td className="td-number">1 </td>
                                            <td className="td-number">
                                                <small>€</small>
                                                49
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="img-container">
                                                    <img
                                                        alt="..."
                                                        src={
                                                            require("assets/img/tables/stylus.jpg")
                                                                .default
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="td-product">
                                                <strong>Stylus</strong>
                                                <p>
                                                    Design is not just what it
                                                    looks like and feels like.
                                                    Design is how it works.
                                                </p>
                                            </td>
                                            <td className="td-price">
                                                <small>€</small>
                                                499
                                            </td>
                                            <td className="td-number ">2 </td>
                                            <td className="td-number">
                                                <small>€</small>
                                                998
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="img-container">
                                                    <img
                                                        alt="..."
                                                        src={
                                                            require("assets/img/tables/evernote.png")
                                                                .default
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="td-product">
                                                <strong>
                                                    Evernote iPad Stander
                                                </strong>
                                                <p>
                                                    A groundbreaking Retina
                                                    display. All-flash
                                                    architecture.
                                                    Fourth-generation Intel
                                                    processors.
                                                </p>
                                            </td>
                                            <td className="td-price">
                                                <small>€</small>
                                                799
                                            </td>
                                            <td className="td-number">1 </td>
                                            <td className="td-number">
                                                <small>€</small>
                                                799
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" />
                                            <td />
                                            <td className="td-total">Total</td>
                                            <td className="td-total">
                                                <small>€</small>
                                                12,999
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default UserOrderDetail;
