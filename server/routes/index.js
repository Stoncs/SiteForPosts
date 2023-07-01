const Router = require("express");
const router = new Router();
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");

router.use("/posts", postRouter);
router.use("/comments", commentRouter);

module.exports = router;
