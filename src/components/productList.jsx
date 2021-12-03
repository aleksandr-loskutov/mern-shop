import React from "react";
import { Card, CardBody, CardTitle, Col, FormGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import ShowMoreButton from "./showMoreButton";
import TagsInput from "./_prototypes/TagsInput";

const ProductList = ({
    products,
    onSort,
    onShowMore,
    showMore,
    tags,
    onTags
}) => {
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

                <TagsInput
                    onChange={(tags) => onTags(tags)}
                    tagProps={{
                        className: "react-tagsinput-tag badge-default"
                    }}
                    inputProps={{
                        className: "react-tagsinput-input",
                        placeholder: "",
                        disabled: true
                    }}
                    value={tags}
                />

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
                    {showMore && <ShowMoreButton onShowMore={onShowMore} />}
                </div>
            </Col>
        </>
    );
};

export default ProductList;
