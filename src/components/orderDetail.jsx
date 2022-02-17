import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Table, Row, Col, Input } from "reactstrap";
import { formatDate } from "../utils/getDate";
import { Link } from "react-router-dom";
import { getCityName } from "../utils/getCityName";
function OrderDetail({ order }) {
    const { name, lastName, phone, city, address, postCode } = order.receiver;
    return (
        <Row>
            <Col className="mx-auto mt-3" md="10">
                <Card className="card-refine">
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
                        <Row className="align-items-center justify-content-xl-around">
                            <div>
                                Имя:{" "}
                                <span className="text-dark font-weight-bolder">
                                    {name}
                                </span>
                            </div>
                            <div>
                                Фамилия:{" "}
                                <span className="text-dark font-weight-bolder">
                                    {lastName}
                                </span>
                            </div>
                            <div>
                                Телефон:{" "}
                                <span className="text-dark font-weight-bolder">
                                    {phone}
                                </span>
                            </div>
                        </Row>

                        <Row className="align-items-center justify-content-xl-around">
                            <div>
                                Адрес:{" "}
                                <span className="text-dark font-weight-bolder">
                                    {address}
                                </span>
                            </div>
                            <div>
                                Город:{" "}
                                <span className="text-dark font-weight-bolder">
                                    {getCityName(city)}
                                </span>
                            </div>
                            <div>
                                Индекс:{" "}
                                <span className="text-dark font-weight-bolder">
                                    {postCode}
                                </span>
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col className="" md="12">
                                <Table className="table-shopping" responsive>
                                    <thead>
                                        <tr>
                                            <th
                                                className="text-center border-0"
                                                colSpan="2"
                                            >
                                                Товар
                                            </th>
                                            <th className="text-right border-0">
                                                Цена
                                            </th>
                                            <th className="text-right border-0">
                                                Количество
                                            </th>
                                            <th className="text-right border-0">
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

export default OrderDetail;
