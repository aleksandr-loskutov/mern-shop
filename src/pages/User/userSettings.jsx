import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Form, Row, Col } from "reactstrap";

// core components
import Page from "../../components/page";
import { useDispatch, useSelector } from "react-redux";
import {
    getAuthErrors,
    getCurrentUserData,
    getUsersLoadingStatus,
    updateUserData
} from "../../store/users";
import TextField from "../../components/form/fields/textField";
import { getUserValidationSchema } from "../../utils/getUserValidationSchema";
import SelectField from "../../components/form/fields/selectField";
import { CITY_LIST } from "../../utils/consts";
import _ from "lodash";

function UserSettings({ specifiedUser }) {
    let currentUser = useSelector(getCurrentUserData());
    const user = specifiedUser || currentUser;
    console.log("user", user._id);
    const [data, setData] = useState({ ...prepareData(user) });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const isLoaded = !useSelector(getUsersLoadingStatus());
    const validateSchema = getUserValidationSchema();
    const userUpdateError = useSelector(getAuthErrors());
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("settings-page");
        // window.scrollTo(0, 0);
        // document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("settings-page");
        };
    });
    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return isValid();
    };
    const isValid = () => {
        return (
            isLoaded &&
            Object.keys(data).length > 0 &&
            Object.keys(errors).length === 0 &&
            Object.values(data).join("").length > 0
        );
    };
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate();
        }
        // eslint-disable-next-line
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUserData(user._id, data));
    };
    const body = (
        <Row>
            <Col className="ml-auto mr-auto" md="6">
                <Form className="settings-form" onSubmit={handleSubmit}>
                    <Row>
                        <Col md="6">
                            <TextField
                                label="Имя"
                                name="name"
                                required={true}
                                onChange={handleChange}
                                autoFocus
                                value={data.name}
                                error={errors.name}
                            />
                        </Col>
                        <Col md="6">
                            <TextField
                                label="Фамилия"
                                name="lastName"
                                required={true}
                                onChange={handleChange}
                                value={data.lastName}
                                error={errors.lastName}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <div className="js-form-message">
                                <TextField
                                    label="Телефон"
                                    name="phone"
                                    required={true}
                                    onChange={handleChange}
                                    value={data.phone}
                                    error={errors.phone}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-4">
                                <SelectField
                                    label="Город"
                                    defaultOption="Выберите..."
                                    name="city"
                                    options={CITY_LIST}
                                    defaultValue={data.city}
                                    onChange={handleChange}
                                    error={errors.city}
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="8">
                            <div className="js-form-message">
                                <TextField
                                    label="Адрес доставки"
                                    name="address"
                                    required={true}
                                    onChange={handleChange}
                                    value={data.address}
                                    error={errors.address}
                                />
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="js-form-message">
                                <TextField
                                    label="Почтовый индекс"
                                    name="postCode"
                                    required={false}
                                    onChange={handleChange}
                                    value={data.postCode}
                                    error={errors.postCode}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <TextField
                                label="Email"
                                name="email"
                                required={true}
                                onChange={handleChange}
                                value={data.email}
                                error={errors.email}
                            />
                        </Col>
                        <Col md="6">
                            <TextField
                                label="Новый пароль"
                                name="password"
                                type="password"
                                required={false}
                                onChange={handleChange}
                                value={data.password}
                                error={errors.password}
                            />
                        </Col>
                    </Row>
                    {userUpdateError && (
                        <Row>
                            <span className="text-danger mt-2 ml-auto mr-5 font-weight-bold">
                                {userUpdateError}
                            </span>
                        </Row>
                    )}
                    <Row className="justify-content-center">
                        <Button
                            type="submit"
                            className="btn-round btn-lg  mt-3"
                            color="danger"
                            disabled={!isValid()}
                        >
                            Сохранить
                        </Button>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
    return !specifiedUser ? <Page title="Мои данные">{body}</Page> : body;
}
function prepareData(user) {
    const userShaped = _.omit(user, [
        "updatedAt",
        "createdAt",
        "__v",
        "_id",
        "role"
    ]);
    return {
        ...userShaped,
        password: ""
    };
}
export default UserSettings;
