const Router = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const categoryController = require("../controllers/categoryController");
const { check } = require("express-validator");
const router = new Router();
router.post(
    "/",
    roleMiddleware(["admin"]),
    check(
        "name",
        "Наименование категории должно быть от 4 до 50 символов"
    ).isLength({
        min: 4,
        max: 50
    }),
    categoryController.create
);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);
module.exports = router;
