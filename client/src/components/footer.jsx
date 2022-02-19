import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

function Footer(props) {
    return (
        <footer className="footer footer-black footer-big ">
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
                                    <Link to={"/contact"}>Главная</Link>
                                </li>
                                <li className="mr-1">
                                    <Link to={"/contact"}>О нас</Link>
                                </li>
                                <li className="mr-1">
                                    <Link to={"/contact"}>Лидеры продаж</Link>
                                </li>
                                <li className="mr-1">
                                    <Link to={"/contact"}>Команда</Link>
                                </li>
                                <li className="mr-1">
                                    <Link to={"/contact"}>Обратная связь</Link>
                                </li>
                                <li>
                                    <Link to={"/contact"}>Вакансии</Link>
                                </li>
                            </ul>
                            <hr />
                            <div className="copyright">
                                <div className="text-center">
                                    © {new Date().getFullYear()}, made with{" "}
                                    <i className="fa fa-heart heart" /> by
                                    Aleksandr.L for VM.School
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
