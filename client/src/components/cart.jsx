import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useSelector } from "react-redux";
import { getProducts } from "../store/products";
import { validateCartProducts } from "../utils/validateCartProducts";
import Preloader from "./preloader";
import Page from "./page";
const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const { isEmpty, items, updateItemQuantity } = useCart();
    const products = useSelector(getProducts());
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (products.length > 0) {
            setCartProducts(
                !isEmpty ? validateCartProducts(items, products) : []
            );
            if (!isLoaded) {
                setIsLoaded(true);
            }
        }
        // eslint-disable-next-line
    }, [products, items]);
    return (
        <Page title="Корзина">
            {isLoaded ? (
                <Card className="mt-4 card-refine">
                    <Row>
                        <Col className="ml-auto mr-auto" md="10">
                            <Table className="table-shopping" responsive>
                                <thead>
                                    <tr>
                                        <th className="text-center" colSpan="2">
                                            Товар
                                        </th>
                                        <th className="text-right">Цена</th>
                                        <th className="text-right">
                                            Количество
                                        </th>
                                        <th className="text-right">Всего</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartProducts?.length > 0 ? (
                                        cartProducts?.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    <div className="img-container">
                                                        <Link
                                                            to={`/product/${product.urlAlias}`}
                                                        >
                                                            {product.images
                                                                ?.length >
                                                                0 && (
                                                                <img
                                                                    alt={
                                                                        product.name +
                                                                        "."
                                                                    }
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                    }
                                                                />
                                                            )}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="td-product">
                                                    <Link
                                                        to={`/product/${product.urlAlias}`}
                                                    >
                                                        <strong>
                                                            {product.name}
                                                        </strong>
                                                    </Link>
                                                    <p>
                                                        {product.description
                                                            ?.length > 0
                                                            ? product.description.substring(
                                                                  0,
                                                                  100
                                                              ) + "..."
                                                            : ""}
                                                    </p>
                                                </td>
                                                <td className="td-price">
                                                    {product.price}
                                                </td>
                                                <td className="td-number td-quantity">
                                                    {product.cartQuantity}
                                                    <ButtonGroup>
                                                        <Button
                                                            className="btn-outline-secondary"
                                                            color="default"
                                                            size="sm"
                                                            onClick={() =>
                                                                updateItemQuantity(
                                                                    product._id,
                                                                    product.cartQuantity -
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </Button>
                                                        <Button
                                                            className="btn-outline-secondary"
                                                            color="secondary"
                                                            size="sm"
                                                            onClick={() =>
                                                                updateItemQuantity(
                                                                    product._id,
                                                                    product.cartQuantity +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </Button>
                                                    </ButtonGroup>
                                                </td>
                                                <td className="td-number">
                                                    {product.cartQuantity *
                                                        product.price}{" "}
                                                    <small className="font-weight-bold">
                                                        ₽
                                                    </small>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
                                                <h3 className="text-secondary font-weight-bold mb-4">
                                                    В корзине пусто :(
                                                </h3>
                                                <Button
                                                    color="danger"
                                                    className="btn-lg btn-round"
                                                    to="/catalog/"
                                                    tag={Link}
                                                >
                                                    ЗА ПОКУПКАМИ
                                                </Button>
                                            </td>
                                        </tr>
                                    )}
                                    {cartProducts.length > 0 && (
                                        <>
                                            <tr>
                                                <td colSpan="2" />
                                                <td />
                                                <td className="td-total">
                                                    Итого
                                                </td>
                                                <td className="td-total">
                                                    {cartProducts.reduce(
                                                        (acc, product) =>
                                                            acc +
                                                            product.price *
                                                                product.cartQuantity,
                                                        0
                                                    )}{" "}
                                                    <small className="font-weight-bold">
                                                        ₽
                                                    </small>
                                                </td>
                                            </tr>

                                            <tr className="tr-actions">
                                                <td colSpan="3">
                                                    <Button
                                                        to="/catalog/"
                                                        className=" mr-1 btn btn-outline-default"
                                                        tag={Link}
                                                    >
                                                        <i className="fa fa-arrow-left mr-1"></i>
                                                        Продолжить покупки
                                                    </Button>
                                                </td>
                                                <td
                                                    className="text-right"
                                                    colSpan="2"
                                                >
                                                    <Button
                                                        color="danger"
                                                        size="lg"
                                                        type="button"
                                                        to="/checkout"
                                                        tag={Link}
                                                    >
                                                        ЗАКАЗАТЬ{" "}
                                                        <i className="fa fa-chevron-right" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
            ) : (
                <Preloader blockClass="mt-5" />
            )}
        </Page>
    );
};

export default Cart;
