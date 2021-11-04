import React from "react";
import { Button, Card, CardTitle, Col, Container, Row } from "reactstrap";
import FormComponent, { TextField } from "./index";
import { Link } from "react-router-dom";
import * as yup from "yup";
const LoginForm = () => {
    const handleSubmit = (data) => {
        console.log("data", data);
        console.log("success");
    };
    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен некорректно"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Пароль обязателен для заполнения"
    //         },
    //         isCapitalSymbol: {
    //             message: "Пароль должен содержать хотя бы одну заглавную букву"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать хотя бы одно число"
    //         },
    //         min: {
    //             message: "Пароль должен состаять миниму из 8 символов",
    //             value: 8
    //         }
    //     }
    // };
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
        <Container>
            <Row>
                <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                    <Card className="card-register">
                        <CardTitle tag="h3">Войти</CardTitle>
                        <FormComponent
                            onSubmit={handleSubmit}
                            validatorConfig={validateSchema}
                            className="register-form"
                            // defaultData={{
                            //     email: "",
                            //     password: ""
                            // }}
                        >
                            <TextField
                                label="Электронная почта"
                                name="email"
                                autoFocus
                            />
                            <TextField label="Пароль" name="password" />
                            <Button
                                block
                                type="submit"
                                className="btn-round btn-primary btn-lg mx-auto"
                                color="danger"
                            >
                                Вход
                            </Button>
                        </FormComponent>
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
