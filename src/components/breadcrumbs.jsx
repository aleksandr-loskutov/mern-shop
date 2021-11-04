import React from "react";
import { Button, Col, Row } from "reactstrap";

const Breadcrumbs = () => {
    //npm https://www.npmjs.com/package/use-react-router-breadcrumbs
    return (
        <Row className="title-row mt-4">
            <Col md="2">
                <h4 className="shop">Shop</h4>
            </Col>
            <Col className="ml-auto" md="4">
                <div className="pull-right">
                    <span className="text-muted">Order Status</span>
                    <Button color="link">
                        <i className="fa fa-shopping-cart" /> 0 Items
                    </Button>
                </div>
            </Col>
        </Row>
    );
};

export default Breadcrumbs;
