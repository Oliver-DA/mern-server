const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Project", ProjectSchema)