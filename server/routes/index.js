const express = require("express");
const router = express.Router({ mergeParams: true });
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const orderRouter = require("./orderRouter");
const cartRouter = require("./cartRouter");

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);
module.exports = router;
