import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    FormGroup,
    Row
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";

const ProductList = ({ products, onSort, onShowMore }) => {
    // console.log("products here", products);
    const selectOptions = [
        { value: "asc", label: "Дешевле" },
        { value: "desc", label: "Дороже " }
    ];
    return (
        <>
            <Col md="9">
                <Col md="3" sm="3" className="ml-auto">
                    <FormGroup>
                        <Select
                            isSearchable={false}
                            className="react-select react-select-default"
                            classNamePrefix="react-select"
                            name="defaultSelect"
                            defaultValue={selectOptions[0]}
                            onChange={(value) => onSort(value)}
                            options={selectOptions}
                        />
                    </FormGroup>
                </Col>
                <div className="products">
                    <Row>
                        {products ? (
                            products.map((product) => (
                                <Col md="4" sm="4" key={product._id}>
                                    <Card className="card-product card-plain">
                                        <div className="card-image">
                                            <Link
                                                to={`/product/${product.urlAlias}`}
                                            >
                                                <img
                                                    alt={product.name + "."}
                                                    className="img-rounded img-responsive"
                                                    src={
                                                        require(`assets/img/products/${product.article}/${product.article}.jpg`)
                                                            .default
                                                    }
                                                />
                                            </Link>
                                            <CardBody>
                                                <div className="card-description">
                                                    <CardTitle tag="h5">
                                                        {product.name}
                                                    </CardTitle>
                                                    <p className="card-description">
                                                        {product.brand}
                                                    </p>
                                                </div>
                                                <div className="price">
                                                    <h5>{product.price} ₽</h5>
                                                </div>
                                            </CardBody>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div className="d-flex mx-auto my-5">
                                <div className="uil-reload-css reload-background mr-1">
                                    <div />
                                </div>
                            </div>
                        )}
                    </Row>
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
                    </Col>{" "}
                </div>
            </Col>
        </>
    );
};

export default ProductList;
