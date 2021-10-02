const Router = require("express");
const cartController = require("../controllers/cartController");
const router = new Router();
router.get("/:id", cartController.get);
router.patch("/:id", cartController.update);
module.exports = router;
