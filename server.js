const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
// assert = require('assert');
const bodyParser=require('body-parser');
const jsonParser= bodyParser.json();


const port=4000;

app.use(jsonParser);

// ==================================================

// Make Schema=======>
const Schema = mongoose.Schema;

userSchema = new Schema({
	email : String,
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
	const variableIn = req.body.data1;  // now I have the 4 inputs in the variable including email
	// console.log(variableIn[0]);  //<-given email

	const itemSave = new schemaModel({email: variableIn[0], name: variableIn[1], age: variableIn[2], sex : variableIn[3]});
	// schemaModel.save(variable);
	// const email = variableIn[0];




	schemaModel.find((err, anyName2)=>{
		if (err) return console.error(err);
		// console.log(anyName2);  //<-- prints everything in db
		console.log(itemSave.email); //<-- prints given email id
		

		var flag = 0;

			for (var i = 0; i < anyName2.length; i++) {
			// console.log(anyName2[i].email);

			if(itemSave.email===anyName2[i].email)
				{
						// console.log(`Email : ${itemSave.email} was already used!`);
					flag=flag+1;

				}
			}

		//==============================================
		console.log("after for loop");

				if (flag!=0) {
					console.log(`Email : ${itemSave.email} was already used!`);
					// res.json({data:itemSave.email});
					// res.json({data:'validity'}); //<-- doesnt send validity
					res.send({data:'validity'});  // <-- sends validity
					console.log("After sending!");
					}
				else{
						console.log("no duplicate email found");

						itemSave.save( (err, anyName)=> {
					    if (err) return console.error(err);
					    // console.log(`anyName is : ${anyName}`); //<-- prints the given values = itemSave
					    console.log(` New data with Email ID : ${itemSave.email} saved!`);
					    res.send({data:'non_validity'}); // <-- sends non_validity
					    console.log(`details: ${itemSave} `);
					    });
					}
			//===========================================
		// console.log(anyName2[61].email);


	}).then((parameter)=>{
		// console.log(parameter);
		// return res.send(parameter);

	})  //<-- end of schemaModel.find function



	// schemaModel.find({email : variableIn[0]
	// 				}).then((parameter)=>{
	// 					console.log(variableIn); //<-- prints inputs put
	// 				})

	

	 
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