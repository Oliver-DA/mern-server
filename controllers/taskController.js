const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        console.log(req.body)
        const { projectId } = req.body;
        const projectConfirmation = await Project.findById(projectId);

        if (!projectConfirmation) {
            return res.status(404).json({ msg: "Project not found"})
        }

        
        if (projectConfirmation.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorisado"})
        }
        
        const task = new Task(req.body)

        await task.save();
        res.json({ task })

    } catch(err) {
        console.log(err);
        res.status(500).send("There was an error with the server")
    }

}

exports.getProjectTasks = async (req, res) => {

    try {
        const { projectId } = req.query;
        const projectConfirmation = await Project.findById(projectId);

        if (!projectConfirmation) {
            return res.status(404).json({ msg: "Project not found"})
        }

        
        if (projectConfirmation.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorisado"})
        }

        const tasks = await Task.find({ projectId });
        res.json({tasks})

    } catch(err) {
        console.log(err);
        res.status(500).send("There was an error with the server")
    }
}

exports.updateTask = async (req, res) => {
    
    try {
        const { projectId, name, state } = req.body;

        let task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ msg: "Task not found"})
        }

        const projectConfirmation = await Project.findById(projectId);
        if (projectConfirmation.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorisado"})
        }

        const updatedTask = {};

        updatedTask.name = name;
        updatedTask.state = state;

        task = await Task.findOneAndUpdate({_id: req.params.id}, updatedTask, {new: true})
        res.json({task})
    } catch(err) {
        console.log(err);
        res.status(500).send("There was an error with the server")
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { projectId } = req.query;

        let task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({ msg: "Task not found"})
        }

        const projectConfirmation = await Project.findById(projectId);
        if (projectConfirmation.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorisado"})
        }

        await Task.findOneAndRemove({ _id: req.params.id });
        res.status(200).json({ msg: "Task deleted"})


    } catch(err) {
        console.log(err);
        res.status(500).send("There was an error with the server")
    }
}