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
const uploadMiddleware = upload.single("image");
router.post(
    "/",
    roleMiddleware(["admin"]),
    uploadMiddleware,
    productValidations,
    productController.create
);
router.patch(
    "/:id",
    roleMiddleware(["admin"]),
    uploadMiddleware,
    productValidations,
    productController.update
);
router.delete("/:id", roleMiddleware(["admin"]), productController.delete);
router.get("/", productController.getAll);

module.exports = router;
