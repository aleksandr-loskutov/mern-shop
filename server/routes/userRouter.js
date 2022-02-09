const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

router.get("/", roleMiddleware(["admin"]), userController.getAll);
router.get("/:userId", authMiddleware, userController.getByUserId);
router.patch("/:userId", authMiddleware, userController.update);

module.exports = router;
