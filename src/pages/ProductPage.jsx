import React from "react";
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
    CarouselCaption
} from "reactstrap";

// core components
import Page from "../components/page";
import Breadcrumbs from "../components/breadcrumbs";

// carousel items
const carouselItems = [
    {
        src: require("assets/img/jacket-1.jpg").default,
        altText: "Somewhere",
        caption: "Somewhere"
    },
    {
        src: require("assets/img/jacket-2.jpg").default,
        altText: "Somewhere else",
        caption: "Somewhere else"
    },
    {
        src: require("assets/img/jacket-3.jpg").default,
        altText: "Here it is",
        caption: "Here it is"
    },
    {
        src: require("assets/img/jacket-4.jpg").default,
        altText: "Here it is",
        caption: "Here it is"
    }
];

function ProductPage() {
    // react-select states
    const [colorSelect, setColorSelect] = React.useState({
        value: "1",
        label: "Black "
    });
    const [sizeSelect, setSizeSelect] = React.useState({
        value: "1",
        label: "Small "
    });
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
                <Breadcrumbs />
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
                                                    captionText={item.caption}
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
                                        <span className="sr-only">Next</span>
                                    </a>
                                </Carousel>
                            </Card>
                        </div>
                        {/* end carousel */}
                    </Col>
                    <Col md="5" sm="6">
                        <h2>Suede Blazer</h2>
                        <h4 className="price">
                            <strong>€ 2,900.00</strong>
                        </h4>
                        <hr />
                        <p>
                            This blazer in suede is a must-have of your
                            wardrobe. Team it with a angora blazer and a angora
                            sweater.
                        </p>
                        <span className="label label-default shipping">
                            Free shipping to Europe
                        </span>
                        <Row>
                            <Col md="6" sm="6">
                                <label>Select color</label>
                                <FormGroup>
                                    <Select
                                        className="react-select react-select-default"
                                        classNamePrefix="react-select"
                                        name="colorSelect"
                                        value={colorSelect}
                                        onChange={(value) =>
                                            setColorSelect(value)
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Black "
                                            },
                                            {
                                                value: "2",
                                                label: "Gray"
                                            },
                                            {
                                                value: "3",
                                                label: "White"
                                            }
                                        ]}
                                        placeholder="COLOR"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6" sm="6">
                                <label>Select size</label>
                                <FormGroup>
                                    <Select
                                        className="react-select react-select-default"
                                        classNamePrefix="react-select"
                                        name="sizeSelect"
                                        value={sizeSelect}
                                        onChange={(value) =>
                                            setSizeSelect(value)
                                        }
                                        options={[
                                            {
                                                value: "1",
                                                label: "Small "
                                            },
                                            {
                                                value: "2",
                                                label: "Medium"
                                            },
                                            {
                                                value: "3",
                                                label: "Large"
                                            }
                                        ]}
                                        placeholder="SIZE"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="offset-md-5" md="7" sm="8">
                                <Button
                                    block
                                    className="btn-round"
                                    color="danger"
                                >
                                    Add to Cart
                                    <i className="fa fa-chevron-right" />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="card-body-row">
                    <Col md="4" sm="4">
                        <div className="info">
                            <div className="icon icon-warning">
                                <i className="nc-icon nc-delivery-fast" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">2 Days Delivery</h4>
                                <p>
                                    Spend your time generating new ideas. You
                                    don't have to think of implementing anymore.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md="4" sm="4">
                        <div className="info">
                            <div className="icon icon-danger">
                                <i className="nc-icon nc-credit-card" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">
                                    Refundable Policy
                                </h4>
                                <p>
                                    Larger, yet dramatically thinner. More
                                    powerful, but remarkably power efficient.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md="4" sm="4">
                        <div className="info">
                            <div className="icon icon-success">
                                <i className="nc-icon nc-bulb-63" />
                            </div>
                            <div className="description">
                                <h4 className="info-title">Popular Item</h4>
                                <p>
                                    Choose from a veriety of colors resembling
                                    sugar paper pastels.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Page>
        </>
    );
}

export default ProductPage;
