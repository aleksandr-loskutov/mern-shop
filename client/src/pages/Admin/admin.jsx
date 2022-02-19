import React from "react";
import PageAdmin from "../../components/pageAdmin";
import { useSelector } from "react-redux";
import { getProducts, getProductsLoadingStatus } from "../../store/products";
import { getUsersList, getUsersLoadingStatus } from "../../store/users";
import { getOrders } from "../../store/orders";
import { getCategories } from "../../store/categories";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Preloader from "../../components/preloader";

const Admin = () => {
    const products = useSelector(getProducts());
    const users = useSelector(getUsersList());
    const orders = useSelector(getOrders());
    const categories = useSelector(getCategories());
    const ordersLoading = useSelector(getProductsLoadingStatus());
    const usersLoading = useSelector(getUsersLoadingStatus());
    const isLoaded = !ordersLoading && !usersLoading;
    const sum =
        orders.length > 0
            ? orders.reduce(
                  (acc, o) => acc + (o.payment ? Number(o.total) : 0),
                  0
              )
            : 0;
    const profit = sum * 0.2;
    return isLoaded ? (
        <PageAdmin title="Статистика магазина">
            <Row className="coloured-cards">
                <Col md="4" sm="6">
                    <div className="card-big-shadow">
                        <Link to="/admin/categories/">
                            <Card
                                className="card-just-text"
                                data-color="blue"
                                data-radius="none"
                            >
                                <CardBody>
                                    <CardTitle tag="h3">Категорий</CardTitle>
                                    <h2>{categories.length}</h2>
                                </CardBody>
                            </Card>
                        </Link>
                        {/* end card */}
                    </div>
                </Col>
                <Col md="4" sm="6">
                    <div className="card-big-shadow">
                        <Link to="/admin/products/">
                            <Card
                                className="card-just-text"
                                data-color="green"
                                data-radius="none"
                            >
                                <CardBody>
                                    <CardTitle tag="h3">Товаров</CardTitle>
                                    <h2>{products.length}</h2>
                                </CardBody>
                            </Card>
                        </Link>
                        {/* end card */}
                    </div>
                </Col>
                <Col md="4" sm="6">
                    <div className="card-big-shadow">
                        <Link to="/admin/orders/">
                            <Card
                                className="card-just-text"
                                data-color="yellow"
                                data-radius="none"
                            >
                                <CardBody>
                                    <CardTitle tag="h3">Заказов</CardTitle>
                                    <h2>{orders.length}</h2>
                                </CardBody>
                            </Card>
                        </Link>
                        {/* end card */}
                    </div>
                </Col>
                <Col md="4" sm="6">
                    <div className="card-big-shadow">
                        <Link to="/admin/users/">
                            <Card
                                className="card-just-text"
                                data-color="brown"
                                data-radius="none"
                            >
                                <CardBody>
                                    <CardTitle tag="h3">Регистраций</CardTitle>
                                    <h2>{users.length}</h2>
                                </CardBody>
                            </Card>
                        </Link>
                        {/* end card */}
                    </div>
                </Col>
                <Col md="4" sm="6">
                    <div className="card-big-shadow">
                        <Card
                            className="card-just-text"
                            data-color="purple"
                            data-radius="none"
                        >
                            <CardBody>
                                <CardTitle tag="h3">Приход</CardTitle>
                                <h2>{sum} ₽</h2>
                            </CardBody>
                        </Card>
                        {/* end card */}
                    </div>
                </Col>
                <Col md="4" sm="6">
                    <div className="card-big-shadow">
                        <Card
                            className="card-just-text"
                            data-color="orange"
                            data-radius="none"
                        >
                            <CardBody>
                                <CardTitle tag="h3">Прибыль</CardTitle>
                                <h2>{profit} ₽</h2>
                            </CardBody>
                        </Card>
                        {/* end card */}
                    </div>
                </Col>
            </Row>
        </PageAdmin>
    ) : (
        <Preloader />
    );
};

export default Admin;
