import * as yup from "yup";
import { CITY_LIST } from "./consts";

export function getUserValidationSchema() {
    return yup.object().shape({
        email: yup
            .string()
            .required("Email обязателен")
            .email("Email введен не корректно"),
        address: yup.string().required("Укажите адрес"),
        city: yup.string().oneOf(
            [
                ...CITY_LIST.reduce((acc, cityObj) => {
                    acc.push(cityObj.value);
                    return acc;
                }, []),
                null
            ],
            "Выберите город"
        ),
        phone: yup
            .string()
            .required("Укажите телефон")
            .matches(/^\+?7(\d{10})$/, "Укажите корректный номер через +7"),
        lastName: yup.string().required("Укажите фамилию"),
        name: yup.string().required("Укажите имя")
    });
}
