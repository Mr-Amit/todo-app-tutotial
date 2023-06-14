const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const taskController = require('../controller/taskController')
const authenticator = require('../authentication/auth')

router.post("/user", userController.registerUser)
router.post("/user/login", userController.userLogin)
router.get("/user", userController.getUser)
router.post("/task", taskController.createTask)
router.get("/task/:userId", taskController.getAllTaskByUserId);
router.put("/task/:id", authenticator.authenticator, taskController.updateTask)
router.delete("/task/:id", authenticator.authenticator, taskController.deleteTask)

module.exports = router;