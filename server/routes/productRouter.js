const Router = require("express");
const productController = require("../controllers/productController");
const roleMiddleware = require("../middleware/roleMiddleware");
const { check } = require("express-validator");
const router = new Router();
router.post(
    "/",
    [
        roleMiddleware(["admin"]),
        check(
            "name",
            "Наименование товара должно быть от 4 до 50 символов"
        ).isLength({
            min: 4,
            max: 50
        }),
        check("price", "Цена не указана").isNumeric()
    ],
    productController.create
);
router.patch("/:id", roleMiddleware(["admin"]), productController.update);
router.delete("/:id", roleMiddleware(["admin"]), productController.delete);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.get("/cat/:categoryId", productController.getByCategory);

module.exports = router;
