const Router = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const categoryController = require("../controllers/categoryController");
const { check } = require("express-validator");
const upload = require("../middleware/upload");
const router = new Router();
const categoryValidations = [check("name", "Укажите название").notEmpty()];
const uploadMiddleWare = upload.single("image");
router.post(
    "/",
    roleMiddleware(["admin"]),
    uploadMiddleWare,
    categoryValidations,
    categoryController.create
);
router.patch(
    "/:id",
    roleMiddleware(["admin"]),
    uploadMiddleWare,
    categoryValidations,
    categoryController.update
);
router.get("/", categoryController.getAll);
// router.get("/:id", categoryController.getOne);
router.delete("/:id", roleMiddleware(["admin"]), categoryController.delete);
module.exports = router;
