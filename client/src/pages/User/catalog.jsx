import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import { getActiveCategories } from "../../store/categories";
import { getActiveProducts } from "../../store/products";
import Preloader from "../../components/preloader";
import { CATALOG_PRODUCT_LIMIT } from "../../utils/consts";

//todo: delete this bicycle & refactor this page
function Catalog() {
    const { alias } = useParams();
    const categories = useSelector(getActiveCategories());
    const products = useSelector(getActiveProducts());
    const [category, setCategory] = useState(true);
    const [sort, setSort] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [tags, setTags] = React.useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const prevAlias = useRef(alias);
    React.useEffect(() => {
        document.documentElement.classList.remove("nav-open");
        document.body.classList.add("ecommerce-page");
        return function cleanup() {
            document.body.classList.remove("ecommerce-page");
        };
    });

    useEffect(() => {
        if (alias && categories?.length > 0) {
            const name = categories.find((c) => c.urlAlias === alias)?.name;
            if (name && !tags.includes(name) && prevAlias.current === alias) {
                handleFilterChange({ brand: { [name]: true } });
            } else if (prevAlias.current !== alias) {
                setFilters({ brand: { [name]: true } });
                setTags([name]);
                setSearchQuery("");
                prevAlias.current = alias;
            }
        }
        // eslint-disable-next-line
    }, [alias]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);
    const handleSort = ({ value }) => {
        setSort(value);
    };
    const handleShowMore = () => {
        setCurrentPage((prevState) => prevState + 1);
    };
    const handleFilterChange = (filter) => {
        setSearchQuery("");
        const key = Object.keys(filter)[0];
        const filterName = Object.keys(filter[key])[0];
        const isFilterActive = Object.values(filter[key])[0];

        setFilters((prevState) => {
            return {
                ...prevState,
                [key]: { ...prevState[key], ...filter[key] }
            };
        });
        setTags((prevState) => {
            let newTags = [...prevState];
            isFilterActive
                ? newTags.push(filterName)
                : (newTags = newTags.filter((tag) => tag !== filterName));
            return newTags;
        });
    };
    const handleTags = (updatedTags) => {
        const deletedTag = tags.filter((tag) => !updatedTags.includes(tag))[0];
        let filterKey = "";
        Object.keys(filters).every((key) => {
            if (filters[key]?.[deletedTag] !== undefined) {
                filterKey = key;
                return false;
            }
            return true;
        });
        handleFilterChange({ [filterKey]: { [deletedTag]: false } });
    };
    const handleSearchQuery = ({ target }) => {
        setFilters({});
        setTags([]);
        setSearchQuery(target.value);
    };
    const getSortingFilters = (filter, arr) => {
        const reducedArr = arr.reduce((acc, product) => {
            acc.push(product[filter]);
            return acc;
        }, []);
        return reducedArr.length > 0 ? [...new Set(reducedArr)] : [];
    };
    const getActiveFiltersCount = () => {
        let activeFilters = 0;
        if (Object.keys(filters).length > 0) {
            Object.keys(filters).forEach((filterKey) => {
                Object.values(filters[filterKey]).forEach((v) => {
                    if (v === true) {
                        activeFilters++;
                    }
                });
            });
        }
        return activeFilters;
    };
    const searchedProducts = products
        ? searchQuery
            ? products.filter((product) => {
                  return (
                      product.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1 ||
                      product.article.indexOf(searchQuery) !== -1
                  );
              })
            : products
        : [];

    const groupedProducts =
        searchedProducts.length > 0
            ? getActiveFiltersCount() > 0
                ? _.filter(searchedProducts, (product) => {
                      let match = false;
                      Object.keys(filters).every((filterKey) => {
                          if (filters[filterKey][product[filterKey]]) {
                              match = true;
                              return false;
                          }
                          return true;
                      });
                      return match;
                  })
                : searchedProducts
            : [];

    const sortedProducts =
        groupedProducts.length > 0
            ? _.orderBy(groupedProducts, "price", sort)
            : [];
    const productsCrop = paginate(
        sortedProducts,
        currentPage,
        CATALOG_PRODUCT_LIMIT
    );
    const showMore = sortedProducts > productsCrop;
    return (
        <Page title={alias ? alias : "Каталог"}>
            {products ? (
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
                                            href="#link"
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
                                        {getSortingFilters(
                                            "name",
                                            categories
                                        ).map((categoryName) => (
                                            <FormGroup check key={categoryName}>
                                                <Label check>
                                                    <Input
                                                        onChange={(event) =>
                                                            handleFilterChange({
                                                                brand: {
                                                                    [categoryName]:
                                                                        event
                                                                            .target
                                                                            .checked
                                                                }
                                                            })
                                                        }
                                                        defaultValue=""
                                                        checked={
                                                            tags.length > 0
                                                                ? tags.includes(
                                                                      categoryName
                                                                  )
                                                                : false
                                                        }
                                                        type="checkbox"
                                                    />
                                                    {categoryName}{" "}
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
                        tags={tags}
                        onTags={handleTags}
                        searchQuery={searchQuery}
                        onSearch={handleSearchQuery}
                    />
                </Row>
            ) : (
                <Preloader />
            )}
        </Page>
    );
}

export default Catalog;
