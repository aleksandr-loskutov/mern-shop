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
const deliveryMethods = [
    {
        name: "Самовывоз",
        value: "pickup"
    },
    {
        name: "Курьер (+700 руб.)",
        value: "courier",
        price: 700
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
        deliveryMethod: "pickup",
        paymentType: "",
        cardNumber: "",
        cardHolder: "",
        cardExpirationDate: "",
        cardCVC: "",
        extraPrice: 0
    });
    const cardFields = [
        "cardNumber",
        "cardNumber",
        "cardHolder",
        "cardExpirationDate",
        "cardCVC"
    ];

    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = React.useState("card");
    React.useEffect(() => {
        document.body.classList.add("checkout-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("checkout-page");
        };
    }, []);

    const handleChange = (target) => {
        setData((prevState) => {
            //adding extra price
            const extra = { extraPrice: 0 };
            if (target.name === "deliveryMethod") {
                const found = deliveryMethods.find(
                    (method) =>
                        method.value === target.value && method.price > 0
                );
                found
                    ? (extra.extraPrice = found.price)
                    : (extra.extraPrice = 0);
            }
            //adding slash to card expire field
            const cardExpireDateWithSlash = {
                cardExpirationDate: data.cardExpirationDate
            };
            if (target.name === "cardExpirationDate") {
                target.value.length === 2 && !target.value.includes("/")
                    ? (cardExpireDateWithSlash.cardExpirationDate =
                          target.value + "/")
                    : (cardExpireDateWithSlash.cardExpirationDate =
                          target.value);
            }
            return {
                ...prevState,
                [target.name]: target.value,
                ...extra,
                ...cardExpireDateWithSlash
            };
        });
    };

    const validateSchema = yup.object().shape({
        cardCVC: yup
            .string()
            .required("Укажите CVC")
            .matches(/^\d{3}$/, "Укажите корректный номер"),
        cardExpirationDate: yup
            .string()
            .required("Укажите срок действия")
            .matches(/^\d{2}\/\d{2}$/, "Укажите в формате MM/YY"),
        cardHolder: yup.string().required("Укажите имя на карте"),
        cardNumber: yup
            .string()
            .required("Укажите номер карты")
            .matches(/^\d{16}$/, "Укажите корректный номер"),
        deliveryMethod: yup.string().oneOf(
            [
                ...deliveryMethods.reduce((acc, methodObj) => {
                    acc.push(methodObj.value);
                    return acc;
                }, []),
                null
            ],
            "Выберите способ получения заказа"
        ),
        postCode: yup
            .string()
            .required("Укажите индекс")
            .matches(/^\d{6}$/, "Укажите корректный индекс"),
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
                const error = cardFields.includes(err.path)
                    ? activeTab === "card"
                        ? { [err.path]: err.message }
                        : {}
                    : { [err.path]: err.message };

                setErrors(error);
            });

        return isValid();
    };

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate();
        }
        if (data.paymentType !== activeTab)
            setData((prevState) => {
                return { ...prevState, paymentType: activeTab };
            });
        // eslint-disable-next-line
    }, [data, activeTab]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        // console.log("handleSubmit isValid", isValid);
        // console.log("errors", errors);
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
                            <Row>
                                {" "}
                                <Col md="6">
                                    <h3 className="title mt-3">Получатель</h3>
                                </Col>{" "}
                                <Col md="6">
                                    <a
                                        className="text-info mt-3 pull-right "
                                        href="#link"
                                        onClick={() => setData(getDemoData())}
                                    >
                                        Заполнить демо данными?
                                    </a>
                                </Col>
                            </Row>
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
                            <Row className="mt-3 justify-content-center">
                                <Col md="5">
                                    <h4 className="pull-right mt-1">
                                        Способ получения заказа:
                                    </h4>
                                </Col>
                                <Col md="5">
                                    <div className="text-center">
                                        <SelectField
                                            defaultOption="Выберите..."
                                            name="deliveryMethod"
                                            options={deliveryMethods}
                                            defaultValue={
                                                deliveryMethods[0].value
                                            }
                                            onChange={handleChange}
                                            error={errors.deliveryMethod}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <h4 className="title">Способ оплаты</h4>
                            <ButtonGroup
                                className="nav nav-tabs nav-tabs-primary"
                                role="tablist"
                            >
                                <Button
                                    color="default"
                                    className={
                                        activeTab === "card"
                                            ? "active text-white"
                                            : ""
                                    }
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab("card");
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
                                        activeTab === "onDelivery"
                                            ? "active text-white"
                                            : ""
                                    }
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab("onDelivery");
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
                                <TabPane tabId="card">
                                    <Row>
                                        <Col md="12" className="mt-4">
                                            <div className="js-form-message">
                                                <TextField
                                                    label="Номер карты"
                                                    name="cardNumber"
                                                    placeholder="**** **** **** ****"
                                                    required={
                                                        activeTab === "card"
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
                                                        activeTab === "card"
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
                                                        activeTab === "card"
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
                                                        activeTab === "card"
                                                    }
                                                    onChange={handleChange}
                                                    value={data.cardCVC}
                                                    error={errors.cardCVC}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="onDelivery">
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
                                    ) + data.extraPrice}
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

function getDemoData() {
    return {
        name: "Иван",
        lastName: "Иванов",
        phone: "+79216666666",
        city: "SPb",
        address: "ул. Ленина дом 3/2 кв. 42",
        postCode: "194080",
        deliveryMethod: "pickup",
        paymentType: "card",
        cardNumber: "5455545554543432",
        cardHolder: "Ivanov Ivan",
        cardExpirationDate: "05/23",
        cardCVC: "543",
        extraPrice: 0
    };
}
export default CheckOut;
