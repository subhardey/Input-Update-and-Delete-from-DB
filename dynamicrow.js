$(document).ready(function() {
  console.log(`Hey there!`);
});

var counter = 1;
var unique;

// ----------------------------------------------------------

$(function() {
  $("#addNewBTN").click(function() {
    console.log(">Add New< button clicked!");

    var rowCount = $("#tableid tr").length;

    // <td><input type="text" class="userid" name="userid[]" id="myid_${rowCount}" placeholder="Enter a Unique UserID"></td>

    var html = `<tr id="row_${rowCount}">
				<td><input type="text" class="name" name="name[]" id="inputName_${rowCount}"></td>
				<td><input type="text" class="email" name="email[]" id="inputEmail_${rowCount}"></td>
				<td><input type="text" class="gender" name="gender[]" id="inputGender_${rowCount}"></td>
				<td><input type="text" class="age" name="age[]" id="inputAge_${rowCount}"></td>
				<td><button class="deleteBTN" data-id="deleteBtn_${rowCount}">x</button></td>
      </tr>
      <p id="p_${rowCount}"></p>`;

    $("table").append(html);

    console.log(`Number of Rows: ${rowCount} `);
    counter = rowCount;

    rowCount++;

    // return rowCount;
  });

  // console.log(`Number of Rowssss: ${rowCount} `);

  // ------------------delete btn ---------------------------------------------------------

  $(document).on("click", `.deleteBTN`, function() {
    var xid = $(this).data("id");
    console.log(`>Delete< button clicked! id: ${xid}`);
    // alert(xid);
    var str = xid;
    idnum = str.split("_");
    console.log(idnum[1]);

    // $("#row_" + idnum[1]).remove(); //<-- working
    $(`#row_${idnum[1]}`).remove(); //<-- working

    // $(this)
    //   .closest("tr")
    //   .remove();       //<-- also works

    var counter = $("#tableid tr").length - 1;

    console.log(`number of rows after deletion : ${counter}`);
  });

  // console.log(`number of rows after deletion pt2 : ${counter}`);  //<- undefined

  // ----------------submit------------------------------------------------------------------

  $(document).on("click", `#submitBTN`, function() {
    finalArray = new Array();

    for (var i = 0; i < counter; i++) {
      arrayInput = new Array();

      if ($(`#inputName_${i + 1}`).val() == null) {
        //<- when a row is deleted
        console.log(`row ${i + 1} skipped!`);
      } else {
        // const myid = $(`#myid_${i + 1}`).val();
        const nameV = $(`#inputName_${i + 1}`).val();
        const emailV = $(`#inputEmail_${i + 1}`).val();
        const genderV = $(`#inputGender_${i + 1}`).val();
        const ageV = $(`#inputAge_${i + 1}`).val();

        // arrayInput.push(myid);
        arrayInput.push(nameV);
        arrayInput.push(emailV);
        arrayInput.push(genderV);
        arrayInput.push(ageV);
      }

      finalArray[i] = arrayInput;
    }

    const removeItem = "";

    finalArray = jQuery.grep(finalArray, function(value) {
      return value != removeItem;
    });

    for (var j = 0; j < finalArray.length; j++) {
      console.log(JSON.stringify(finalArray[j]));
    }
    var emptyinput = 0;

    for (let j = 0; j < finalArray.length; j++) {
      for (let k = 0; k < arrayInput.length; k++) {
        if (arrayInput[k] == "") {
          emptyinput++;
        }
      } //<-- arrayInput for end
    } //<-- finalArray for end

    if (emptyinput != 0) {
      alert("Inputs must be filled out!");
    } else {
      // =----------------------------------------------------

      $.ajax({
        url: "http://localhost:4040/submit",
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ data1: finalArray }),

        success: function(result) {
          console.log("in ajax success");
          console.log(result); //<-- works
          alert("Saved Successfull In Database");
          // console.log(result.data); //<-- undefined
          // if (result.data == "duplicate") {
          //   setTimeout(() => {
          //     // $(`#p_${rownum}`).append(`userID already exists! Use another!`);

          //     alert("user Id already exists");
          //   }, 1000);
          // } else if (result.data == "saved") {
          //   console.log("data saved successfully");
          //   alert("saved successfully");
          // }
        }
      }); //<-- ajx end
    } //<-- else end

    location.reload(true);
    console.log("reloaded!");
  }); //<-- submit fn end
}); //<-- function end

// ------------------------fetch function------------------------------------------------
