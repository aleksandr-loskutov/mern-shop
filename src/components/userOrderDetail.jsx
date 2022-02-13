import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Table, Row, Col } from "reactstrap";
import { formatDate } from "../utils/getDate";
import { Link } from "react-router-dom";
function UserOrderDetail({ order }) {
    //TODO добавить получателя order.receiver
    return (
        <Row>
            <Col className="mx-auto mt-3" md="10">
                <Card className="card-invoice">
                    <CardHeader className="text-center">
                        <Row className="justify-content-md-between">
                            <Col md="4">
                                <h3 className="mt-2 text-left">
                                    Заказ #{"..."}
                                    {order.orderNumber
                                        .toString()
                                        .substr(
                                            order.orderNumber.toString()
                                                .length - 4
                                        )}
                                </h3>
                            </Col>
                            <Col md="4">
                                <h3 className="mt-2 text-left ">
                                    Статус:{" "}
                                    {order.payment ? "оплачен" : "не оплачен"}
                                </h3>
                            </Col>
                            <Col lg="4" md="5">
                                <Row className="mt-2">
                                    <Col md="6">Дата:</Col>
                                    <Col md="6">
                                        {formatDate(
                                            new Date(
                                                Date.parse(order.createdAt)
                                            )
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">Оплачен:</Col>
                                    <Col md="6">
                                        {formatDate(
                                            new Date(
                                                Date.parse(order.createdAt)
                                            )
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className="" md="12">
                                <Table className="table-shopping" responsive>
                                    <thead>
                                        <tr>
                                            <th
                                                className="text-center"
                                                colSpan="2"
                                            >
                                                Товар
                                            </th>
                                            <th className="text-right">Цена</th>
                                            <th className="text-right">
                                                Количество
                                            </th>
                                            <th className="text-right">
                                                Всего
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products?.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    <div className="img-container">
                                                        <Link
                                                            to={`/product/${product.urlAlias}`}
                                                        >
                                                            {product.images
                                                                ?.length >
                                                                0 && (
                                                                <img
                                                                    alt={
                                                                        product.name +
                                                                        "."
                                                                    }
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                    }
                                                                />
                                                            )}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="td-product">
                                                    <Link
                                                        to={`/product/${product.urlAlias}`}
                                                    >
                                                        <strong>
                                                            {product.name}
                                                        </strong>
                                                    </Link>
                                                    <p>
                                                        {product.description
                                                            ?.length > 0
                                                            ? product.description.substring(
                                                                  0,
                                                                  100
                                                              ) + "..."
                                                            : ""}
                                                    </p>
                                                </td>
                                                <td className="td-price">
                                                    {product.price}
                                                </td>
                                                <td className="td-number td-quantity">
                                                    {product.cartQuantity}
                                                </td>
                                                <td className="td-number">
                                                    {product.cartQuantity *
                                                        product.price}{" "}
                                                    <small className="font-weight-bold">
                                                        ₽
                                                    </small>
                                                </td>
                                            </tr>
                                        ))}
                                        {order.products.length > 0 && (
                                            <>
                                                <tr>
                                                    <td colSpan="2" />
                                                    <td />
                                                    <td className="td-total">
                                                        Итого
                                                    </td>
                                                    <td className="td-total">
                                                        {order.products.reduce(
                                                            (acc, product) =>
                                                                acc +
                                                                product.price *
                                                                    product.cartQuantity,
                                                            0
                                                        )}{" "}
                                                        <small className="font-weight-bold">
                                                            ₽
                                                        </small>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
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
