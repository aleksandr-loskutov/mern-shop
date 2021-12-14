import React, { useEffect, useState } from "react";
// JavaScript library for creating Dropdown Selects
// import Choices from "choices.js";
// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Form
} from "reactstrap";
import { Link } from "react-router-dom";
import { TextField } from "./form";
import * as yup from "yup";
import SelectField from "./form/fields/selectField";
const cityList = [
    {
        name: "Санкт-Петербург",
        value: "SPb"
    },
    {
        name: "Москва",
        value: "Msk"
    }
];
function CheckOut({ cartProducts }) {
    const [data, setData] = useState({
        name: "",
        lastName: "",
        phone: "",
        city: "",
        address: "",
        postCode: "",
        paymentType: "",
        cardNumber: "",
        cardHolder: "",
        cardExpirationDate: "",
        cardCVC: ""
    });
    const cardFields = [
        "cardNumber",
        "cardNumber",
        "cardHolder",
        "cardExpirationDate",
        "cardCVC"
    ];

    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = React.useState("tab1");
    React.useEffect(() => {
        document.body.classList.add("checkout-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("checkout-page");
        };
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateSchema = yup.object().shape({
        cardCVC: yup.string().required("Укажите CVC"),
        cardExpirationDate: yup.string().required("Укажите срок действия"),
        cardHolder: yup.string().required("Укажите имя на карте"),
        cardNumber: yup.string().required("Укажите номер карты"),
        postCode: yup.string().required("Укажите индекс"),
        address: yup.string().required("Укажите адрес"),
        city: yup.string().oneOf(
            [
                ...cityList.reduce((acc, cityObj) => {
                    acc.push(cityObj.value);
                    return acc;
                }, []),
                null
            ],
            "Выберите город"
        ),
        phone: yup
            .string()
            .required("Укажите телефон")
            .matches(/^\+?7(\d{10})$/, "Укажите корректный номер через +7"),
        lastName: yup.string().required("Укажите фамилию"),
        name: yup.string().required("Укажите имя")
    });
    const isValid = () => {
        return (
            Object.keys(data).length > 0 &&
            Object.keys(errors).length === 0 &&
            Object.values(data).join("").length > 0
        );
    };

    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => {
                setErrors({ [err.path]: err.message });
                // if (!(cardFields.includes(err.path) && activeTab === "tab1")) {
                // }
            });

        return isValid();
    };

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate();
        }
        // eslint-disable-next-line
    }, [data]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        console.log("handleSubmit isValid", isValid);
        console.log("errors", errors);
        if (!isValid) return;
        console.log("handleSubmit", data);
        //отправляем
    };

    return (
        <Row>
            <Col lg="10" className="ml-auto mr-auto mt-2">
                <Card className="pb-3 card-refine">
                    <Container>
                        <Form onSubmit={handleSubmit} className="js-validate">
                            <h3 className="title mt-3">Получатель</h3>
                            <Row>
                                <Col md="6">
                                    <TextField
                                        label="Имя"
                                        name="name"
                                        required={true}
                                        onChange={handleChange}
                                        autoFocus
                                        value={data.name}
                                        error={errors.name}
                                    />
                                </Col>
                                <Col md="6">
                                    <TextField
                                        label="Фамилия"
                                        name="lastName"
                                        required={true}
                                        onChange={handleChange}
                                        value={data.lastName}
                                        error={errors.lastName}
                                    />
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col md="6">
                                    <div className="js-form-message">
                                        <TextField
                                            label="Телефон"
                                            name="phone"
                                            required={true}
                                            onChange={handleChange}
                                            value={data.phone}
                                            error={errors.phone}
                                        />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-4">
                                        <SelectField
                                            label="Город"
                                            defaultOption="Выберите..."
                                            name="city"
                                            options={cityList}
                                            defaultValue={data.city}
                                            onChange={handleChange}
                                            error={errors.city}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="8">
                                    <div className="js-form-message">
                                        <TextField
                                            label="Адрес доставки"
                                            name="address"
                                            required={true}
                                            onChange={handleChange}
                                            value={data.address}
                                            error={errors.address}
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="js-form-message">
                                        <TextField
                                            label="Почтовый индекс"
                                            name="postCode"
                                            required={true}
                                            onChange={handleChange}
                                            value={data.postCode}
                                            error={errors.postCode}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <br></br>

                            <h4 className="title">Способ оплаты</h4>
                            <ButtonGroup
                                className="nav nav-tabs nav-tabs-primary"
                                role="tablist"
                            >
                                <Button
                                    color="default"
                                    className={
                                        activeTab === "tab1"
                                            ? "active text-white"
                                            : ""
                                    }
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab("tab1");
                                    }}
                                    outline
                                    role="tablist"
                                    size="sm"
                                >
                                    Картой онлайн
                                </Button>
                                <Button
                                    color="default"
                                    className={
                                        activeTab === "tab2"
                                            ? "active text-white"
                                            : ""
                                    }
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab("tab2");
                                    }}
                                    outline
                                    role="tablist"
                                    size="sm"
                                >
                                    При получении
                                </Button>
                            </ButtonGroup>
                            <TabContent
                                className="tab-space"
                                activeTab={activeTab}
                            >
                                <TabPane tabId="tab1">
                                    <Row>
                                        <Col md="12" className="mt-4">
                                            <div className="js-form-message">
                                                <TextField
                                                    label="Номер карты"
                                                    name="cardNumber"
                                                    placeholder="**** **** **** ****"
                                                    required={
                                                        activeTab === "tab1"
                                                    }
                                                    type="number"
                                                    onChange={handleChange}
                                                    value={data.cardNumber}
                                                    error={errors.cardNumber}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col md="8">
                                            <div className="js-form-message mb-4">
                                                <TextField
                                                    label="Имя на карте"
                                                    name="cardHolder"
                                                    required={
                                                        activeTab === "tab1"
                                                    }
                                                    onChange={handleChange}
                                                    value={data.cardHolder}
                                                    error={errors.cardHolder}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className="js-form-message mb-4">
                                                <TextField
                                                    label="Срок действия"
                                                    name="cardExpirationDate"
                                                    placeholder="MM/YY"
                                                    required={
                                                        activeTab === "tab1"
                                                    }
                                                    onChange={handleChange}
                                                    value={
                                                        data.cardExpirationDate
                                                    }
                                                    error={
                                                        errors.cardExpirationDate
                                                    }
                                                />
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className="js-form-message mb-4">
                                                <TextField
                                                    label="CVC"
                                                    name="cardCVC"
                                                    placeholder="***"
                                                    type="password"
                                                    required={
                                                        activeTab === "tab1"
                                                    }
                                                    onChange={handleChange}
                                                    value={data.cardCVC}
                                                    error={errors.cardCVC}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="tab2">
                                    <h5 className="text-dark mt-5">
                                        Оплата заказа при получении наличными
                                        или картой
                                    </h5>
                                </TabPane>
                            </TabContent>
                            <div className="text-right mb-3">
                                <h4>
                                    Итого к оплате:{" "}
                                    {cartProducts.reduce(
                                        (acc, product) =>
                                            acc +
                                            product.price *
                                                product.cartQuantity,
                                        0
                                    )}
                                </h4>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <Button
                                    to="/cart"
                                    className=" mr-1 btn btn-outline-default"
                                    tag={Link}
                                >
                                    <i className="fa fa-arrow-left mr-1"></i>В
                                    корзину
                                </Button>
                                <Button
                                    color="danger"
                                    size="lg"
                                    type="submit"
                                    disabled={!isValid()}
                                >
                                    ЗАКАЗАТЬ{" "}
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Card>
            </Col>
        </Row>
    );
}

export default CheckOut;
