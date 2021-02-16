const Project = require("../models/Project");
const { validationResult } = require("express-validator");
const { update } = require("../models/Project");

exports.createProject = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    try {
        const project = new Project(req.body);
        project.owner = req.user.id
        project.save();
        res.json(project)

    }catch(err) {
        console.log(err);
        res.status(500).send("There was an error")
    }
}

exports.getProjects = async (req, res) => {


    try {
        const projects = await Project.find({ owner: req.user.id })
        res.json(projects)
    } catch(err) {
        console.log(err)
        res.status(500).send("There was an error")
    }
}

exports.updateProject = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name } = req.body;
    const updatedProject = {};

    if (name) {
        updatedProject.name = name
    }

    try {
        const {id} = req.params
        let project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ msg: "Project not found"})
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorisado"})
        }

        project = await Project.findOneAndUpdate({_id: id}, {$set: updatedProject}, { new: true});
        res.json({project})


    }catch(err) {
        console.log(err);
        res.status(500).send("There was an error with the server")
    }

}

exports.deleteProject = async (req, res) => {

    try {
        const {id} = req.params
        let project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ msg: "Project not found"})
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No autorisado"})
        }

        await Project.findOneAndRemove({_id: id});
        res.json({ msg: "Project deleted"})

    } catch(err) {
        console.log(err)
        res.status(500).send("There was an error with the server")
    }

}