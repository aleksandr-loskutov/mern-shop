import React from "react";
import { Button, Col } from "reactstrap";

function ShowMoreButton({ onShowMore }) {
    return (
        <Col className="offset-md-4 mb-4" md="4">
            <Button
                className="btn-round"
                color="default"
                data-rotation-color="gray"
                id="successBtn"
                outline
                onClick={() => onShowMore()}
            >
                Загрузить еще..
            </Button>
        </Col>
    );
}

export default ShowMoreButton;
