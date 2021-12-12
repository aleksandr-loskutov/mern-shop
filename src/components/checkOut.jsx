import React from "react";
// JavaScript library for creating Dropdown Selects
// import Choices from "choices.js";
// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    Form,
    Input,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";
import Page from "./page";
import { Link } from "react-router-dom";
// todo добавить Итого - сумму к оплате
function CheckOut({ cartProducts }) {
    const [activeTab, setActiveTab] = React.useState("tab1");
    React.useEffect(() => {
        document.body.classList.add("checkout-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("checkout-page");
        };
    }, []);
    return (
        <Row>
            <Col lg="10" className="ml-auto mr-auto mt-2">
                <Card className="pb-3 card-refine">
                    <Form className="js-validate">
                        <Container>
                            <h3 className="title mt-3">Получатель</h3>
                            <Row>
                                <Col md="6">
                                    <label className="labels">
                                        Имя{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        name="firstName"
                                        placeholder=""
                                        required=""
                                        type="text"
                                    ></Input>
                                </Col>
                                <Col md="6">
                                    <label className="labels">
                                        Фамилия{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        name="lastName"
                                        placeholder=""
                                        required=""
                                        type="text"
                                    ></Input>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col md="6">
                                    <div className="js-form-message">
                                        <label className="labels">Phone</label>
                                        <Input
                                            placeholder=""
                                            type="text"
                                        ></Input>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-4">
                                        <label className="labels">
                                            Город{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            data-trigger=""
                                            id="choices-single-default"
                                            name="choices-single-default"
                                            type="select"
                                        >
                                            <option defaultValue="SPB">
                                                Санкт-Петербург
                                            </option>
                                            <option defaultValue="MSK">
                                                Москва
                                            </option>
                                        </Input>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="8">
                                    <div className="js-form-message">
                                        <label className="labels">
                                            Адрес доставки{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            name="streetAddress"
                                            placeholder=""
                                            required=""
                                            type="text"
                                        ></Input>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="js-form-message">
                                        <label className="labels">
                                            Почтовый индекс{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            name="postcode"
                                            placeholder=""
                                            required=""
                                            type="text"
                                        ></Input>
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
                                    color="info"
                                    className={
                                        activeTab === "tab1" ? "active" : ""
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
                                    color="info"
                                    className={
                                        activeTab === "tab2" ? "active" : ""
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
                                                <label className="form-label">
                                                    Номер карты
                                                </label>
                                                <Input
                                                    name="cardNumber"
                                                    placeholder="**** **** **** ***"
                                                    required=""
                                                    type="number"
                                                ></Input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col md="8">
                                            <div className="js-form-message mb-4">
                                                <label className="form-label">
                                                    Имя на карте
                                                </label>
                                                <Input
                                                    name="cardHolder"
                                                    placeholder=""
                                                    required=""
                                                    type="text"
                                                ></Input>
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className="js-form-message mb-4">
                                                <label className="form-label">
                                                    Срок действия
                                                </label>
                                                <Input
                                                    name="cardExpirationDate"
                                                    placeholder="MM/YY"
                                                    required=""
                                                    type="text"
                                                ></Input>
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className="js-form-message mb-4">
                                                <label className="form-label">
                                                    CVC
                                                </label>
                                                <Input
                                                    name="cardCVC"
                                                    placeholder="***"
                                                    required=""
                                                    type="password"
                                                ></Input>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="tab2">
                                    <h5 className="text-dark mt-2">
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
                                    className="btn-round mr-1 btn btn-outline-default"
                                    tag={Link}
                                >
                                    <i className="fa fa-arrow-left mr-1"></i>В
                                    корзину
                                </Button>
                                <Button
                                    className="btn-round mr-1 btn btn-outline-info btn-lg"
                                    type="submit"
                                >
                                    ЗАКАЗАТЬ
                                </Button>
                            </div>
                        </Container>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default CheckOut;
