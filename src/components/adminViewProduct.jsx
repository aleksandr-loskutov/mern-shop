import React from "react";
import { Button, Col, Row } from "reactstrap";
import ImageUpload from "./_prototypes/ImageUpload";
import { Link, useHistory, useParams } from "react-router-dom";

function AdminViewProduct({ product }) {
    const params = useParams();
    const { productId } = params;
    const history = useHistory();
    return (
        <>
            <Row className="justify-content-sm-between">
                <Button onClick={() => history.goBack()}>Назад</Button>

                <Button to={`${productId}/edit`} tag={Link}>
                    Редактировать
                </Button>
            </Row>
            <Row className="mt-2">
                <Col md="5" sm="5">
                    <h6>Product Image</h6>
                    <ImageUpload />
                </Col>
                <Col md="7" sm="7">
                    <h6>Товар</h6>
                    Название
                    <Row className="price-row">
                        <Col md="6">
                            <h6>
                                Price <span className="icon-danger">*</span>
                            </h6>
                            666
                        </Col>
                        <Col md="6">
                            <h6>Discount</h6>
                            777
                        </Col>
                        <Col md="6">
                            <h6>Продаж</h6>
                            777
                        </Col>
                        <Col md="6">
                            <h6>Артикул</h6>
                            777
                        </Col>
                        <Col md="6">
                            <h6>Количество</h6>
                            777
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default AdminViewProduct;
