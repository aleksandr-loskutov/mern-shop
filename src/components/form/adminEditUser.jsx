import React from "react";
import { Button, Card, CardTitle, Col, Container, Row } from "reactstrap";
import * as yup from "yup";
import FormComponent from "./index";
import TextField from "./fields/textField";
import { Link, useHistory } from "react-router-dom";

const AdminEditUser = ({ user }) => {
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
        <>
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
                            defaultData={{ ...user }}
                        >
                            <TextField
                                label="Электронная почта"
                                name="email"
                                autoFocus
                            />
                            {/*<TextField*/}
                            {/*    label="Пароль"*/}
                            {/*    name="password"*/}
                            {/*    type="password"*/}
                            {/*/>*/}
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
                                Обновить
                            </Button>
                        </FormComponent>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AdminEditUser;
