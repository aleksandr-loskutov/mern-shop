import React from "react";
// plugin that creates slider
import Slider from "nouislider";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Collapse,
    Label,
    FormGroup,
    Input,
    Row,
    Col
} from "reactstrap";

// core components

import { useParams } from "react-router-dom";
import ProductList from "../components/productList";
import Page from "../components/page";

function Catalog() {
    // states for collapses
    const { alias } = useParams();
    const [priceRange, setPriceRange] = React.useState(true);
    const [clothing, setClothing] = React.useState(false);
    const [designer, setDesigner] = React.useState(false);
    const [color, setColor] = React.useState(false);
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        if (
            !document
                .getElementById("sliderDouble")
                .classList.contains("noUi-target")
        ) {
            Slider.create(document.getElementById("sliderDouble"), {
                start: [20, 80],
                connect: [false, true, false],
                step: 1,
                range: { min: 0, max: 100 }
            });
        }
        document.body.classList.add("ecommerce-page");
        return function cleanup() {
            document.body.classList.remove("ecommerce-page");
        };
    });
    return (
        <Page title={alias ? alias : "Каталог"}>
            <Row>
                <Col md="3">
                    <Card className="card-refine">
                        <div
                            aria-expanded={true}
                            aria-multiselectable={true}
                            className="panel-group"
                            id="accordion"
                        >
                            <CardHeader
                                className="card-collapse"
                                id="priceRanger"
                                role="tab"
                            >
                                <h5 className="mb-0 panel-title">
                                    <a
                                        aria-expanded={priceRange}
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPriceRange(!priceRange);
                                        }}
                                    >
                                        Price Range{" "}
                                        <i className="nc-icon nc-minimal-down" />
                                    </a>
                                </h5>
                            </CardHeader>
                            <Collapse isOpen={priceRange}>
                                <CardBody>
                                    <div
                                        className="slider slider-info"
                                        id="sliderDouble"
                                    />
                                </CardBody>
                            </Collapse>
                            <CardHeader
                                className="card-collapse"
                                id="clothingGear"
                                role="tab"
                            >
                                <h5 className="mb-0 panel-title">
                                    <a
                                        aria-expanded={clothing}
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setClothing(!clothing);
                                        }}
                                    >
                                        Clothing{" "}
                                        <i className="nc-icon nc-minimal-down" />
                                    </a>
                                </h5>
                            </CardHeader>
                            <Collapse isOpen={clothing}>
                                <CardBody>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultChecked
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Blazers{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Casual Shirts{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Formal Shirts{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Jeans{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Polos{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Pyjamas{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Shorts{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Trousers{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                </CardBody>
                            </Collapse>
                            <CardHeader
                                className="card-collapse"
                                id="designer"
                                role="tab"
                            >
                                <h5 className="mb-0 panel-title">
                                    <a
                                        aria-expanded={designer}
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDesigner(!designer);
                                        }}
                                    >
                                        Designer{" "}
                                        <i className="nc-icon nc-minimal-down" />
                                    </a>
                                </h5>
                            </CardHeader>
                            <Collapse isOpen={designer}>
                                <CardBody>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultChecked
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            All{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Acne Studio{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Alex Mill{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Alexander McQueen{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Alfred Dunhill{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            AMI{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Berena{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Berluti{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Burberry Prorsum{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Berluti{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Calvin Klein{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Club Monaco{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Dolce &amp; Gabbana{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Gucci{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Kolor{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Lanvin{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Loro Piana{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Massimo Alba{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                </CardBody>
                            </Collapse>
                            <CardHeader
                                className="card-collapse"
                                id="color"
                                role="tab"
                            >
                                <h5 className="mb-0 panel-title">
                                    <a
                                        aria-expanded={color}
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setColor(!color);
                                        }}
                                    >
                                        Colour{" "}
                                        <i className="nc-icon nc-minimal-down" />
                                    </a>
                                </h5>
                            </CardHeader>
                            <Collapse isOpen={color}>
                                <CardBody>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultChecked
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            All{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Blue{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Brown{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Gray{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Green{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Neutrals{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                defaultValue=""
                                                type="checkbox"
                                            />
                                            Purple{" "}
                                            <span className="form-check-sign" />
                                        </Label>
                                    </FormGroup>
                                </CardBody>
                            </Collapse>
                        </div>
                    </Card>
                    {/* end card */}
                </Col>
                <ProductList />
            </Row>
        </Page>
    );
}

export default Catalog;
