import * as yup from "yup";

export function getUserValidationSchema() {
    return yup.object().shape({
        name: yup.string().required("Укажите имя"),
        lastName: yup.string().required("Укажите фамилию"),
        phone: yup.string().required("Укажите телефон"),
        city: yup.string().required("Укажите город"),
        address: yup.string().required("Укажите адрес")
    });
}
