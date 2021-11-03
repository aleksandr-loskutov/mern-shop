import React from "react";
import { Button, Card, CardTitle, Col, Container, Row } from "reactstrap";
import FormComponent, { TextField } from "../components/form/index";
import { Link } from "react-router-dom";
import * as yup from "yup";
const RegisterForm = () => {
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
            .email("Email введен не корректно"),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
    });
    return (
        <Container>
            <Row>
                <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                    <Card className="card-register">
                        <CardTitle tag="h3">Регистрация</CardTitle>
                        <FormComponent
                            onSubmit={handleSubmit}
                            validatorConfig={validateSchema}
                            className="register-form"
                            defaultData={{
                                email: "",
                                password: ""
                            }}
                        >
                            <TextField
                                label="Электронная почта"
                                name="email"
                                autoFocus
                            />
                            <TextField label="Пароль" name="password" />
                            <TextField
                                label="Повторите пароль"
                                name="passwordConfirmation"
                            />
                            <Button
                                block
                                type="submit"
                                className="btn-round btn-primary btn-lg mx-auto"
                                color="danger"
                            >
                                Регистрация
                            </Button>
                        </FormComponent>
                        <div className="login m-2">
                            <p>
                                Уже есть аккаунт?{" "}
                                <Link to="/login/">Войдите</Link>.
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;
