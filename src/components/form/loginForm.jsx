import React from "react";
import { Button, Card, CardTitle, Col, Container, Row } from "reactstrap";
import FormComponent, { TextField } from "./index";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = () => {
    const loginError = useSelector(getAuthErrors());
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        console.log("login data", data);
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/catalog";
        dispatch(login({ payload: data, redirect }));
    };
    const validateSchema = yup.object().shape({
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
                        <CardTitle tag="h3">Войти</CardTitle>
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
                            <Button
                                block
                                type="submit"
                                className="btn-round btn-primary btn-lg mx-auto"
                                color="danger"
                            >
                                Вход
                            </Button>
                        </FormComponent>
                        {loginError && (
                            <p className="text-danger  mt-2">{loginError}</p>
                        )}
                        <div className="login m-2">
                            <p>
                                Нет аккаунта?{" "}
                                <Link to="/login/register">
                                    Зарегистрируйтесь
                                </Link>
                                .
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
