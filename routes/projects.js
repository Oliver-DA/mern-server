const express = require("express");
const router = express.Router();
const { createProject, getProjects, updateProject, deleteProject } = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator")

router.post("/",
    auth,
    [
        check("projectName", "Project name is required").not().isEmpty()
    ],
    createProject
);

router.get("/",
    auth,
    getProjects
);

router.put("/:id",
    auth,
    [
        check("name", "Project name is required").not().isEmpty()
    ],
    updateProject
)

router.delete("/:id",
    auth,
    deleteProject
)

module.exports = router;