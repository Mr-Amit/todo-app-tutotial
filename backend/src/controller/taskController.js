const taskModel = require("../model/taskModel");

const createTask = async (req, res) => {
  try {
    let { title, description, userId } = req.body;
    if (!title || !description || !userId) { 
      return res.status(400).send({ status: false, msg: "required field missing" });
    }
    const uploadData = await taskModel.create(req.body);
    return res.status(201).send({ status: true, data: uploadData });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllTaskByUserId = async (req, res) => {
  try {
    let userId = req.params.userId;
    const task = await taskModel.find({userId});
    return res.status(200).send({ status: true, msg: "successful", data: task });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateTask= async (req, res) => {
  try {
    let taskId = req.params.id
    let { status } = req.body
    const task = await taskModel.findOneAndUpdate(
      { _id: taskId },
      { status },
      { new: true }
    );
    if(task){
      return res.status(200).send({ status: true, msg: "successful", data: task });
    } 
    return res.status(400).send({ status: false, msg: "user not exist" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    let taskId = req.params.id
    const task = await taskModel.findOneAndDelete({ _id: taskId });
    if(task){
      return res.status(200).send({ status: true, msg: "successful", data: task });
    } 
    return res.status(400).send({ status: false, msg: "user not exist" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { createTask, getAllTaskByUserId, updateTask, deleteTask };