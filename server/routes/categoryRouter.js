const Router = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const categoryController = require("../controllers/categoryController");
const router = new Router();
router.post("/", roleMiddleware(["admin"]), categoryController.create);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
module.exports = router;
