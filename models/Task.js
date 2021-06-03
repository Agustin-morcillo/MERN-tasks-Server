const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("Task", TaskSchema)


