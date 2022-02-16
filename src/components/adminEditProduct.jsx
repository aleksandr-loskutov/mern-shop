import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProduct,
    deleteProduct,
    getProducts,
    getProductsErrors,
    getProductsLoadingStatus,
    updateProduct
} from "../store/products";
import { getCategories, getCategoriesLoadingStatus } from "../store/categories";
import { sanitize } from "string-sanitizer";
import _ from "lodash";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { Button, Col, CustomInput, Form, FormGroup, Row } from "reactstrap";
import ImageUpload from "./ImageUpload";
import TextField from "./form/fields/textField";
import SelectField from "./form/fields/selectField";
import DoubleSelect from "./doubleSelect";
import { getProductValidationSchema } from "../utils/getProductValidationSchema";
import { getFeaturesFromProducts } from "../utils/getFeaturesFromProducts";

function AdminEditProduct({ product }) {
    const [data, setData] = useState(prepareData(product));
    const [initData, setInitData] = useState(true);
    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());
    const categoriesIsLoading = useSelector(getCategoriesLoadingStatus());
    const productsIsLoading = useSelector(getProductsLoadingStatus());
    const dispatch = useDispatch();
    const isLoaded = !categoriesIsLoading && !productsIsLoading;
    const [errors, setErrors] = useState({});
    const productAddError = useSelector(getProductsErrors());
    const features = useRef();
    const validateSchema = getProductValidationSchema();
    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // console.log("validate", isValid());
        return isValid();
    };

    const handleChange = (target) => {
        setData((prevState) => {
            const alias = { urlAlias: prevState.urlAlias };
            if (target.name === "name") {
                alias.urlAlias = sanitize.addDash(
                    cyrillicToTranslit().transform(target.value).toLowerCase()
                );
            }
            return {
                ...prevState,
                [target.name]: target.value,
                ...alias
            };
        });
    };
    const isValid = () => {
        return (
            isLoaded &&
            Object.keys(data).length > 0 &&
            Object.keys(errors).length === 0 &&
            Object.values(data).join("").length > 0
        );
    };
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("add-product");
        // window.scrollTo(0, 0);
        // document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("add-product");
        };
    });
    // console.log("features.current", features.current);
    useEffect(() => {
        if (isLoaded) {
            features.current = getFeaturesFromProducts(products);
            features.current.keys.length > 0 &&
                setData((prevState) => {
                    return {
                        ...prevState,
                        features:
                            product.features.length > 0
                                ? product.features
                                : [
                                      {
                                          name: features.current.keys[0].value,
                                          value: ""
                                      }
                                  ]
                    };
                });
        }

        // eslint-disable-next-line
    }, [products, categories]);

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate();
        }
        // eslint-disable-next-line
    }, [data]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const filteredFeatures = data.features.filter(
            (feature, index, self) => {
                return (
                    self.findIndex((v) => v.name === feature.name) === index &&
                    feature.value !== ""
                );
            }
        );
        dispatch(
            updateProduct(product._id, {
                ...data,
                features: JSON.stringify(filteredFeatures)
            })
        );
    };
    const handleImageChange = (file) => {
        setData((prevState) => {
            return { ...prevState, image: file };
        });
    };

    const handleSelectFeature = (value) => {
        setData((prevState) => {
            const kvp =
                value.input === "key"
                    ? { name: value.value, value: "" }
                    : { name: value.key, value: value.value };
            return {
                ...prevState,
                features: [
                    ...prevState.features.map((feature, index) =>
                        index === value.index ? kvp : feature
                    )
                ]
            };
        });
    };

    useEffect(() => {
        if (data.features?.length > 0) {
            const count = data.features.reduce(
                (acc, feature) =>
                    feature.name !== "" && feature.value !== "" ? acc + 1 : acc,
                0
            );
            if (
                count === data.features.length &&
                data.features.length < features?.current?.keys.length
            ) {
                const nextFeature = {
                    name: features.current.keys[data.features.length].value,
                    value: ""
                };
                setData((prevState) => {
                    return {
                        ...prevState,
                        features: [...prevState.features, nextFeature]
                    };
                });
            }
        }
    }, [data.features]);
    const handleShowMore = () => {};
    const handleDelete = () => {
        dispatch(deleteProduct(product._id));
    };
    const getDefaultValueForDoubeleSelect = (firstDefault, index) => {
        return data.features.length > 0
            ? {
                  ...firstDefault,
                  secondDefault:
                      data.features[
                          data.features.findIndex(
                              (f) =>
                                  f.name ===
                                  features.current?.keys[index]?.label
                          )
                      ]?.value ?? ""
              }
            : firstDefault;
    };
    return (
        isLoaded && (
            <>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md="5" sm="5">
                            <ImageUpload
                                currentImageUrl={
                                    product.images?.length > 0
                                        ? product.images[0]
                                        : undefined
                                }
                                error={errors.img}
                                onChange={handleImageChange}
                            />
                            <h6>Статус</h6>
                            <div className="mb-1">
                                <CustomInput
                                    type="switch"
                                    id="status"
                                    name="status"
                                    className="custom-switch-success"
                                    label="Отображать товар в каталоге?"
                                    onChange={() =>
                                        setData((prevState) => {
                                            return {
                                                ...prevState,
                                                status: !prevState.status
                                            };
                                        })
                                    }
                                    checked={data.status}
                                />
                            </div>
                            <h6>Лидер продаж </h6>
                            <div className="mb-1">
                                <CustomInput
                                    type="switch"
                                    id="featured"
                                    name="featured"
                                    className="custom-switch-warning"
                                    label="Отображать на главной?"
                                    onChange={() =>
                                        setData((prevState) => {
                                            return {
                                                ...prevState,
                                                featured: !prevState.featured
                                            };
                                        })
                                    }
                                    checked={data.featured}
                                />
                            </div>
                        </Col>
                        <Col md="7" sm="7">
                            <FormGroup>
                                <TextField
                                    label={
                                        "Название товара" +
                                        (data.urlAlias.length > 0
                                            ? ` | алиас : ${data.urlAlias}`
                                            : "")
                                    }
                                    required={true}
                                    name="name"
                                    value={data.name}
                                    placeholder=""
                                    type="text"
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                            </FormGroup>
                            <Row className="mb-1">
                                <Col md="6">
                                    <SelectField
                                        label="Категория / бренд"
                                        defaultOption="Выберите..."
                                        name="categoryId"
                                        options={categories.reduce(
                                            (acc, category) => {
                                                acc.push({
                                                    name: category.name,
                                                    value: category._id
                                                });
                                                return acc;
                                            },
                                            []
                                        )}
                                        value={data.categoryId}
                                        onChange={handleChange}
                                        error={errors.categoryId}
                                    />
                                </Col>
                                <Col md="6">
                                    <TextField
                                        label="Наличие на складе"
                                        name="stock"
                                        value={data.stock}
                                        placeholder="шт."
                                        type="text"
                                        onChange={handleChange}
                                        error={errors.stock}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md="6">
                                    <TextField
                                        label="Цена"
                                        required={true}
                                        name="price"
                                        value={data.price}
                                        placeholder="₽"
                                        type="text"
                                        onChange={handleChange}
                                        error={errors.price}
                                    />
                                </Col>
                                <Col md="6">
                                    <TextField
                                        label="Скидка %"
                                        name="discount"
                                        value={data.discount}
                                        placeholder="%"
                                        type="text"
                                        onChange={handleChange}
                                        error={errors.discount}
                                    />
                                </Col>
                            </Row>
                            <Row className="price-row">
                                <Col md="6">
                                    <TextField
                                        label="Артикул"
                                        required={true}
                                        name="article"
                                        value={data.article}
                                        placeholder=""
                                        type="text"
                                        onChange={handleChange}
                                        error={errors.article}
                                    />
                                </Col>
                                <Col md="6">
                                    <TextField
                                        label="Код производителя"
                                        name="manufacturerCode"
                                        value={data.manufacturerCode}
                                        placeholder=""
                                        type="text"
                                        onChange={handleChange}
                                        error={errors.manufacturerCode}
                                    />
                                </Col>
                            </Row>
                            {features.current?.keys.length > 0 && (
                                <Row>
                                    <Col className="text-center">
                                        <span className="mt-0 mb-2 mr-2">
                                            конструктор параметров
                                        </span>
                                        <a
                                            className="text-info"
                                            href="#link"
                                            onClick={() => {
                                                setData((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        features: [
                                                            {
                                                                name: features
                                                                    .current
                                                                    .keys[0]
                                                                    .value,
                                                                value: ""
                                                            }
                                                        ]
                                                    };
                                                });
                                                setInitData(false);
                                            }}
                                        >
                                            ( сбросить )
                                        </a>
                                    </Col>
                                </Row>
                            )}

                            {features.current?.keys.length > 0 &&
                                data.features.length > 0 &&
                                data.features.map((feature, index) => {
                                    return (
                                        <DoubleSelect
                                            key={index}
                                            index={index}
                                            featureOptions={features.current.keys
                                                .map((f) => {
                                                    return {
                                                        ...f,
                                                        index: index
                                                    };
                                                })
                                                .filter(
                                                    (f) =>
                                                        !data.features.some(
                                                            (feat) =>
                                                                feat.name ===
                                                                f.value
                                                        )
                                                )}
                                            featureValuesOptions={features.current.all[
                                                feature.name
                                            ].map((f) => {
                                                return {
                                                    label: f,
                                                    value: f,
                                                    key: feature.name,
                                                    input: "value",
                                                    index: index
                                                };
                                            })}
                                            defaultValue={getDefaultValueForDoubeleSelect(
                                                features.current.keys[index],
                                                index
                                            )}
                                            initData={initData}
                                            onSelect={handleSelectFeature}
                                            onShowMore={handleShowMore}
                                        />
                                    );
                                })}
                            <FormGroup>
                                <h6>Описание товара</h6>
                                <TextField
                                    className="textarea-limited"
                                    maxLength="2000"
                                    name="description"
                                    placeholder="Описание товара..."
                                    rows="5"
                                    type="textarea"
                                    value={data.description}
                                    onChange={handleChange}
                                    error={errors.description}
                                />
                                <h5>
                                    <small>
                                        <span
                                            className="pull-right"
                                            id="textarea-limited-message"
                                        >
                                            не более{" "}
                                            {2000 - data.description.length}{" "}
                                            символов
                                        </span>
                                    </small>
                                </h5>
                            </FormGroup>
                        </Col>
                    </Row>

                    {productAddError && (
                        <Row>
                            <span className="text-danger mt-2 ml-auto mr-5 font-weight-bold">
                                {productAddError}
                            </span>
                        </Row>
                    )}

                    <Row className="buttons-row mt-5 flex-row justify-content-between">
                        <Col md="4" sm="4">
                            <Button
                                block
                                className="btn-round"
                                color="danger"
                                outline
                                type="reset"
                            >
                                Назад
                            </Button>
                        </Col>
                        <Col md="4" sm="4">
                            <Button
                                block
                                className="btn-round"
                                color="danger"
                                type="reset"
                                onClick={handleDelete}
                            >
                                Удалить
                            </Button>
                        </Col>
                        <Col md="4" sm="4">
                            <Button
                                block
                                className="btn-round"
                                color="primary"
                                type="submit"
                                disabled={!isValid()}
                            >
                                Сохранить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    );
}
function prepareData(product) {
    const productShaped = _.omit(product, [
        "updatedAt",
        "createdAt",
        "__v",
        "_id"
    ]);
    return {
        ...productShaped,
        discount: productShaped.discount?.toString(),
        price: productShaped.price?.toString(),
        stock: productShaped.stock?.toString()
    };
}
export default AdminEditProduct;
