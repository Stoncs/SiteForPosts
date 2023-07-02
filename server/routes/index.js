const Router = require("express");
const router = new Router();
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");
const userRouter = require("./userRouter");

router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/users", userRouter);

module.exports = router;
