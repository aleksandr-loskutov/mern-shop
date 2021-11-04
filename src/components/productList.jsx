import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
    UncontrolledTooltip
} from "reactstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
    return (
        <Col md="9">
            <div className="products">
                <Row>
                    <Col md="4" sm="4">
                        <Card className="card-product card-plain">
                            <div className="card-image">
                                <Link to="/product/1">
                                    <img
                                        alt="..."
                                        className="img-rounded img-responsive"
                                        src={
                                            require("assets/img/ecommerce/balmain_1.jpg")
                                                .default
                                        }
                                    />
                                </Link>
                                <CardBody>
                                    <div className="card-description">
                                        <CardTitle tag="h5">
                                            One Shoulder Dress
                                        </CardTitle>
                                        <p className="card-description">
                                            Dresses &amp; Skirts
                                        </p>
                                    </div>
                                    <div className="price">
                                        <h5>2.900 €</h5>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                    <Col md="4" sm="4">
                        <Card className="card-product card-plain">
                            <div className="card-image">
                                <Link to="/product/1">
                                    <img
                                        alt="..."
                                        className="img-rounded img-responsive"
                                        src={
                                            require("assets/img/ecommerce/balmain_2.jpg")
                                                .default
                                        }
                                    />
                                </Link>
                                <CardBody>
                                    <div className="card-description">
                                        <CardTitle tag="h5">
                                            Stretch-Knit Dress
                                        </CardTitle>
                                        <p className="card-description">
                                            Dresses &amp; Skirts
                                        </p>
                                    </div>
                                    <div className="price">
                                        <h5>1.700 €</h5>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                    <Col md="4" sm="4">
                        <Card className="card-product card-plain">
                            <div className="card-image">
                                <Link to="/product/1">
                                    <img
                                        alt="..."
                                        className="img-rounded img-responsive"
                                        src={
                                            require("assets/img/ecommerce/balmain_2.jpg")
                                                .default
                                        }
                                    />
                                </Link>
                                <CardBody>
                                    <div className="card-description">
                                        <CardTitle tag="h5">
                                            Chrystal Sheer Dress
                                        </CardTitle>
                                        <p className="card-description">
                                            Dresses &amp; Skirts
                                        </p>
                                    </div>
                                    <div className="price">
                                        <h5>1.500 €</h5>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                    <Col md="4" sm="4">
                        <Card className="card-product card-plain">
                            <div className="card-image">
                                <Link to="/product/1">
                                    <img
                                        alt="..."
                                        className="img-rounded img-responsive"
                                        src={
                                            require("assets/img/ecommerce/balmain_2.jpg")
                                                .default
                                        }
                                    />
                                </Link>
                                <CardBody>
                                    <div className="card-description">
                                        <CardTitle tag="h5">
                                            One Shoulder Dress
                                        </CardTitle>
                                        <p className="card-description">
                                            Dresses &amp; Skirts
                                        </p>
                                    </div>
                                    <div className="price">
                                        <h5>2.600 €</h5>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                    <Col md="4" sm="4">
                        <Card className="card-product card-plain">
                            <div className="card-image">
                                <Link to="/product/1">
                                    <img
                                        alt="..."
                                        className="img-rounded img-responsive"
                                        src={
                                            require("assets/img/ecommerce/balmain_8.jpg")
                                                .default
                                        }
                                    />
                                </Link>
                                <CardBody>
                                    <div className="card-description">
                                        <CardTitle tag="h5">
                                            Glass Beads Skirt
                                        </CardTitle>
                                        <p className="card-description">
                                            Dresses &amp; Skirts
                                        </p>
                                    </div>
                                    <div className="price">
                                        <h5>7.500 €</h5>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                    <Col md="4" sm="4">
                        <Card className="card-product card-plain">
                            <div className="card-image">
                                <Link to="/product/1">
                                    <img
                                        alt="..."
                                        className="img-rounded img-responsive"
                                        src={
                                            require("assets/img/ecommerce/balmain_8.jpg")
                                                .default
                                        }
                                    />
                                </Link>
                                <CardBody>
                                    <div className="card-description">
                                        <CardTitle tag="h5">
                                            Velvet Mini Dress
                                        </CardTitle>
                                        <p className="card-description">
                                            Dresses &amp; Skirts
                                        </p>
                                    </div>
                                    <div className="price">
                                        <h5>3.500 €</h5>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                    </Col>
                    <Col className="offset-md-4" md="3">
                        <Button
                            className="btn-round"
                            color="default"
                            data-rotation-color="gray"
                            id="successBtn"
                            outline
                        >
                            Load more...
                        </Button>
                        <UncontrolledTooltip delay={0} target="successBtn">
                            This is a morphing button
                        </UncontrolledTooltip>
                    </Col>
                </Row>
            </div>
        </Col>
    );
};

export default ProductList;
