import React, { useEffect } from "react";
import history from "../../utils/history";
// reactstrap components
import {
    Button,
    Card,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselIndicators,
    CarouselCaption,
    CardBody,
    Table,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";

// core components
import Page from "../../components/page";
import { Link, useParams } from "react-router-dom";
import Preloader from "../../components/preloader";
import StoreServices from "../../components/storeServices";
import { Breadcrumbs } from "../../routing/routes";
import { useCart } from "react-use-cart";
import { useSelector } from "react-redux";
import { getProductByAlias } from "../../store/products";

function ProductPage() {
    const { alias } = useParams();
    const product = useSelector(getProductByAlias(alias));
    const { addItem, inCart, getItem } = useCart();
    const [carouselItems, setCarouselItems] = React.useState([]);
    const [hTabs, setHTabs] = React.useState("1");

    useEffect(() => {
        if (product?.images.length > 0) {
            setCarouselItems(
                product.images.map((path) => {
                    return {
                        src: path,
                        altText: product.name + ".",
                        caption: "HOLODOS.COM"
                    };
                })
            );
        }
        window.scrollTo(0, 0);
    }, [product]);

    // carousel states and functions
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);
    const onExiting = () => {
        setAnimating(true);
    };
    const onExited = () => {
        setAnimating(false);
    };
    const next = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };
    const previous = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("product-page");
        return function cleanup() {
            document.body.classList.remove("product-page");
        };
    });

    return (
        <>
            <Page>
                {product ? (
                    <>
                        <Breadcrumbs lastCrumbName={product.name} />
                        <Row>
                            <Col md="7" sm="6">
                                <div className="ml-auto mr-auto" id="carousel">
                                    <Card className="page-carousel">
                                        <Carousel
                                            activeIndex={activeIndex}
                                            next={next}
                                            previous={previous}
                                        >
                                            <CarouselIndicators
                                                items={carouselItems}
                                                activeIndex={activeIndex}
                                                onClickHandler={goToIndex}
                                            />
                                            {carouselItems.map((item) => {
                                                return (
                                                    <CarouselItem
                                                        onExiting={onExiting}
                                                        onExited={onExited}
                                                        key={item.src}
                                                    >
                                                        <img
                                                            src={item.src}
                                                            alt={item.altText}
                                                        />
                                                        <CarouselCaption
                                                            captionText={
                                                                item.caption
                                                            }
                                                            captionHeader=""
                                                        />
                                                    </CarouselItem>
                                                );
                                            })}
                                            <a
                                                className="left carousel-control carousel-control-prev"
                                                data-slide="prev"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    previous();
                                                }}
                                                role="button"
                                            >
                                                <span className="fa fa-angle-left" />
                                                <span className="sr-only">
                                                    Previous
                                                </span>
                                            </a>
                                            <a
                                                className="right carousel-control carousel-control-next"
                                                data-slide="next"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    next();
                                                }}
                                                role="button"
                                            >
                                                <span className="fa fa-angle-right" />
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                            </a>
                                        </Carousel>
                                    </Card>
                                </div>
                                {/* end carousel */}
                            </Col>
                            <Col md="5" sm="6">
                                <h3>{product.name}</h3>
                                <hr />
                                <h5 className="price mb-3">
                                    <strong>Цена: {product.price}₽ </strong>
                                </h5>{" "}
                                <hr />
                                <p>
                                    Артикул:{" "}
                                    <span className="font-weight-bold text-secondary">
                                        {product.article}
                                    </span>
                                </p>
                                <p>
                                    Бренд:{" "}
                                    <Link
                                        className="font-weight-bold text-primary"
                                        to={`/catalog/${product.brand.toLowerCase()}`}
                                    >
                                        {product.brand}
                                    </Link>
                                </p>
                                {product.stock > 0 ? (
                                    <p className="text-success font-weight-bold">
                                        В наличии {product.stock} шт.
                                    </p>
                                ) : (
                                    <p className="text-danger font-weight-bold">
                                        Временно отсутствует
                                    </p>
                                )}
                                <hr />
                                <Row>
                                    <Col className="offset-md-5" md="7" sm="8">
                                        <Button
                                            block
                                            className="btn-round"
                                            color="danger"
                                            onClick={
                                                !inCart(product._id)
                                                    ? () =>
                                                          addItem(
                                                              {
                                                                  id: product._id,
                                                                  price: product.price
                                                              },
                                                              1
                                                          )
                                                    : () =>
                                                          history.push("/cart")
                                            }
                                        >
                                            {inCart(product._id)
                                                ? `Уже в корзине ${
                                                      getItem(product._id)
                                                          .quantity
                                                  } шт`
                                                : "В корзину"}
                                            <i className="fa fa-chevron-right" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Card className="card-refine">
                            <CardBody>
                                <div className="nav-tabs-navigation text-left">
                                    <div className="nav-tabs-wrapper">
                                        <Nav id="tabs" role="tablist" tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={
                                                        hTabs === "1"
                                                            ? "active"
                                                            : ""
                                                    }
                                                    onClick={() => {
                                                        setHTabs("1");
                                                    }}
                                                    href="#"
                                                >
                                                    Характеристики
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={
                                                        hTabs === "2"
                                                            ? "active"
                                                            : ""
                                                    }
                                                    onClick={() => {
                                                        setHTabs("2");
                                                    }}
                                                    href="#"
                                                >
                                                    Описание
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </div>

                                <TabContent
                                    className="text-justify"
                                    activeTab={"hTabs" + hTabs}
                                >
                                    <TabPane tabId="hTabs1">
                                        {product.features?.length > 0 ? (
                                            <Table>
                                                <tbody>
                                                    {product.features.map(
                                                        (feature, i) => (
                                                            <tr
                                                                key={
                                                                    feature.name
                                                                }
                                                            >
                                                                <td
                                                                    className={
                                                                        i === 0
                                                                            ? "text-left border-0"
                                                                            : "text-left"
                                                                    }
                                                                >
                                                                    {
                                                                        feature.name
                                                                    }
                                                                </td>

                                                                <td
                                                                    className={
                                                                        i === 0
                                                                            ? "text-right border-0"
                                                                            : "text-right"
                                                                    }
                                                                >
                                                                    {
                                                                        feature.value
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            "Характеристики скоро появятся...."
                                        )}
                                    </TabPane>
                                    <TabPane tabId="hTabs2">
                                        <p> {product.description}</p>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                        <StoreServices className={"card-body-row"} />
                    </>
                ) : (
                    <Preloader />
                )}
            </Page>
        </>
    );
}
//todo fix rerender slider
// const [collapses, setCollapses] = React.useState([1]);
// const changeCollapse = (collapse) => {
//     if (collapses.includes(collapse)) {
//         setCollapses(collapses.filter((prop) => prop !== collapse));
//     } else {
//         setCollapses([...collapses, collapse]);
//     }
// };
export default ProductPage;
