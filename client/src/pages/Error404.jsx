import React from "react";
import Page from "../components/page";
import { Button, Col, Row } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

function Error404(props) {
    const history = useHistory();

    return (
        <Page title="Oops..404 такой страницы нет">
            <Row className="text-center ">
                <Col>
                    <Button onClick={() => history.goBack()}>Назад</Button>
                </Col>
                <Col>
                    <Button to="/" tag={Link}>
                        На главную
                    </Button>
                </Col>
            </Row>
        </Page>
    );
}

export default Error404;
