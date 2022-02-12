const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { check } = require("express-validator");
//authMiddleware
router.post(
    "/",
    authMiddleware,
    [
        check("deliveryMethod", "Выберите способ получения заказа").notEmpty(),
        check("postCode", "Укажите индекс").notEmpty(),
        check("address", "Укажите адрес").notEmpty(),
        check("city", "Выберите город").notEmpty(),
        check("phone", "Укажите телефон").notEmpty(),
        check("lastName", "Укажите фамилию").notEmpty(),
        check("name", "Укажите имя").notEmpty(),
        check("products", "Корзина пуста").isArray({ min: 1 })
    ],
    orderController.create
);
router.get("/", authMiddleware, orderController.get);
router.get("/user/:id", authMiddleware, orderController.getByUser);
router.get("/:id", authMiddleware, orderController.getOne);
module.exports = router;
