const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

//schema

const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

mongoose
  .connect("mongodb://127.0.0.1:27017/crudoperation")
  .then(() => {
    console.log("connect to db");
    app.listen(port, () => {
      console.log("server running ");
    });
  })
  .catch((err) => console.log(err));

//////////////
//
//
//
//
//

app.get("/users", async (req, res) => {
  const data = await userModel.find({});
  res.send({success : true , data : data});
});

//
//
////
//
//
//
//Create data in mongodb
app.post("/create-user", async (req, res) => {
  console.log(req.body);

  const data = await new userModel(req.body).save();

  res.send({
    success: true,
    message: "data saved successfully",
    data: data,
  });
});

//
//
//
//
//
//
// Update data === put method

app.put("/update-user", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await userModel.updateOne( {_id: _id}, rest);
  res.send({ message: "data updated successfully", data: data });

  //   const data = await new userModel(req.body).save();

  //   res.send({
  //     success: true,
  //     message: "data saved successfully",
  //   });
});

//
//
//
//
//delete data
app.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({_id: id})
  res.send({ message: "data deleted successfully", data: data });
});
//
//

app.get("/", async (req, res) => {
  res.json({ message: "Hello sai" });
});
