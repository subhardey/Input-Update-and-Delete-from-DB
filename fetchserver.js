const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const JsonParser = bodyParser.json();

app.use(JsonParser);

const port = 4041;
// ------------------mongoose schema----------------------------------------------------------------

var Schema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  age: String
});

// Making Schema model =========>
const schemaModel = mongoose.model("dyntable", Schema);

// ------------------mongoose connect---------------------------------------------
mongoose.connect("mongodb://localhost:27017/dyntable", {
  useNewUrlParser: true
});

// ------------------Get-----------------------------------------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/fetchdata.html");
});

// -------------------post-----------------------------------------------------

app.post("/fetch", (req, res) => {
  console.log("in fetch post");
  console.log(JSON.stringify(req.body));
  const fetchsent = req.body.data2;
  console.log(fetchsent); //<-- prints 'something'

  schemaModel.find().then(parameter => {
    // console.log(parameter); //<-- prints eveythung in db
    console.log("=======================>");
    // console.log(parameter[1]);   //<-- prints 1st json of the database
    res.send(parameter);
  });
});

app.post("/update", (req, res) => {
  console.log("in update post");
  console.log(JSON.stringify(req.body));
  const updatesent = req.body.dataUp;
  console.log(updatesent);
  // const id = req.params.id;
  // console.log(id);  //<-- undefined

  var id = updatesent[0];

  const variable1 = new schemaModel({
    // _id: updatesent[0],
    name: updatesent[1],
    email: updatesent[2],
    gender: updatesent[3],
    age: updatesent[4]
  });

  schemaModel.findById(id, (err, anyName) => {
    console.log(`id of ${id} updated with new values!`);
    //anyName have the old values of the row
    anyName.name = updatesent[1];
    anyName.email = updatesent[2];
    anyName.gender = updatesent[3];
    anyName.age = updatesent[4];

    anyName.save((err, data) => {
      console.log(JSON.stringify(data));
    });
  });
});

app.post("/delete", (req, res) => {
  console.log("in delete post");
  console.log(JSON.stringify(req.body));

  const deletesent = req.body.datadel;
  console.log(deletesent); //<-- prints _id of delete row
  schemaModel.findByIdAndDelete({ _id: deletesent }).then(parameter => {
    console.log(`Deleted! `);
    console.log(parameter);
    // res.send()
  });
});

// ------------------------------------------------------------
app.listen(port, () => {
  console.log(`server listening to port: ${port}`);
});

app.use(express.static(path.join(__dirname, "/")));
