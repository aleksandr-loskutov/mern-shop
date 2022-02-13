import React, { useEffect } from "react";
import { Button, Card, CardTitle, Col, Container, Row } from "reactstrap";
import FormComponent, { TextField } from "./index";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../store/users";
const RegisterForm = () => {
    const loginError = useSelector(getAuthErrors());
    const dispatch = useDispatch();
    const handleSubmit = (data) => {
        dispatch(signUp(data));
    };

    const validateSchema = yup.object().shape({
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
        password: yup
            .string()
            .required("пароль обязателен")
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать как минимум 1 число"
            )
            .matches(/(?=.{5,})/, "Пароль должен быть минимум 5 символов"),
        email: yup
            .string()
            .required("Email обязателен")
            .email("Email введен не корректно")
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
                                password: "",
                                passwordConfirmation: ""
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
                        {loginError && (
                            <p className="text-danger  mt-2">{loginError}</p>
                        )}
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
