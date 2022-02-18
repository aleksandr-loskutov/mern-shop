import React from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    Table,
    TabPane
} from "reactstrap";
import { Link } from "react-router-dom";
import Preloader from "./preloader";

function AdminViewProduct({ product }) {
    const [hTabs, setHTabs] = React.useState("1");
    return (
        <>
            <Row className="justify-content-end">
                <Button
                    to={`/admin/products/${product._id}/edit`}
                    tag={Link}
                    className="btn btn-outline-danger btn-round"
                >
                    <i className="nc-icon nc-ruler-pencil"></i> Редактировать
                </Button>
            </Row>

            {product ? (
                <>
                    <Row>
                        <Col md="7" sm="6">
                            <div className="ml-auto mr-auto" id="carousel">
                                <Card className="page-carousel align-items-center">
                                    <img
                                        alt="фото."
                                        width="70%"
                                        src={product.images[0]}
                                    />
                                </Card>
                            </div>
                            {/* end carousel */}
                        </Col>
                        <Col md="5" sm="6">
                            <h3>{product.name}</h3>
                            <hr />
                            <h5 className="price mb-3">
                                <strong>Цена: {product.price}₽ </strong>
                            </h5>{" "}
                            <hr />
                            <p>
                                Артикул:{" "}
                                <span className="font-weight-bold text-dark">
                                    {product.article}
                                </span>
                            </p>
                            <p>
                                Бренд:{" "}
                                <Link
                                    className="font-weight-bold text-dark"
                                    to={`/catalog/${product.brand.toLowerCase()}`}
                                >
                                    {product.brand}
                                </Link>
                            </p>
                            {product.stock > 0 ? (
                                <p className="text-dark font-weight-bold">
                                    В наличии {product.stock} шт.
                                </p>
                            ) : (
                                <p className="text-danger font-weight-bold">
                                    Временно отсутствует
                                </p>
                            )}
                            <span className="">
                                Статус товара{" "}
                                {
                                    <i
                                        className={
                                            "font-weight-bold nc-icon " +
                                            (product.status
                                                ? "nc-check-2"
                                                : "nc-simple-remove ")
                                        }
                                    ></i>
                                }
                            </span>
                            <hr />
                        </Col>
                    </Row>
                    <Card className="card-refine">
                        <CardBody>
                            <div className="nav-tabs-navigation text-left">
                                <div className="nav-tabs-wrapper">
                                    <Nav id="tabs" role="tablist" tabs>
                                        <NavItem>
                                            <NavLink
                                                className={
                                                    hTabs === "1"
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() => {
                                                    setHTabs("1");
                                                }}
                                                href="#"
                                            >
                                                Характеристики
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={
                                                    hTabs === "2"
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() => {
                                                    setHTabs("2");
                                                }}
                                                href="#"
                                            >
                                                Описание
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </div>

                            <TabContent
                                className="text-justify"
                                activeTab={"hTabs" + hTabs}
                            >
                                <TabPane tabId="hTabs1">
                                    {product.features?.length > 0 ? (
                                        <Table>
                                            <tbody>
                                                {product.features.map(
                                                    (feature, i) => (
                                                        <tr key={feature.name}>
                                                            <td
                                                                className={
                                                                    i === 0
                                                                        ? "text-left border-0"
                                                                        : "text-left"
                                                                }
                                                            >
                                                                {feature.name}
                                                            </td>

                                                            <td
                                                                className={
                                                                    i === 0
                                                                        ? "text-right border-0"
                                                                        : "text-right"
                                                                }
                                                            >
                                                                {feature.value}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        "Характеристики скоро появятся...."
                                    )}
                                </TabPane>
                                <TabPane tabId="hTabs2">
                                    <p> {product.description}</p>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </>
            ) : (
                <Preloader />
            )}
        </>
    );
}

export default AdminViewProduct;
