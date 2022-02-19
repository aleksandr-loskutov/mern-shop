import * as yup from "yup";

export function getProductValidationSchema() {
    return yup.object().shape({
        article: yup.string().required("Укажите артикул"),
        discount: yup
            .string()
            .matches(/^(\s*|[0-9][0-9]?)$/, "Укажите от 0 до 99"),
        price: yup
            .string()
            .required("Укажите цену")
            .matches(/^\d+$/, "Укажите корректную цену"),
        stock: yup
            .string()
            .required("Укажите наличие")
            .matches(/^\d+$/, "Укажите число"),
        categoryId: yup.string().required("Укажите категорию"),
        name: yup.string().required("Укажите название")
    });
}
