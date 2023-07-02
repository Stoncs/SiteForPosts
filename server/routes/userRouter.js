const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);

module.exports = router;
