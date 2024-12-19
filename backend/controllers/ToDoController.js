const ToDoModel = require('../models/ToDoModels');

module.exports.getToDo = async (req, res) => {
    try {
        const toDos = await ToDoModel.find();
        res.status(200).send(toDos);
    } catch (err) {
        console.error("Error fetching ToDos:", err);
        res.status(500).send("Error fetching ToDos.");
    }
};

module.exports.saveToDo = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newToDo = new ToDoModel({ title, description });
        const savedToDo = await newToDo.save();
        console.log("Added Successfully...");
        console.log(savedToDo);
        res.status(201).send(savedToDo);
    } catch (err) {
        console.error("Error saving ToDo:", err);
        res.status(500).send("Error saving ToDo.");
    }
};

module.exports.updateToDo = async (req, res) => {
    const { _id, title, description } = req.body;

    try {
        const updatedToDo = await ToDoModel.findByIdAndUpdate(_id, { title, description }, { new: true });
        if (updatedToDo) {
            res.status(200).send("Updated Successfully...");
        } else {
            res.status(404).send("ToDo not found.");
        }
    } catch (err) {
        console.error("Error updating ToDo:", err);
        res.status(500).send("Error updating ToDo.");
    }
};

module.exports.deleteToDo = async (req, res) => {
    const { _id } = req.body;

    try {
        const deletedToDo = await ToDoModel.findByIdAndDelete(_id);
        if (deletedToDo) {
            res.status(200).send("Deleted Successfully...");
        } else {
            res.status(404).send("ToDo not found.");
        }
    } catch (err) {
        console.error("Error deleting ToDo:", err);
        res.status(500).send("Error deleting ToDo.");
    }
};
