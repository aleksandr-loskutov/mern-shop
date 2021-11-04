import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row
} from "reactstrap";

const FeaturedProducts = () => {
    return (
        <>
            <div className="section section-gray" id="cards">
                <Container className="tim-container">
                    <h4 className="title">
                        <small>Cards with products</small>
                    </h4>
                    <Row>
                        <Col md="3" sm="4">
                            <Card className="card-product card-plain">
                                <div className="card-image">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <img
                                            alt="..."
                                            className="img-rounded img-responsive"
                                            src={
                                                require("assets/img/balmain-1.jpg")
                                                    .default
                                            }
                                        />
                                    </a>
                                    <CardBody>
                                        <div className="card-description">
                                            <CardTitle tag="h5">
                                                Double Breasted Mini Dress
                                            </CardTitle>
                                            <p className="card-description">
                                                Dresses &amp; Skirts
                                            </p>
                                        </div>
                                        <div className="actions">
                                            <h5>$300</h5>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>
                        </Col>
                        <Col md="3" sm="4">
                            <Card className="card-product card-plain">
                                <div className="card-image">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <img
                                            alt="..."
                                            className="img-rounded img-responsive"
                                            src={
                                                require("assets/img/balmain-2.jpg")
                                                    .default
                                            }
                                        />
                                    </a>
                                    <CardBody>
                                        <div className="card-description">
                                            <CardTitle tag="h5">
                                                Chrystal Dress
                                            </CardTitle>
                                            <div className="meta">
                                                Dresses &amp; Skirts
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <Button
                                                className="btn-just-icon mr-1"
                                                color="link"
                                            >
                                                <i className="fa fa-star-o" />
                                            </Button>
                                            <Button
                                                className="btn-just-icon"
                                                color="link"
                                            >
                                                <i className="nc-icon nc-simple-delete" />
                                            </Button>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>
                        </Col>
                        <Col md="3" sm="4">
                            <Card className="card-product card-plain">
                                <div className="card-image">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <img
                                            alt="..."
                                            className="img-rounded img-responsive"
                                            src={
                                                require("assets/img/balmain-3.jpg")
                                                    .default
                                            }
                                        />
                                    </a>
                                    <CardBody>
                                        <div className="card-description">
                                            <CardTitle tag="h5">
                                                Chrystal Skirt
                                            </CardTitle>
                                            <p className="card-description">
                                                Only on demand
                                            </p>
                                        </div>
                                        <div className="actions">
                                            <Button
                                                className="btn-link btn-just-icon"
                                                color="danger"
                                            >
                                                234{" "}
                                                <i className="nc-icon nc-favourite-28" />
                                            </Button>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default FeaturedProducts;
