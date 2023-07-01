const Router = require("express");
const commentController = require("../controllers/commentController");
const router = new Router();

router.get("/:postId", commentController.getAllForPost);
router.post("/:postId", commentController.create);

module.exports = router;
