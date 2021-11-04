import React from "react";
import { Col, Container, Row } from "reactstrap";

function Footer(props) {
    return (
        <footer className="footer footer-black footer-big">
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="4" sm="4">
                        <div className="logo text-center">
                            <h3>HOLODOS.COM</h3>
                        </div>
                    </Col>
                    <Col className="offset-md-2" md="6" sm="8">
                        <div className="links">
                            <ul>
                                <li className="mr-1">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className="mr-1">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Company
                                    </a>
                                </li>
                                <li className="mr-1">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Portfolio
                                    </a>
                                </li>
                                <li className="mr-1">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Team
                                    </a>
                                </li>
                                <li className="mr-1">
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        We're Hiring!
                                    </a>
                                </li>
                            </ul>
                            <hr />
                            <div className="copyright">
                                <div className="pull-left">
                                    © {new Date().getFullYear()}, made with{" "}
                                    <i className="fa fa-heart heart" /> by
                                    Aleksandr.L for VM.School
                                </div>
                                <div className="pull-right">
                                    <ul>
                                        <li className="mr-1">
                                            <a
                                                href="#pablo"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Terms
                                            </a>
                                        </li>
                                        |{" "}
                                        <li>
                                            <a
                                                href="#pablo"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Privacy
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
