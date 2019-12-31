const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const JsonParser = bodyParser.json();

app.use(JsonParser);

const port = 4040;
// ------------------mongoose schema----------------------------------------------------------------

var Schema = mongoose.Schema({
  // myid: String,
  name: String,
  email: String,
  gender: String,
  age: String
});

// var inputSchema = new Schema({
//   name: String,
//   email: String,
//   gender: String,
//   age: String
// });

// Making Schema model =========>
const schemaModel = mongoose.model("dyntable", Schema);

// ------------------mongoose connect---------------------------------------------
mongoose.connect("mongodb://localhost:27017/dyntable", {
  useNewUrlParser: true
});

// ------------------Get-----------------------------------------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// -------------------post-----------------------------------------------------

app.post("/submit", (req, res) => {
  console.log("in post");

  console.log(JSON.stringify(req.body));

  const formInput = req.body.data1;

  console.log(formInput); //<-- prints inputs, every row as array items in a big array [finalArray]

  for (let index = 0; index < formInput.length; index++) {
    console.log(formInput[index]); //<-- works
    // console.log(formInput[index][index]);  <--works

    var itemsSave = new schemaModel({
      // myid: formInput[index][0],
      name: formInput[index][0],
      email: formInput[index][1],
      gender: formInput[index][2],
      age: formInput[index][3]
    });

    // schemaModel.find((err, anyName) => {
    // var flag = 0;
    // console.log(anyName); //<-- prints whole db
    // console.log(itemsSave.myid); //<--works
    // console.log(anyName[0].myid); //<--works
    // ------------------------------------------------------------
    // for (let i = 0; i < anyName.length; i++) {
    //   if (itemsSave.myid === anyName[i].myid) {
    //     var rownum = i + 1;
    //     flag++;
    //     console.log("username already exists");
    //     // res.send(JSON.stringify(rownum));
    //     res.send({ data: "duplicate" });
    //   }
    // }
    // if (flag == 0) {
    // console.log("no duplicate userID found");
    itemsSave.save((err, anyName) => {
      if (err) return console.error(err);
      console.log("in save");
      console.log(JSON.stringify(anyName));
    });

    // }
    // });
  }

  res.send({ data: "saved" });
});

// -----------------------------------------------------------------

// ------------------------------------------------------------
app.listen(port, () => {
  console.log(`server listening to port: ${port}`);
});

app.use(express.static(path.join(__dirname, "/")));
