import React, { useEffect, useState } from "react";
import { ROUTES } from "../../routing/routes";

// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";
// reactstrap components
import {
    Button,
    Card,
    FormGroup,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselIndicators,
    CarouselCaption,
    UncontrolledCollapse,
    CardBody,
    CardHeader,
    Collapse,
    Table,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";

// core components
import Page from "../../components/page";
import { useParams } from "react-router-dom";
import productService from "../../services/product.service";
import Preloader from "../../components/preloader";
import StoreServices from "../../components/storeServices";

function ProductPage({ match }) {
    const { alias } = useParams();
    //console.log("match", match);
    const [product, setProduct] = useState();
    // const breadcrumbs = useBreadcrumbs(ROUTES, { disableDefaults: false }); //ROUTES
    const [carouselItems, setCarouselItems] = React.useState([]);
    const [hTabs, setHTabs] = React.useState("1");

    //todo replace to redux/context
    useEffect(() => {
        if (alias) {
            productService.get(alias).then((data) => {
                if (data.content?.[0]) setProduct(data.content[0]);
            });
        }
    }, []);

    useEffect(() => {
        if (product?.images.length > 0) {
            setCarouselItems(
                product.images.map((path) => {
                    //todo fix require issue with path by direct same string image variable
                    return {
                        src: require(`assets/img/products/${product.article}/${
                            path.split("/")[4]
                        }`).default,
                        altText: product.name + ".",
                        caption: "HOLODOS.COM"
                    };
                })
            );
        }
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
    //todo fix rerender slider
    // console.log("product", product);
    // console.log("images", carouselItems);
    const [collapses, setCollapses] = React.useState([1]);
    const changeCollapse = (collapse) => {
        if (collapses.includes(collapse)) {
            setCollapses(collapses.filter((prop) => prop !== collapse));
        } else {
            setCollapses([...collapses, collapse]);
        }
    };
    return (
        <>
            <Page>
                {product ? (
                    <>
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
                                <h2>{product.name}</h2>
                                <h4 className="price">
                                    <strong>₽ {product.price}</strong>
                                </h4>
                                <hr />
                                <p>Бренд: {product.brand}</p>
                                {product.stock > 0 ? (
                                    <p className="text-success font-weight-bold">
                                        В наличии {product.stock} шт.
                                    </p>
                                ) : (
                                    <p className="text-danger font-weight-bold">
                                        Временно отсутствует
                                    </p>
                                )}

                                <p>Артикул: {product.article}</p>

                                <hr />
                                <Row>
                                    <Col className="offset-md-5" md="7" sm="8">
                                        <Button
                                            block
                                            className="btn-round"
                                            color="danger"
                                        >
                                            В корзину
                                            <i className="fa fa-chevron-right" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Card>
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
                                        <Table>
                                            <tbody>
                                                {product.features?.length > 0
                                                    ? product.features.map(
                                                          (feature, i) => (
                                                              <>
                                                                  <tr
                                                                      key={
                                                                          feature.name
                                                                      }
                                                                  >
                                                                      <td
                                                                          className={
                                                                              i ===
                                                                              0
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
                                                                              i ===
                                                                              0
                                                                                  ? "text-right border-0"
                                                                                  : "text-right"
                                                                          }
                                                                      >
                                                                          {
                                                                              feature.value
                                                                          }
                                                                      </td>
                                                                  </tr>
                                                              </>
                                                          )
                                                      )
                                                    : ""}
                                            </tbody>
                                        </Table>
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

export default ProductPage;
