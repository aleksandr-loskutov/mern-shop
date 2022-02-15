import React from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import PageAdmin from "../../components/pageAdmin";

function AddCategory(props) {
    const history = useHistory();
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("add-product");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("add-product");
        };
    });
    return (
        <PageAdmin title="Добавить категорию">
            <Row className="justify-content-sm-between">
                <Button onClick={() => history.goBack()}>Назад</Button>

                <FormGroup check className="text-right">
                    <Label check>
                        <Input defaultValue="" type="checkbox" />
                        Статус (вкл/выкл) <span className="form-check-sign" />
                    </Label>
                </FormGroup>
            </Row>
            <Row>
                <Col md="5" sm="5">
                    <h6>Cat Image</h6>
                    <ImageUpload />
                </Col>
                <Col md="7" sm="7">
                    <FormGroup>
                        <h6>
                            Name <span className="icon-danger">*</span>
                        </h6>
                        <Input
                            className="border-input"
                            placeholder="enter the product name here..."
                            type="text"
                        />
                    </FormGroup>

                    <FormGroup>
                        <h6>
                            Alias <span className="icon-danger">*</span>
                        </h6>
                        <Input
                            className="border-input"
                            placeholder="enter the product tagline here..."
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <h6>Description</h6>
                        <Input
                            className="textarea-limited"
                            maxLength="150"
                            placeholder="This is a textarea limited to 150 characters."
                            rows="5"
                            type="textarea"
                        />
                        <h5>
                            <small>
                                <span
                                    className="pull-right"
                                    id="textarea-limited-message"
                                >
                                    150 characters left
                                </span>
                            </small>
                        </h5>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="buttons-row">
                <Col md="4" sm="4">
                    <Button
                        block
                        className="btn-round"
                        color="danger"
                        outline
                        type="reset"
                    >
                        Cancel
                    </Button>
                </Col>
                <Col md="4" sm="4">
                    <Button
                        block
                        className="btn-round"
                        color="primary"
                        outline
                        type="submit"
                    >
                        Save
                    </Button>
                </Col>
                <Col md="4" sm="4">
                    <Button
                        block
                        className="btn-round"
                        color="primary"
                        type="submit"
                    >
                        Save &amp; Publish
                    </Button>
                </Col>
            </Row>
        </PageAdmin>
    );
}

export default AddCategory;
