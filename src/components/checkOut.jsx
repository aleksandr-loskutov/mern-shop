import React, { useState } from "react";
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
    Col
} from "reactstrap";
import { Link } from "react-router-dom";
import FormComponent, { TextField } from "./form";
import * as yup from "yup";
import SelectField from "./form/fields/selectField";
function CheckOut({ cartProducts }) {
    const [data, setData] = useState({
        name: "Александр",
        lastName: "",
        phone: "",
        city: "",
        address: "",
        postalCode: "",
        paymentType: "",
        cardNumber: "",
        cardHolder: "",
        cardExpirationDate: "",
        cardCVC: ""
    });
    const [activeTab, setActiveTab] = React.useState("tab1");
    React.useEffect(() => {
        document.body.classList.add("checkout-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("checkout-page");
        };
    }, []);
    const handleSubmit = (data) => {
        console.log("data", data);
        console.log("success, main handleSubmit");
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
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
    const validateSchema = yup.object().shape({
        name: yup.string().required("Заполните имя"),
        lastName: yup.string().required("Заполните фамилию"),
        phone: yup.string().required("Телефон обязателен")
    });
    return (
        <Row>
            <Col lg="10" className="ml-auto mr-auto mt-2">
                <Card className="pb-3 card-refine">
                    <Container>
                        <FormComponent
                            onSubmit={handleSubmit}
                            validatorConfig={validateSchema}
                            className="js-validate"
                            defaultData={data}
                        >
                            <h3 className="title mt-3">Получатель</h3>
                            <Row>
                                <Col md="6">
                                    <TextField
                                        label="Имя"
                                        name="name"
                                        required={true}
                                        autoFocus
                                    />
                                </Col>
                                <Col md="6">
                                    <TextField
                                        label="Фамилия"
                                        name="lastName"
                                        required={true}
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
                                            onChange={handleChange}
                                            defaultValue={cityList[0].value}
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
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="js-form-message">
                                        <TextField
                                            label="Почтовый индекс"
                                            name="postCode"
                                            required={true}
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
                                                    required={activeTab}
                                                    type="number"
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
                                                    required={activeTab}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className="js-form-message mb-4">
                                                <TextField
                                                    label="Срок действия"
                                                    name="cardExpirationDate"
                                                    placeholder="MM/YY"
                                                    required={activeTab}
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
                                                    required={activeTab}
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
                                <Button color="danger" size="lg" type="submit">
                                    ЗАКАЗАТЬ{" "}
                                </Button>
                            </div>
                        </FormComponent>
                    </Container>
                </Card>
            </Col>
        </Row>
    );
}

export default CheckOut;
