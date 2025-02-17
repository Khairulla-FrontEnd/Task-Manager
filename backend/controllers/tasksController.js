const Task = require('../model/Task');

const getAllTasks = async (req, res) => {
    let tasks;
    try {
        tasks = await Task.find();
    } catch (err) {
        console.error(err);
    }
    if (!tasks?.length) return res.status(204).json({ "message": "No tasks found." });
    res.json(tasks);
}
const createNewTask = async (req, res) => {
    const value = req.body?.task;
    if (!value) return res.status(400).json({ "message": "There's no content to post." });
    try {
        const result = await Task.create({
            task: value
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}
const updateTask = async (req, res) => {
    try {
        const id = req.body?.id;
        const value = req.body?.task;
        if (!id) return res.status(400).json({ "message": "Invalid or missing ID parameter." });
        if (!value || value.trim() === "") return res.status(400).json({ "message": "Please, provide a new task value." });
        const task = await Task.findByIdAndUpdate(id,
            {
                task: value
            },
            {
                new:true,
                runValidators:true
            });
        if (!task) return res.status(404).json({ "message": `No task matches ID ${id}.` });
        res.json(task);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}
const deleteTask = async (req, res) => {
    try{
        const id = req.body?.id;
        if(!id) return res.status(400).json({ "message": "Invalid or missing ID parameter." });
        const task = await Task.findByIdAndDelete(id, {
            new:true,
            runValidators:true
        });
        if(!task) return res.status(404).json({ "message": `No task matches ID ${id}.` });
        res.json(task);
    }catch(err){
        console.error(err);
        return res.sendStatus(500);
    }
}

const CRUD = [getAllTasks, createNewTask, updateTask, deleteTask];

module.exports = CRUD;