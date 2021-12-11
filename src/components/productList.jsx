import React from "react";
import { Card, CardBody, CardTitle, Col, FormGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import ShowMoreButton from "./showMoreButton";
import TagsInput from "./_prototypes/TagsInput";
import Preloader from "./preloader";
import SearchForm from "./searchForm";

const ProductList = ({
    products,
    onSort,
    onShowMore,
    showMore,
    tags,
    onTags,
    searchQuery,
    onSearch
}) => {
    // console.log("products here", products);
    const selectOptions = [
        { value: "asc", label: "Дешевле" },
        { value: "desc", label: "Дороже " }
    ];

    return (
        <>
            <Col md="9" className="mt-4 card card-refine">
                <Row className="justify-content-md-between">
                    <Col md="4" sm="4">
                        <FormGroup className="">
                            <SearchForm
                                value={searchQuery}
                                showButton={false}
                                placeholder={"поиск.."}
                                onChange={onSearch}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3" sm="3">
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
                </Row>
                <TagsInput
                    onChange={(tags) => onTags(tags)}
                    tagProps={{
                        className: "react-tagsinput-tag badge-secondary",
                        style: { color: "white" }
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
                                                        Артикул:{" "}
                                                        {product.article}
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
                            <Preloader />
                        )}
                    </Row>
                    {showMore && <ShowMoreButton onShowMore={onShowMore} />}
                </div>
            </Col>
        </>
    );
};

export default ProductList;
