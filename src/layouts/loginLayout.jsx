import React from "react";
import Page from "../components/page";
import LoginForm from "../components/form/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/form/registerForm";

function LoginLayout() {
    const { register } = useParams();
    return (
        <>
            <Page
                title={
                    register ? "Зарегистрироваться" : "Войти в личный кабинет"
                }
            >
                {register ? <RegisterForm /> : <LoginForm />}
            </Page>
        </>
    );
}

export default LoginLayout;
