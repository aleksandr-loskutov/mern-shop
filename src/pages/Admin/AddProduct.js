import React, { useEffect, useState } from "react";

// reactstrap components
import {
    Button,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    CustomInput
} from "reactstrap";

// core components

import ImageUpload from "components/_prototypes/ImageUpload.js";
import PageAdmin from "../../components/pageAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/products";
import { fetchCategories } from "../../store/actions/categories";
import SelectField from "../../components/form/fields/selectField";
import Preloader from "../../components/preloader";

function AddProduct() {
    const [data, setData] = useState({
        name: "",
        urlAlias: "",
        categoryId: "",
        brand: "",
        article: "",
        manufacturerCode: "",
        price: "",
        images: "",
        description: "",
        features: "",
        featured: false,
        status: true,
        stock: ""
    });
    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    // console.log("categories", categories.content);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (target) => {
        setData((prevState) => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
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
    useEffect(() => {
        if (products?.content?.length > 0 && categories?.content?.length > 0) {
            if (!isLoaded) {
                setIsLoaded(true);
            }
        }
        // eslint-disable-next-line
    }, [products, categories]);
    return (
        <PageAdmin title="Добавить товар">
            {isLoaded ? (
                <>
                    <Row>
                        <Col md="5" sm="5">
                            <h6>Изображение</h6>
                            <ImageUpload />
                            <h6>Категория / бренд товара</h6>
                            <div id="tags-2">
                                <SelectField
                                    defaultOption="Выберите..."
                                    name="category"
                                    options={categories.content.reduce(
                                        (acc, category) => {
                                            acc.push({
                                                name: category.name,
                                                value: category._id
                                            });
                                            return acc;
                                        },
                                        []
                                    )}
                                    defaultValue=""
                                    onChange={handleChange}
                                    error={errors.city}
                                />
                            </div>

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
                                <h6>
                                    Название товара{" "}
                                    <span className="icon-danger">*</span>
                                </h6>
                                <Input className="border-input" type="text" />
                            </FormGroup>
                            <FormGroup>
                                <h6>
                                    Алиас товара (ЧПУ){" "}
                                    <span className="icon-danger">*</span>
                                </h6>
                                <Input className="border-input" type="text" />
                            </FormGroup>
                            <Row className="price-row">
                                <Col md="6">
                                    <h6>
                                        Цена{" "}
                                        <span className="icon-danger">*</span>
                                    </h6>
                                    <InputGroup className="border-input">
                                        <Input
                                            className="border-input"
                                            defaultValue=""
                                            type="text"
                                        />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i className="fa fa-euro" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col md="6">
                                    <h6>Скидка %</h6>
                                    <InputGroup className="border-input">
                                        <Input
                                            className="border-input"
                                            defaultValue=""
                                            type="text"
                                        />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>%</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <h6>Описание товара</h6>
                                <Input
                                    className="textarea-limited"
                                    maxLength="150"
                                    placeholder="Описание товара..."
                                    rows="13"
                                    type="textarea"
                                />
                                <h5>
                                    <small>
                                        <span
                                            className="pull-right"
                                            id="textarea-limited-message"
                                        >
                                            не более 2000 символов
                                        </span>
                                    </small>
                                </h5>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="buttons-row">
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
                                color="primary"
                                outline
                                type="submit"
                            >
                                Сохранить
                            </Button>
                        </Col>
                        <Col md="4" sm="4">
                            <Button
                                block
                                className="btn-round"
                                color="primary"
                                type="submit"
                            >
                                Сохранить и добавить еще
                            </Button>
                        </Col>
                    </Row>
                </>
            ) : (
                <Preloader blockClass="mt-5" />
            )}
        </PageAdmin>
    );
}

export default AddProduct;
