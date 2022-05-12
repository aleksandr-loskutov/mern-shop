import React, { useEffect, useState } from "react";

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
import { getProductValidationSchema } from "../utils/getProductValidationSchema";
import { sanitize } from "string-sanitizer";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { Button, Col, CustomInput, Form, FormGroup, Row } from "reactstrap";
import ImageUpload from "../components/ImageUpload";
import TextField from "../components/form/fields/textField";
import SelectField from "../components/form/fields/selectField";
import ProductFeaturesConstructor from "../components/productFeaturesConstructor";
import Preloader from "../components/preloader";
import { DEFAULT_PRODUCT_DATA } from "../utils/consts";
import _ from "lodash";
import ModalConfirm from "../components/modalConfirm";
import history from "../utils/history";

function AdminProduct({ product }) {
    const [data, setData] = useState(
        prepareData(product) || DEFAULT_PRODUCT_DATA
    );
    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());
    const categoriesIsLoading = useSelector(getCategoriesLoadingStatus());
    const productsIsLoading = useSelector(getProductsLoadingStatus());
    const dispatch = useDispatch();
    const isLoaded = !categoriesIsLoading && !productsIsLoading;
    const [errors, setErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const productAddError = useSelector(getProductsErrors());

    const validateSchema = getProductValidationSchema();
    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
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

    React.useEffect(() => {
        document.documentElement.classList.remove("nav-open");
        document.body.classList.add("add-product");
        // window.scrollTo(0, 0);
        // document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("add-product");
        };
    });

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate();
        }
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        setData(prepareData(product) || DEFAULT_PRODUCT_DATA);
    }, [product]);

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
        product
            ? dispatch(
                  updateProduct(product._id, {
                      ...data,
                      features: JSON.stringify(filteredFeatures)
                  })
              )
            : dispatch(
                  addProduct({
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
    const handleFeaturesChange = (featuresData) => {
        setData((prevState) => {
            return { ...prevState, features: featuresData };
        });
    };
    const getCategoriesOptions = () => {
        return categories?.reduce((acc, category) => {
            acc.push({
                name: category.name,
                value: category._id
            });
            return acc;
        }, []);
    };
    const handleDelete = () => {
        setModalOpen(true);
    };
    return (
        <>
            {isLoaded ? (
                <>
                    <Row className="justify-content-end">
                        <Col md="3">
                            <a
                                className="text-info mt-3 pull-right "
                                href="#link"
                                onClick={() =>
                                    setData((prevState) => {
                                        return {
                                            ...prevState,
                                            ...getDemoData()
                                        };
                                    })
                                }
                            >
                                Заполнить демо данными?
                            </a>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="5" sm="5">
                                <ImageUpload
                                    currentImageUrl={
                                        product?.images?.length > 0
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
                                                    featured:
                                                        !prevState.featured
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
                                            options={getCategoriesOptions()}
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
                                            label="Скидка"
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
                                <ProductFeaturesConstructor
                                    featuresData={data.features}
                                    products={products}
                                    onChange={handleFeaturesChange}
                                />
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

                        <Row className="buttons-row mt-3 flex-row justify-content-between">
                            <Col md="4" sm="4">
                                <Button
                                    block
                                    className="btn-round"
                                    color="danger"
                                    outline
                                    type="reset"
                                    onClick={() => history.goBack()}
                                >
                                    Назад
                                </Button>
                            </Col>
                            {product && (
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
                            )}
                            <Col md="4" sm="4">
                                <Button
                                    block
                                    className="btn-round"
                                    color="primary"
                                    type="submit"
                                    disabled={!isValid()}
                                >
                                    {product ? "Сохранить" : "Добавить"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <ModalConfirm
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        onConfirm={() => dispatch(deleteProduct(product._id))}
                    />
                </>
            ) : (
                <Preloader blockClass="mt-5" />
            )}
        </>
    );
}

function getDemoData() {
    return {
        name: "Холодильник Pozis SD-323",
        urlAlias: "holodilnik-pozis-sd-323",
        categoryId: "61a225ed13dfdc69192ed072",
        brand: "Pozis",
        article: "1200541",
        manufacturerCode: "SD-323-6MAS",
        price: "10000",
        discount: "",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur dolor ducimus et eveniet fugit\n" +
            "impedit in necessitatibus nemo officia perferendis praesentium quasi rerum, sed sit tempora veniam voluptates.\n",
        features: [{ name: "Тип", value: "" }],
        stock: "3"
    };
}
function prepareData(product) {
    if (!product) return null;
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
export default AdminProduct;
