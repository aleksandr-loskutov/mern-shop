import React from "react";
import { Button, ButtonGroup, Col, Row, Table } from "reactstrap";
import Page from "../../components/page";

const Cart = () => {
    return (
        <Page title="Корзина">
            <Row>
                <Col className="ml-auto mr-auto" md="10">
                    <Table className="table-shopping" responsive>
                        <thead>
                            <tr>
                                <th className="text-center" />
                                <th />
                                <th className="text-right">Price</th>
                                <th className="text-right">Quantity</th>
                                <th className="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="img-container">
                                        <img
                                            alt="..."
                                            src={
                                                require("assets/img/tables/agenda.png")
                                                    .default
                                            }
                                        />
                                    </div>
                                </td>
                                <td className="td-product">
                                    <strong>Get Shit Done Notebook</strong>
                                    <p>
                                        Most beautiful agenda for the office,
                                        really nice paper and black cover. Most
                                        beautiful agenda for the office.
                                    </p>
                                </td>
                                <td className="td-price">
                                    <small>€</small>
                                    49
                                </td>
                                <td className="td-number td-quantity">
                                    1{" "}
                                    <ButtonGroup>
                                        <Button
                                            className="btn-border btn-round"
                                            color="default"
                                            size="sm"
                                        >
                                            -
                                        </Button>
                                        <Button
                                            className="btn-border btn-round"
                                            color="default"
                                            size="sm"
                                        >
                                            +
                                        </Button>
                                    </ButtonGroup>
                                </td>
                                <td className="td-number">
                                    <small>€</small>
                                    49
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="img-container">
                                        <img
                                            alt="..."
                                            src={
                                                require("assets/img/tables/stylus.jpg")
                                                    .default
                                            }
                                        />
                                    </div>
                                </td>
                                <td className="td-product">
                                    <strong>Stylus</strong>
                                    <p>
                                        Design is not just what it looks like
                                        and feels like. Design is how it works.
                                    </p>
                                </td>
                                <td className="td-price">
                                    <small>€</small>
                                    499
                                </td>
                                <td className="td-number td-quantity">
                                    2{" "}
                                    <ButtonGroup>
                                        <Button
                                            className="btn-border btn-round"
                                            color="default"
                                            size="sm"
                                        >
                                            -
                                        </Button>
                                        <Button
                                            className="btn-border btn-round"
                                            color="default"
                                            size="sm"
                                        >
                                            +
                                        </Button>
                                    </ButtonGroup>
                                </td>
                                <td className="td-number">
                                    <small>€</small>
                                    998
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="img-container">
                                        <img
                                            alt="..."
                                            src={
                                                require("assets/img/tables/evernote.png")
                                                    .default
                                            }
                                        />
                                    </div>
                                </td>
                                <td className="td-product">
                                    <strong>Evernote iPad Stander</strong>
                                    <p>
                                        A groundbreaking Retina display.
                                        All-flash architecture.
                                        Fourth-generation Intel processors.
                                    </p>
                                </td>
                                <td className="td-price">
                                    <small>€</small>
                                    799
                                </td>
                                <td className="td-number td-quantity">
                                    1{" "}
                                    <ButtonGroup>
                                        <Button
                                            className="btn-border btn-round"
                                            color="default"
                                            size="sm"
                                        >
                                            -
                                        </Button>
                                        <Button
                                            className="btn-border btn-round"
                                            color="default"
                                            size="sm"
                                        >
                                            +
                                        </Button>
                                    </ButtonGroup>
                                </td>
                                <td className="td-number">
                                    <small>€</small>
                                    799
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" />
                                <td />
                                <td className="td-total">Total</td>
                                <td className="td-total">
                                    <small>€</small>
                                    12,999
                                </td>
                            </tr>
                            <tr className="tr-actions">
                                <td colSpan="3" />
                                <td className="text-right" colSpan="2">
                                    <Button
                                        color="danger"
                                        size="lg"
                                        type="button"
                                    >
                                        Complete Purchase{" "}
                                        <i className="fa fa-chevron-right" />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Page>
    );
};

export default Cart;
