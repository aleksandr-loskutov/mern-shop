import React, { useEffect, useState } from "react";
import _ from "lodash";
// plugin that creates slider
import Slider from "nouislider";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Collapse,
    Label,
    FormGroup,
    Input,
    Row,
    Col
} from "reactstrap";

// core components

import { useParams } from "react-router-dom";
import ProductList from "../../components/productList";
import Page from "../../components/page";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/products";
import Preloader from "../../components/preloader";

function Catalog() {
    // states for collapses
    const { alias } = useParams();
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const [category, setCategory] = useState(true);
    const [type, setType] = useState(false);
    const [color, setColor] = useState(false);
    const [sort, setSort] = useState("asc");
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("ecommerce-page");
        return function cleanup() {
            document.body.classList.remove("ecommerce-page");
        };
    });
    const [filterFeatures, setFilterFeatures] = useState({});
    // React.useEffect(() => {
    //     products?.content.length > 0 ? setFilterFeatures(getSortingFeatures())
    // },[products])
    const handleSort = ({ value }) => {
        setSort(value);
    };
    const handleShowMore = () => {};
    const handleInputChange = (event, feature) => {
        const { target } = event;
        setFilterFeatures((prevState) => ({
            ...prevState,
            [feature]: target.checked
        }));
    };
    const getSortingFeatures = (feature, arr) => {
        const reducedArr = arr.reduce((acc, product) => {
            acc.push(product[feature]);
            return acc;
        }, []);
        return reducedArr.length > 0 ? [...new Set(reducedArr)] : [];
    };
    // console.log("filterFeatures", filterFeatures);
    const filteredProducts = products?.content
        ? _.orderBy(products.content, "price", sort)
        : [];
    // console.log("filteredProducts", filteredProducts);

    return (
        <Page title={alias ? alias : "Каталог"}>
            {products?.content ? (
                <Row>
                    <Col md="3">
                        <Card className="card-refine">
                            <div
                                aria-expanded={true}
                                aria-multiselectable={true}
                                className="panel-group"
                                id="accordion"
                            >
                                <CardHeader
                                    className="card-collapse"
                                    id="categoryGear"
                                    role="tab"
                                >
                                    <h5 className="mb-0 panel-title">
                                        <a
                                            aria-expanded={category}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCategory(!category);
                                            }}
                                        >
                                            Каталог брендов{" "}
                                            <i className="nc-icon nc-minimal-down" />
                                        </a>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={category}>
                                    <CardBody>
                                        {" "}
                                        {getSortingFeatures(
                                            "brand",
                                            products.content
                                        ).map((brand) => (
                                            <FormGroup check key={brand}>
                                                <Label check>
                                                    <Input
                                                        onInput={(event) =>
                                                            handleInputChange(
                                                                event,
                                                                brand
                                                            )
                                                        }
                                                        defaultValue=""
                                                        type="checkbox"
                                                    />
                                                    {brand}{" "}
                                                    <span className="form-check-sign" />
                                                </Label>
                                            </FormGroup>
                                        ))}
                                    </CardBody>
                                </Collapse>
                                <CardHeader
                                    className="card-collapse"
                                    id="type"
                                    role="tab"
                                >
                                    <h5 className="mb-0 panel-title">
                                        <a
                                            aria-expanded={type}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setType(!type);
                                            }}
                                        >
                                            Тип разморозки{" "}
                                            <i className="nc-icon nc-minimal-down" />
                                        </a>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={type}>
                                    <CardBody>
                                        {" "}
                                        {getSortingFeatures(
                                            "defrostChamberType",
                                            products.content
                                        ).map((type) => (
                                            <FormGroup check key={type}>
                                                <Label check>
                                                    <Input
                                                        onInput={(event) =>
                                                            handleInputChange(
                                                                event,
                                                                type
                                                            )
                                                        }
                                                        defaultValue=""
                                                        type="checkbox"
                                                    />
                                                    {type}{" "}
                                                    <span className="form-check-sign" />
                                                </Label>
                                            </FormGroup>
                                        ))}
                                    </CardBody>
                                </Collapse>
                                <CardHeader
                                    className="card-collapse"
                                    id="color"
                                    role="tab"
                                >
                                    <h5 className="mb-0 panel-title">
                                        <a
                                            aria-expanded={color}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setColor(!color);
                                            }}
                                        >
                                            Colour{" "}
                                            <i className="nc-icon nc-minimal-down" />
                                        </a>
                                    </h5>
                                </CardHeader>
                                <Collapse isOpen={color}>
                                    <CardBody>
                                        {" "}
                                        {getSortingFeatures(
                                            "color",
                                            products.content
                                        ).map((color) => (
                                            <FormGroup check key={color}>
                                                <Label check>
                                                    <Input
                                                        onInput={(event) =>
                                                            handleInputChange(
                                                                event,
                                                                color
                                                            )
                                                        }
                                                        defaultValue=""
                                                        type="checkbox"
                                                    />
                                                    {color}{" "}
                                                    <span className="form-check-sign" />
                                                </Label>
                                            </FormGroup>
                                        ))}
                                    </CardBody>
                                </Collapse>
                            </div>
                        </Card>
                        {/* end card */}
                    </Col>

                    <ProductList
                        products={filteredProducts}
                        onSort={handleSort}
                        sort={sort}
                        onShowMore={handleShowMore}
                    />
                </Row>
            ) : (
                <Preloader mx="mx-auto" />
            )}
        </Page>
    );
}

export default Catalog;
