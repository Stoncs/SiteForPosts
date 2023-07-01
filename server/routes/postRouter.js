const Router = require("express");
const postController = require("../controllers/postController");
const router = new Router();

router.get("/posts", postController.getAll);
router.get("/posts/:id", postController.getOne);

module.exports = router;
