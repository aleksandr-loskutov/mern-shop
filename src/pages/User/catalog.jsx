import React, { useEffect, useState } from "react";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
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
    const [sort, setSort] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [filterFeatures, setFilterFeatures] = useState({});
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("ecommerce-page");
        return function cleanup() {
            document.body.classList.remove("ecommerce-page");
        };
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [filterFeatures]);
    const handleSort = ({ value }) => {
        setSort(value);
    };
    const handleShowMore = () => {
        setCurrentPage((prevState) => prevState + 1);
    };
    console.log("currentPage", currentPage);
    const handleInputChange = (feature) => {
        setFilterFeatures((prevState) => {
            const key = Object.keys(feature)[0];
            return {
                ...prevState,
                [key]: { ...prevState[key], ...feature[key] }
            };
        });
    };
    const getSortingFeatures = (feature, arr) => {
        const reducedArr = arr.reduce((acc, product) => {
            acc.push(product[feature]);
            return acc;
        }, []);
        return reducedArr.length > 0 ? [...new Set(reducedArr)] : [];
    };
    const getActiveFiltersCount = () => {
        let activeFilters = 0;
        if (Object.keys(filterFeatures).length > 0) {
            Object.keys(filterFeatures).forEach((filterKey) => {
                Object.values(filterFeatures[filterKey]).forEach((v) => {
                    if (v === true) {
                        activeFilters++;
                    }
                });
            });
        }
        return activeFilters;
    };
    //todo плитка сортировочных тегов
    const groupedProducts = products?.content
        ? getActiveFiltersCount() > 0
            ? _.filter(products.content, (product) => {
                  let match = false;
                  Object.keys(filterFeatures).every((filterKey) => {
                      if (filterFeatures[filterKey][product[filterKey]]) {
                          match = true;
                          return false;
                      }
                  });
                  return match;
              })
            : products.content
        : [];
    const sortedProducts =
        groupedProducts.length > 0
            ? _.orderBy(groupedProducts, "price", sort)
            : [];
    const productsCrop = paginate(sortedProducts, currentPage, 9);
    const showMore = sortedProducts > productsCrop;
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
                                                            handleInputChange({
                                                                brand: {
                                                                    [brand]:
                                                                        event
                                                                            .target
                                                                            .checked
                                                                }
                                                            })
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
                            </div>
                        </Card>
                        {/* end card */}
                    </Col>

                    <ProductList
                        products={productsCrop}
                        onSort={handleSort}
                        sort={sort}
                        onShowMore={handleShowMore}
                        showMore={showMore}
                    />
                </Row>
            ) : (
                <Preloader />
            )}
        </Page>
    );
}

export default Catalog;
