import React from "react";
import { Col, Row } from "reactstrap";

function StoreServices({ className }) {
    return (
        <Row className={className}>
            <Col md="4" sm="4">
                <div className="info">
                    <div className="icon icon-warning">
                        <i className="nc-icon nc-delivery-fast" />
                    </div>
                    <div className="description">
                        <h4 className="info-title">Доставка за 2 дня</h4>
                        <p>
                            Мы с удовольствием доставим ваш товар прямо к вашему
                            подъезду совершенно бесплатно! Ведь мы неплохо
                            заработаем, поднимая его на ваш этаж.
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
                        <h4 className="info-title">Гарантия</h4>
                        <p>
                            Если из-за возгорания купленного у нас товара у вас
                            сгорит дом — не переживайте, мы выдадим вам новый.
                            Товар, не дом, конечно же.
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
                        <h4 className="info-title">Кредит</h4>
                        <p>
                            Залезть в долговую яму стало проще! Кредитные
                            консультанты подберут для вас наиболее выгодные
                            условия кредита. Выгодные для банка, разумеется.
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default StoreServices;
