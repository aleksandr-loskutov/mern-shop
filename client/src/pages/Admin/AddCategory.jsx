import React, { useEffect, useState } from "react";
import { Button, Col, CustomInput, Form, FormGroup, Row } from "reactstrap";
import ImageUpload from "../../components/ImageUpload";
import PageAdmin from "../../components/pageAdmin";
import {
    getCategoriesLoadingStatus,
    addCategory,
    getCategoriesErrors
} from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryValidationSchema } from "../../utils/getCategoryValidationSchema";
import TextField from "../../components/form/fields/textField";
function AddCategory() {
    const [data, setData] = useState({
        name: "",
        parentId: "",
        description: "",
        img: "",
        metaTitle: "",
        status: true
    });
    const categoriesIsLoading = useSelector(getCategoriesLoadingStatus());
    const dispatch = useDispatch();
    const isLoaded = !categoriesIsLoading;
    const [errors, setErrors] = useState({});
    const categoryAddingError = useSelector(getCategoriesErrors());
    const validateSchema = getCategoryValidationSchema();
    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return isValid();
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
    const handleImageChange = (file) => {
        setData((prevState) => {
            return { ...prevState, image: file };
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(addCategory(data));
    };
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate();
        }
        // eslint-disable-next-line
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
    };
    return (
        isLoaded && (
            <PageAdmin title="Добавить категорию">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md="5" sm="5">
                            <h6>Изображение</h6>
                            <ImageUpload
                                error={errors.name}
                                onChange={handleImageChange}
                            />
                        </Col>
                        <Col md="7" sm="7">
                            <FormGroup>
                                <TextField
                                    label={"Название категории"}
                                    required={true}
                                    name="name"
                                    value={data.name}
                                    placeholder=""
                                    type="text"
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                            </FormGroup>

                            <FormGroup>
                                <TextField
                                    label={"Мета заголовок"}
                                    name="metaTitle"
                                    value={data.metaTitle}
                                    placeholder=""
                                    type="text"
                                    onChange={handleChange}
                                    error={errors.metaTitle}
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    className="textarea-limited"
                                    maxLength="500"
                                    name="description"
                                    placeholder="Описание категории..."
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
                                            {500 - data.description.length}{" "}
                                            символов
                                        </span>
                                    </small>
                                </h5>
                            </FormGroup>
                            <h6>Статус</h6>
                            <div className="mb-1">
                                <CustomInput
                                    type="switch"
                                    id="status"
                                    name="status"
                                    className="custom-switch-success"
                                    label="Отображать категорию в каталоге?"
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
                        </Col>
                    </Row>
                    {categoryAddingError && (
                        <Row>
                            <span className="text-danger mt-2 ml-auto mr-5 font-weight-bold">
                                {categoryAddingError}
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
                            >
                                отмена
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
                                Добавить категорию
                            </Button>
                        </Col>
                    </Row>
                </Form>{" "}
            </PageAdmin>
        )
    );
}

export default AddCategory;
