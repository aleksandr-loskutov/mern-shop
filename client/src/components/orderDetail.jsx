import React, { useState } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Table, Row, Col } from "reactstrap";
import { formatDate } from "../utils/getDate";
import { Link } from "react-router-dom";
import { getCityName } from "../utils/getCityName";
import { useSelector } from "react-redux";
import { getCurrentUserRole } from "../store/users";
import { getDeliveryMethodName } from "../utils/getDeliveryMethodName";
import SelectField from "./form/fields/selectField";
import { ORDER_STATUSES } from "../utils/consts";
import { useDispatch } from "react-redux";
import { updateOrder } from "../store/orders";
import { getOrderStatusName } from "../utils/getOrderStatusName";
function OrderDetail({ order }) {
    const [status, setStatus] = useState(order.status);
    const { name, lastName, phone, city, address, postCode } = order.receiver;
    const currentUserRole = useSelector(getCurrentUserRole());
    const dispatch = useDispatch();
    const handleChangeStatus = (target) => {
        setStatus(target.value);
        const payment = {
            payment: target.value === "payed" || target.value === "shipped"
        };
        dispatch(updateOrder(order._id, { status: target.value, ...payment }));
    };
    return (
        <Row>
            <Col className="mx-auto" md="11">
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
                                {currentUserRole === "admin" ? (
                                    <SelectField
                                        defaultOption={"Выберите статус."}
                                        name="status"
                                        options={ORDER_STATUSES}
                                        value={status}
                                        onChange={handleChangeStatus}
                                    />
                                ) : (
                                    <h5 className="mt-2 text-left ">
                                        Статус:{" "}
                                        <span
                                            className={`badge badge-pill badge-${
                                                order.payment
                                                    ? "success"
                                                    : "default"
                                            }`}
                                        >
                                            {getOrderStatusName(order.status)}
                                        </span>
                                    </h5>
                                )}
                            </Col>
                            <Col lg="4" md="5">
                                <Row className="mt-2">
                                    <Col md="6">Размещен:</Col>
                                    <Col md="6">
                                        {formatDate(
                                            new Date(
                                                Date.parse(order.createdAt)
                                            )
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    {order.payment && (
                                        <>
                                            <Col md="6">Оплачен:</Col>
                                            <Col md="6">
                                                {formatDate(
                                                    new Date(
                                                        Date.parse(
                                                            order.createdAt
                                                        )
                                                    )
                                                )}
                                            </Col>
                                        </>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Link
                                to={
                                    currentUserRole === "admin"
                                        ? `/admin/users/${order.userId}/`
                                        : "/user"
                                }
                            >
                                <Col className="ml-1">
                                    <p className="text-left border-bottom">
                                        {"Получатель: "}
                                        <span className="text-dark font-weight-bolder p-2">
                                            {name}
                                        </span>
                                        <span className="text-dark font-weight-bolder p-2">
                                            {lastName}
                                        </span>{" "}
                                        Телефон:
                                        <span className="text-dark font-weight-bolder p-2">
                                            {phone}
                                        </span>
                                        Доставка:
                                        <span className="text-dark font-weight-bolder p-2">
                                            {getDeliveryMethodName(
                                                order.deliveryMethod
                                            )}
                                        </span>
                                    </p>
                                    <p className="text-left border-bottom">
                                        Адрес:
                                        <span className="text-dark font-weight-bolder p-2">
                                            {address}
                                        </span>
                                        Город:
                                        <span className="text-dark font-weight-bolder p-2">
                                            {getCityName(city)}
                                        </span>
                                        Индекс:
                                        <span className="text-dark font-weight-bolder p-2">
                                            {postCode}
                                        </span>
                                    </p>
                                </Col>
                            </Link>
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
                                                            to={
                                                                currentUserRole ===
                                                                "admin"
                                                                    ? `/admin/products/${product._id}/`
                                                                    : `/product/${product.urlAlias}`
                                                            }
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
                                                        to={
                                                            currentUserRole ===
                                                            "admin"
                                                                ? `/admin/products/${product._id}/`
                                                                : `/product/${product.urlAlias}`
                                                        }
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
