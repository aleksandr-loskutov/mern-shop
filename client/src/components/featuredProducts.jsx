import React from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getFeaturedProducts } from "../store/products";
import { Link } from "react-router-dom";
import Preloader from "./preloader";

const FeaturedProducts = () => {
    const featuredProducts = useSelector(getFeaturedProducts());
    return (
        <>
            <div className="section" id="cards">
                <Container className="tim-container">
                    <h4 className="title text-center">
                        <small>Лидеры продаж</small>
                    </h4>
                    <div className="products">
                        <Row>
                            {featuredProducts ? (
                                featuredProducts.map((product) => (
                                    <Col md="4" sm="4" key={product._id}>
                                        <Card className="card-product card-plain">
                                            <div className="card-image">
                                                <Link
                                                    to={`/product/${product.urlAlias}`}
                                                >
                                                    {product.images?.length >
                                                        0 && (
                                                        <img
                                                            alt={
                                                                product.name +
                                                                "."
                                                            }
                                                            className="img-rounded img-responsive"
                                                            src={
                                                                product
                                                                    .images[0]
                                                            }
                                                        />
                                                    )}
                                                </Link>
                                                <CardBody>
                                                    <div className="card-description">
                                                        <CardTitle tag="h5">
                                                            {product.name}
                                                        </CardTitle>
                                                        <p className="card-description">
                                                            Артикул:{" "}
                                                            {product.article}
                                                        </p>
                                                    </div>
                                                    <div className="price">
                                                        <h5>
                                                            {product.price} ₽
                                                        </h5>
                                                    </div>
                                                </CardBody>
                                            </div>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Preloader />
                            )}
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default FeaturedProducts;
