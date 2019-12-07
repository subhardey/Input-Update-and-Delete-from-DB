const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
// assert = require('assert');
const bodyParser=require('body-parser');
const jsonParser= bodyParser.json();


const port=3000;

app.use(jsonParser);

// ==================================================

// Make Schema=======>
const Schema = mongoose.Schema;

userSchema = new Schema({
	name : String,
	age : String,
	sex : String
});

// Making Schema model =========>
const schemaModel = mongoose.model('profiles', userSchema);

// ===========================================================================
mongoose.connect('mongodb://localhost:27017/profiles', {useNewUrlParser: true}, (err)=>{
	if (err) {
		console.log(err);
	}
	else{
		console.log(`============>connected to mongodb<===============`)
	}
	// assert.equal(null, err);

});

// ==========================get==================================

app.get('/', (req,res)=>{
	res.sendFile(__dirname, 'index.html');
	console.log(`====>fetched html file to server!<===`);    //<---sending index.html file to server

});

app.use(express.static(path.join(__dirname, '/')));

// =============================INPUT==================================

app.post('/Submit', (req, res)=>{
	console.log("in inputSubmit post");
	console.log(JSON.stringify(req.body));
	// console.log(req.body)
	const variableIn = req.body.data1;  // now I have the 3 inputs in variable
	// console.log(variableIn[2]);

	const itemSave = new schemaModel({name: variableIn[0], age: variableIn[1], sex : variableIn[2]});
	// schemaModel.save(variable);

	

	 itemSave.save((err, schemaModel)=> {
      if (err) return console.error(err);
      console.log(` New data with Name : ${itemSave.name} saved!`);
      console.log(`details: ${itemSave} `);
    });
});

// =============================UPDATE==========================================================

app.post('/Update', (req, res)=>{
	console.log("in Update post");
	console.log(JSON.stringify(req.body));
	// console.log(req.body)
	const variableUp = req.body.data3; 

	

	const itemUpdate = new schemaModel({name: variableUp[1], age: variableUp[2], sex : variableUp[3]});

	console.log(itemUpdate); //<--new values

	console.log(`variableUp[1] : ${variableUp[1]}  ${variableUp[2]} ${variableUp[0]} `);
								// =====================================================
const id = variableUp[0];

			schemaModel.findById(id, (err, anyName)=>{
				if (err) return console.error(err);
				console.log("old value"+anyName);
					anyName.name = variableUp[1];
					anyName.age = variableUp[2];
					anyName.sex = variableUp[3];
					anyName.save((err, data)=>{
						console.log(JSON.stringify(data));
					});
				// itemUpdate.save((err,itemUpdate)=>{
				// 		console.log(variableUp.name);
				// });

			});

	// =======================================================================

	// schemaModel.findOne({ _id : variableUp[0] 
	// 					}).then((parameter)=>{
	// 						{ 	
	// 							console.log(parameter); //<-- old values
	// 							console.log(parameter.name);

	// 							parameter.name = itemUpdate.name;
	// 							parameter.age = itemUpdate.age;
	// 							parameter.sex = itemUpdate.sex;
							// =======================================
							// 	parameter.name = variableUp[1],
							// 	parameter.age = variableUp[2],
							// 	parameter.sex = variableUp[3]
							// }
						// });
		// ========================================================

	// schemaModel.update({_id: variableUp[0]}, {$set:{
	// 							    name : variableUp[1], 
	// 							    age: variableUp[2],
	// 							    sex : variableUp[3]


	// 							}});
// =========================================================================================
// schemaModel.updateMany({_id : variableUp[0]}, { $set: { name : variableUp[1], 
// 								    age: '666',
// 								    sex : variableUp[3] } });
// ============================================================================================


	// schemaModel.overwrite({ _id : variableUp[0]}, { name: 'Jean-Luc Picard' });


// ============================================================================================
	

	 // itemSave.save(function (err, schemaModel) {
  //     if (err) return console.error(err);
  //     console.log(` New data with Name : ${itemSave.name} saved!`);
  //     console.log(`details: ${itemSave} `);
  //   });



}); //<- update bracket end




// =============================DELETE==========================================================

app.post('/Delete', (req, res)=>{
	console.log("in delete post");
	console.log(JSON.stringify(req.body));

	const variableDel = req.body.data2;
	console.log(variableDel);

	schemaModel.findOneAndDelete({
		_id : variableDel
	}).then((parameter)=>{
		console.log(`Deleted : `);
		console.log(parameter);
		})

});












app.listen(port, ()=> console.log(`connected to port : ${port} !!!`));