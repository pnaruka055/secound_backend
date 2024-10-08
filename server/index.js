const express = require("express");
const mongoose = require("mongoose");
const App = express();
const port = 8000;
const cors = require('cors')

async function dataBase() {
  try {
    await mongoose.connect("mongodb+srv://pnaruka055:Premsing@cluster0.fny0e.mongodb.net/kumkum");
    console.log("dataBase connected Successfully");
  } catch (error) {
    console.log(error);
  }
}
dataBase();

const Schema = {
  Name: { type: String },
  Age: { type: Number },
};
const Model = mongoose.model("kum1", Schema);

App.use(cors())
App.use(express.json()); // globle level middleware

App.get("/get", async (req, res) => {
  try {
    let Age = req.query.Age; ///get?Age=20

    // let data = await Model.findById("66f7d3adc230ecba597c62bf");
    let data = await Model.findOne({ Age: Age });
    res.json({
      success: true,
      msg: data,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
});

App.post("/post", async (req, res) => {
  try {
    let data = await Model(req.body);
    let data2 = await data.save();
    res.json({
      success: true,
      msg: data2,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
});

App.put("/put", async (req, res) => {
  try {
    let data = await Model.findOneAndReplace({ Age: req.query.Age }, req.body, {
      new: true,
    });
    res.json({
      success: true,
      msg: data,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
});

App.patch("/patch", async(req, res) => {
  try {
    let data = await Model.findOneAndUpdate({ Age: req.query.Age }, req.body, {
      new: true,
    });
    res.json({
      success: true,
      msg: data,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
});

App.delete("/delete", async (req, res) => {
  try {
    let Age = req.query.Age; ///get?Age=20
    // let data = await Model.findById("66f7d3adc230ecba597c62bf");
    let data = await Model.deleteOne({ Age: Age });
    res.json({
      success: true,
      msg: data,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
});

App.listen(port, () => {
  console.log(`server started on port ${port}`);
});
