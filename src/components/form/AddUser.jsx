import React from "react";
import * as yup from "yup";
import { Button, Card, Col, Container, Row } from "reactstrap";
import FormComponent from "./index";
import TextField from "./fields/textField";
import PageAdmin from "../pageAdmin";
import { Link, useHistory } from "react-router-dom";

const AddUser = () => {
    const history = useHistory();
    const handleSubmit = (data) => {
        console.log("data", data);
        console.log("success");
    };
    const validateSchema = yup.object().shape({
        password: yup
            .string()
            .required("пароль обязателен")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать как минимум 1 заглавную букву"
            )
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать как минимум 1 число"
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать как минимум 1 спецсимвол из @#$%^&*"
            )
            .matches(/(?=.{8,})/, "Пароль должен быть минимум 8 символов"),
        email: yup
            .string()
            .required("Email обязателен")
            .email("Email введен не корректно")
    });
    return (
        <PageAdmin title="Добавить нового пользователя">
            <Row className="justify-content-sm-between">
                <Button onClick={() => history.goBack()}>Назад</Button>
            </Row>
            <Row>
                <Col className="ml-auto mr-auto" lg="4" md="7" sm="7">
                    <Card className="card-register">
                        <FormComponent
                            onSubmit={handleSubmit}
                            validatorConfig={validateSchema}
                            className="register-form"
                        >
                            <TextField
                                label="Электронная почта"
                                name="email"
                                autoFocus
                            />
                            <TextField
                                label="Пароль"
                                name="password"
                                type="password"
                            />
                            <TextField label="Номер телефона" name="phone" />
                            <TextField label="Почтовый индекс" name="zip" />
                            <TextField label="Город" name="city" />
                            <TextField label="Адрес" name="address" />

                            <Button
                                block
                                type="submit"
                                className="btn-round btn-primary btn-lg mx-auto"
                                color="danger"
                            >
                                Добавить
                            </Button>
                        </FormComponent>
                    </Card>
                </Col>
            </Row>
        </PageAdmin>
    );
};

export default AddUser;
