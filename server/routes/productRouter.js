const Router = require("express");
const productController = require("../controllers/productController");
const roleMiddleware = require("../middleware/roleMiddleware");
const { check } = require("express-validator");
const upload = require("../middleware/upload");
const router = new Router();
const productValidations = [
    check("name", "Укажите название").notEmpty(),
    check("categoryId", "Укажите категорию").notEmpty(),
    check("stock", "Укажите наличие").notEmpty(),
    check("price", "Укажите цену").notEmpty(),
    check("article", "Укажите артикул").notEmpty()
];
router.post(
    "/",
    roleMiddleware(["admin"]),
    upload.single("image"),
    productValidations,
    productController.create
);
router.patch(
    "/:id",
    roleMiddleware(["admin"]),
    upload.single("image"),
    productValidations,
    productController.update
);
router.delete("/:id", roleMiddleware(["admin"]), productController.delete);
router.get("/", productController.getAll);

module.exports = router;
// router.get("/:id", productController.getOne);
// router.get("/cat/:categoryId", productController.getByCategory);
// check(
//     "name",
//     "Наименование товара должно быть от 4 до 50 символов"
// ).isLength({
//     min: 4,
//     max: 50
// }),
