$(document).ready(function() {
	console.log("Im Here");
	console.log($('#submitBtn').attr('class'));
});

// console.log($('#submitBtn').attr('class'));


// ====================================SUBMIT INPUT FUNCTION=======================================================


function submitFn(id){
	console.log(`Submit button clicked! id : ${id}`);
	// console.log(id);

	const nameInput= $('#inputBoxName').val();
	console.log(nameInput);

	const ageInput=$('#inputBoxAge').val();
	console.log(ageInput);

	const radioInput=$('input[name=gender]:checked').val();
	console.log(radioInput);

	// const radioInputFemale=$("#inputRadioFemale").val();
	// console.log(radioInputFemale);

	arrayInput = new Array;
	arrayInput.push(nameInput);
	arrayInput.push(ageInput);
	arrayInput.push(radioInput);

	for (var i = 0; i < arrayInput.length; i++) {
		console.log(JSON.stringify(arrayInput[i]));
	}
	
	// function ajaxCalling(){
			$.ajax({
					url: "/Submit",
					type: "post",
					contentType : "application/json",
					dataType: "json",
					data: JSON.stringify({data1:arrayInput}),

					// success : function(result){

					// }
				});

		// }

	// ajaxCalling();
	

	alert("Document Submitted!!");

	// $j('#notification').slideDown('fast').delay(1000).slideUp('fast');


	// $("#notification").html(`<p> Document Submitted! </p>`).hide(1500);


	// $("#submitBtn").click(function(){
 //    // $("#notification").show();

 //    	$("#notification").hide(1000);
   
 //  });


	


setTimeout(function(){
		 $('.inputBox').val("");
    	$('.radioBtn').prop('checked', false); }, 300);


} //<- function end bracket







// ====================================UPDATE FUNCTION==================================================================


function updateFn(id){
	console.log(`Update button clicked! id : ${id}`);
	// console.log(id);

	const idUpdate= $('#updateBoxID').val();
	console.log(idUpdate);

	const nameUpdate= $('#updateBoxName').val();
	console.log(nameUpdate);

	const ageUpdate=$('#updateBoxAge').val();
	console.log(ageUpdate);

	const radioUpdate=$('input[name=gender]:checked').val();
	console.log(radioUpdate);

	// const radioInputFemale=$("#inputRadioFemale").val();
	// console.log(radioInputFemale);

	arrayUpdate = new Array;
	arrayUpdate.push(idUpdate);
	arrayUpdate.push(nameUpdate);
	arrayUpdate.push(ageUpdate);
	arrayUpdate.push(radioUpdate);

	for (var i = 0; i < arrayUpdate.length; i++) {
		console.log(JSON.stringify(arrayUpdate[i]));
	}
	
	// function ajaxCalling(){
			$.ajax({
					url: "/Update",
					type: "post",
					contentType : "application/json",
					dataType: "json",
					data: JSON.stringify({data3:arrayUpdate})

					// success : function(result){

					// }
				});

		// }
			
	// ajaxCalling();
	

	alert("Document Updated!!");


	// $("#notification").html(`<p> Document Updated! </p>`).hide(1500);




setTimeout(function(){
		 $('.inputBox').val("");
    	$('.radioBtn').prop('checked', false); }, 300);

   

}




// ====================================DELETE FUNCTION=======================================================

function deleteFn(id){
	console.log("delete button clicked! In deleteFn");

	const idInput4Delete= $('#deleteBoxID').val();
	console.log(`input given : ${idInput4Delete}`);

	$.ajax({
			url: "/Delete",
			type: "post",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify({data2:idInput4Delete})
	});

	console.log(`Document deleted with ID : "${idInput4Delete}"!`);

	alert("Document Deleted!!");

	// $("#notification").html(`<p> Document Deleted! </p>`).hide(1500);

	setTimeout(function(){
		 $('.inputBox').val("");
    	 }, 300);


}