import * as yup from "yup";

export function getCategoryValidationSchema() {
    return yup.object().shape({
        name: yup.string().required("Укажите название категории")
    });
}
