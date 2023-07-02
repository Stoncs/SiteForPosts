const Router = require("express");
const postController = require("../controllers/postController");
const router = new Router();

router.get("/", postController.getAll);
router.get("/:userId", postController.getByUser);
router.get("/:id", postController.getById);

module.exports = router;
