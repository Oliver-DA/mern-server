const express = require("express");
const router = express.Router();
const { createTask, getProjectTasks, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require("../middleware/auth");
const { check } = require("express-validator");


router.post("/",
    auth,
    [
        check('name', "Task name is required").not().isEmpty()
    ],
    createTask
)

router.get("/",
    auth,
    getProjectTasks
)

router.put("/:id",
    auth,
    updateTask
)

router.delete("/:id",
    auth,
    deleteTask
)



module.exports = router