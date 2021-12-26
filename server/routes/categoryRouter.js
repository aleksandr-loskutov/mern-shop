const Router = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const categoryController = require("../controllers/categoryController");
const { check } = require("express-validator");
const upload = require("../middleware/upload");
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
    upload.single("image"),
    categoryController.create
);
router.patch(
    "/:id",
    roleMiddleware(["admin"]),
    upload.single("image"),
    categoryController.update
);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.delete("/:id", roleMiddleware(["admin"]), categoryController.delete);
module.exports = router;
