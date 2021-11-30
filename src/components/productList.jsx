import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/products";
import Select from "react-select";

const ProductList = ({ products, onSort, onShowMore }) => {
    //console.log("products here", products);
    const [defaultSelect, setDefaultSelect] = React.useState(null);
    const selectOptions = [
        { value: "", label: "Дешевле", isDisabled: true },
        { value: "1", label: "Дороже " }
    ];
    return (
        <>
            <Col md="9">
                <Col md="3" sm="3" className="ml-auto">
                    <FormGroup>
                        <Select
                            className="react-select react-select-default"
                            classNamePrefix="react-select"
                            name="defaultSelect"
                            value={defaultSelect}
                            onChange={(value) => setDefaultSelect(value)}
                            options={selectOptions}
                            placeholder="Сортировка"
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
