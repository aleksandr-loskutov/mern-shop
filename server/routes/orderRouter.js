const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, orderController.create);
router.get("/", roleMiddleware(["admin"]), orderController.getAll);
router.get("/user/:id", authMiddleware, orderController.getByUser);
router.get("/:id", authMiddleware, orderController.getOne);
module.exports = router;
