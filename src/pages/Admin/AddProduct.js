import React, { useEffect, useState } from "react";
import { sanitize } from "string-sanitizer";
import cyrillicToTranslit from "cyrillic-to-translit-js";
// reactstrap components
import {
    Button,
    FormGroup,
    Input,
    Row,
    Col,
    CustomInput,
    Form
} from "reactstrap";

// core components

import ImageUpload from "components/_prototypes/ImageUpload.js";
import PageAdmin from "../../components/pageAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/products";
import { fetchCategories } from "../../store/actions/categories";
import SelectField from "../../components/form/fields/selectField";
import Preloader from "../../components/preloader";
import TextField from "../../components/form/fields/textField";
import * as yup from "yup";

function AddProduct() {
    const [data, setData] = useState({
        name: "",
        urlAlias: "",
        categoryId: "",
        brand: "",
        article: "",
        manufacturerCode: "",
        price: "",
        discount: "",
        image: undefined,
        description: "",
        features: [],
        featured: false,
        status: true,
        stock: "1"
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
    //        features: yup.array().required("Укажите параметры"),
    //        image: yup.array().required("Загрузите фото"),
    const validateSchema = yup.object().shape({
        article: yup.string().required("Укажите артикул"),
        discount: yup
            .string()
            .matches(/^(\s*|[1-9][0-9]?)$/, "Укажите от 1 до 99"),
        price: yup
            .string()
            .required("Укажите цену")
            .matches(/^\d+$/, "Укажите корректную цену"),
        stock: yup
            .string()
            .required("Укажите наличие")
            .matches(/^\d+$/, "Укажите число"),
        categoryId: yup.string().required("Укажите категорию"),
        name: yup.string().required("Укажите название")
    });
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
                alias.urlAlias = sanitize(
                    cyrillicToTranslit()
                        .transform(target.value, "-")
                        .toLowerCase()
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
    useEffect(() => {
        if (products?.content?.length > 0 && categories?.content?.length > 0) {
            if (!isLoaded) {
                setIsLoaded(true);
            }
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
        // console.log("handleSubmit isValid", isValid);
        // console.log("errors", errors);
        if (!isValid) return;
        console.log("handleSubmit", data);
        //отправляем
    };
    const handleImageChange = (file) => {
        setData((prevState) => {
            return { ...prevState, image: file };
        });
    };
    // console.log("isValid()", isValid(), "errors", errors);
    return (
        <PageAdmin title="Добавить товар">
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
                                <h6>Изображение</h6>
                                <ImageUpload
                                    error={errors.name}
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
                                <FormGroup>
                                    <h6>Описание товара</h6>
                                    <Input
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
                                    disabled={!isValid()}
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
                                    disabled={!isValid()}
                                >
                                    Сохранить и добавить еще
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </>
            ) : (
                <Preloader blockClass="mt-5" />
            )}
        </PageAdmin>
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
        features: [],
        stock: "3"
    };
}
export default AddProduct;
