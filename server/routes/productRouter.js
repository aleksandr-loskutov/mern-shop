const Router = require("express");
const productController = require("../controllers/productController");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = new Router();
router.post("/", roleMiddleware(["admin"]), productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.get("/cat/:id", productController.getByCategory);

module.exports = router;
