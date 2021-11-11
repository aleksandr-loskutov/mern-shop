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
import Page from "../../components/page";
import { Link } from "react-router-dom";
// todo добавить Итого - сумму к оплате
function CheckOut() {
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
        <>
            <Page title="оформление заказа">
                <Row>
                    <Col lg="10" className="ml-auto mr-auto mt-2">
                        <Card className="pb-3">
                            <Form className="js-validate">
                                <Container>
                                    <h3 className="title mt-3">Получатель</h3>
                                    <Row>
                                        <Col md="6">
                                            <label className="labels">
                                                Имя{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                aria-label="Cristopher"
                                                name="firstName"
                                                placeholder="Cristopher"
                                                required=""
                                                type="text"
                                            ></Input>
                                        </Col>
                                        <Col md="6">
                                            <label className="labels">
                                                Фамилия{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                aria-label="Thompson"
                                                name="lastName"
                                                placeholder="Thompson"
                                                required=""
                                                type="text"
                                            ></Input>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col md="6">
                                            <div className="js-form-message">
                                                <label className="labels">
                                                    Phone
                                                </label>
                                                <Input
                                                    aria-label="+4 (0762) 230991"
                                                    placeholder="+4 (0762) 230991"
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
                                                    <option>
                                                        Выберите город
                                                    </option>
                                                    <option defaultValue="CZ">
                                                        Czech Republic
                                                    </option>
                                                    <option defaultValue="DK">
                                                        Denmark
                                                    </option>
                                                    <option defaultValue="DO">
                                                        Dominican Republic
                                                    </option>
                                                    <option defaultValue="IQ">
                                                        Iraq
                                                    </option>
                                                    <option defaultValue="IL">
                                                        Israel
                                                    </option>
                                                    <option defaultValue="IT">
                                                        Italy
                                                    </option>
                                                    <option defaultValue="JM">
                                                        Jamaica
                                                    </option>
                                                    <option defaultValue="JP">
                                                        Japan
                                                    </option>
                                                    <option defaultValue="MG">
                                                        Madagascar
                                                    </option>
                                                    <option defaultValue="MT">
                                                        Malta
                                                    </option>
                                                    <option defaultValue="NO">
                                                        Norway
                                                    </option>
                                                    <option defaultValue="PL">
                                                        Poland
                                                    </option>
                                                    <option defaultValue="PT">
                                                        Portugal
                                                    </option>
                                                    <option defaultValue="RO">
                                                        Romania
                                                    </option>
                                                    <option defaultValue="RU">
                                                        Russian Federation
                                                    </option>
                                                    <option defaultValue="LC">
                                                        Saint Lucia
                                                    </option>
                                                    <option defaultValue="WS">
                                                        Samoa
                                                    </option>
                                                    <option defaultValue="SM">
                                                        San Marino
                                                    </option>
                                                    <option defaultValue="SA">
                                                        Saudi Arabia
                                                    </option>
                                                    <option defaultValue="ES">
                                                        Spain
                                                    </option>
                                                    <option defaultValue="SZ">
                                                        Swaziland
                                                    </option>
                                                    <option defaultValue="SE">
                                                        Sweden
                                                    </option>
                                                    <option defaultValue="TR">
                                                        Turkey
                                                    </option>
                                                    <option defaultValue="UG">
                                                        Uganda
                                                    </option>
                                                    <option defaultValue="UA">
                                                        Ukraine
                                                    </option>
                                                    <option defaultValue="AE">
                                                        United Arab Emirates
                                                    </option>
                                                    <option defaultValue="GB">
                                                        United Kingdom
                                                    </option>
                                                    <option defaultValue="US">
                                                        United States
                                                    </option>
                                                    <option defaultValue="VN">
                                                        Viet Nam
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
                                                    aria-label="420 Long Beach, CA"
                                                    name="streetAddress"
                                                    placeholder="420 Long Beach, CA"
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
                                                    aria-label="340112"
                                                    name="postcode"
                                                    placeholder="340112"
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
                                                activeTab === "tab1"
                                                    ? "active"
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
                                            color="info"
                                            className={
                                                activeTab === "tab2"
                                                    ? "active"
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
                                                <Col md="12">
                                                    <div className="js-form-message">
                                                        <label className="form-label">
                                                            Card number
                                                        </label>
                                                        <Input
                                                            aria-label="**** **** **** ***"
                                                            name="cardNumber"
                                                            placeholder="**** **** **** ***"
                                                            required=""
                                                            type="text"
                                                        ></Input>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col md="8">
                                                    <div className="js-form-message mb-4">
                                                        <label className="form-label">
                                                            Card holder
                                                        </label>
                                                        <Input
                                                            aria-label="Jack Wayley"
                                                            name="cardHolder"
                                                            placeholder="Jack Wayley"
                                                            required=""
                                                            type="text"
                                                        ></Input>
                                                    </div>
                                                </Col>
                                                <Col md="2">
                                                    <div className="js-form-message mb-4">
                                                        <label className="form-label">
                                                            Expiration
                                                        </label>
                                                        <Input
                                                            aria-label="MM/YY"
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
                                                            aria-label="***"
                                                            name="cardCVC"
                                                            placeholder="***"
                                                            required=""
                                                            type="text"
                                                        ></Input>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="tab2">
                                            <h5 className="text-dark mt-2">
                                                Оплата заказа при получении
                                                наличными или картой
                                            </h5>
                                        </TabPane>
                                    </TabContent>
                                    <div className="text-right mb-3">
                                        <h4> Итого к оплате: 9000</h4>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Button
                                            to="/cart"
                                            className="btn-round mr-1 btn btn-outline-default"
                                            tag={Link}
                                        >
                                            <i className="fa fa-arrow-left mr-1"></i>
                                            В корзину
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
            </Page>
        </>
    );
}

export default CheckOut;
