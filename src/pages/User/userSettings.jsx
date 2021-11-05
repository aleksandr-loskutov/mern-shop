import React from "react";
// reactstrap components
import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CustomInput
} from "reactstrap";

// core components
import Page from "../../components/page";

function UserSettings() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("settings-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("settings-page");
        };
    });
    return (
        <Page title="Мои данные">
            <Row>
                <Col className="ml-auto mr-auto" md="6">
                    <Form className="settings-form">
                        <Row>
                            <Col md="6" sm="6">
                                <FormGroup>
                                    <label>First Name</label>
                                    <Input
                                        className="border-input"
                                        placeholder="First Name"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6" sm="6">
                                <FormGroup>
                                    <label>Last Email</label>
                                    <Input
                                        className="border-input"
                                        placeholder="Last Name"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <label>Job Title</label>
                            <Input
                                className="border-input"
                                placeholder="Job Title"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Description</label>
                            <Input
                                placeholder="This is a textarea limited to 150 characters."
                                className="textarea-limited"
                                type="textarea"
                                maxLength="150"
                                rows="3"
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
                        <label>Notifications</label>
                        <ul className="notifications">
                            <li className="notification-item d-flex justify-content-between align-items-center">
                                Updates regarding platform changes{" "}
                                <CustomInput
                                    type="switch"
                                    defaultChecked
                                    id="exampleCustomSwitch-1"
                                    name="customSwitch-1"
                                    className="custom-switch-info"
                                />
                            </li>
                            <li className="notification-item d-flex justify-content-between align-items-center">
                                Updates regarding product changes{" "}
                                <CustomInput
                                    type="switch"
                                    defaultChecked
                                    id="exampleCustomSwitch-2"
                                    name="customSwitch-2"
                                    className="custom-switch-info"
                                />
                            </li>
                            <li className="notification-item d-flex justify-content-between align-items-center">
                                Weekly newsletter{" "}
                                <CustomInput
                                    type="switch"
                                    defaultChecked
                                    id="exampleCustomSwitch-3"
                                    name="customSwitch-3"
                                    className="custom-switch-info"
                                />
                            </li>
                        </ul>
                        <div className="text-center">
                            <Button
                                className="btn-wd btn-round"
                                color="info"
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Page>
    );
}

export default UserSettings;
