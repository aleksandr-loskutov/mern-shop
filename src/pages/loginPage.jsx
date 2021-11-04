import React from "react";
import Section from "../components/section";
import LoginForm from "../components/form/loginForm";
import WhiteNavbar from "../components/WhiteNavbar";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/form/registerForm";

function LoginPage() {
    const { register } = useParams();
    return (
        <>
            <WhiteNavbar />
            <Section>{register ? <RegisterForm /> : <LoginForm />}</Section>
            <Footer />
        </>
    );
}

export default LoginPage;
