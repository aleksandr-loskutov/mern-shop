import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import FormComponent, { TextField, SelectField } from "../index";
import { Button, Card, CardTitle, Col, Container, Row } from "reactstrap";

const _editUserPage = () => {
    const userId = "67rdca3eeb7f6fgeed471818";
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: ""
    });
    const [professions, setProfession] = useState([]);
    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };

    const handleSubmit = (data) => {
        console.log("data", data);
        const { profession } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession)
            })
            .then((data) => history.push(`/users/${data._id}`));
        console.log("success");
    };
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    return (
        <Container>
            <Row>
                <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                    <Card className="card-register">
                        <CardTitle tag="h3">Welcome</CardTitle>
                        {!isLoading && Object.keys(professions).length > 0 ? (
                            <FormComponent
                                onSubmit={handleSubmit}
                                validatorConfig={validatorConfig}
                                defaultData={data}
                                className="register-form"
                            >
                                <TextField label="Имя" name="name" autoFocus />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professions}
                                    name="profession"
                                />

                                <Button
                                    block
                                    type="submit"
                                    className="btn-round btn-primary btn-lg mx-auto"
                                    color="danger"
                                >
                                    Обновить
                                </Button>
                            </FormComponent>
                        ) : (
                            "Loading..."
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default _editUserPage;
