/*
var addButton = document.getElementById('addButton');

addButton.addEventListener('click', function() {

    liteModal.open("#addPanel");

}); */

var newCourse;
var courseArray = [];

/* Main Page Add Button */
$("#addButton").click(function(){
	liteModal.open("#addPanel");
	$('#labInfo').hide();
	checkTimeInput();
});

/* Main Page Edit Button */
$("#editButton").click(function(){
	liteModal.open("#editPanel");
});

/* Main Page Delete Button */
$("#deleteButton").click(function(){
	liteModal.open("#deletePanel");
});

/* Main Page Export Button */
$("#exportButton").click(function(){
	liteModal.open("#exportPanel");
});

/* Add: Check if time entered is valid. */
function checkTimeInput() {
    $('input[min][max]').blur(function(){
        var $timeinput = $(this);
        var max = $timeinput.attr('max');
        var min = $timeinput.attr('min');
        if ( parseInt($timeinput.val())  > parseInt(max) ) {
            $timeinput.val( max );
        } else if (parseInt($timeinput.val())  < parseInt(min)) {
          $timeinput.val( min );
        }
    });
}

/* Add: If Lab is selected then a form appears. */
$("#labCheckBox").click(function(){
	console.log($('#courseColour').val());
	if ($('#labCheckBox').is(':checked')){
        $('#labForm').html("<h2>Add a Lab</h2>" + $('#addCourseForm').html());
        checkTimeInput();
	} else {
        $('#labForm').html("");
	}
});

/* Main Page Export Button */
$("#addCourseButton").click(function(){
	var isValid = true;
	//Checks to see if the time for the course is valid
    $('#courseErrorMessages').html("");
	$('#labErrorMessages').html("");
	if (isValidTime("#addCourseForm ")){
		console.log("Valid: Course Time");
		$('#courseErrorMessages').html("");
	} else {
		console.log("Invalid: Course Time");
		$('#courseErrorMessages').html($('#courseErrorMessages').html() + "<p>Invalid Course Time: Only 8AM - 10PM and longer than 45 minutes.</p>");
	    isValid = false;
	}
    
    //Checks to see if rest of fields are valid
	if (isValidInfo("#addCourseForm ")) {
		console.log("Valid: Course Info");
	} else {
		console.log("Invalid: Course Info");
		$('#courseErrorMessages').html($('#courseErrorMessages').html() + "<p>Missing Course Fields: Course Title and Operation Days are required.</p>");
	    isValid = false;
	}

    //Checks to see if the time for the lab is valid
	if ($('#labCheckBox').is(':checked')) {
        if (isValidTime("#labForm ")){
		    console.log("Valid: Lab Time");
		    $('#labErrorMessages').html("");
	    } else {
		    console.log("Invalid: Lab Time");
		    $('#labErrorMessages').html($('#labErrorMessages').html() + "<p> Invalid Lab Time: Only 8AM - 10PM and longer than 45 minutes.</p>");
	        isValid = false;
	    }

	    if (isValidInfo("#labForm ")) {
		    console.log("Valid: Lab Info");
		    $('#labMessages').html("");
	    } else {
		    console.log("Invalid: Lab Info");
		    $('#labErrorMessages').html($('#labErrorMessages').html() + "<p>Missing Lab Fields: Course Title and Operation Days are required.</p>");
	        isValid = false;
	    }
	}

	if (isValid == true) {
        newCourse = initCourse("#addCourseForm ");
        courseArray.push(newCourse);
        numCourses = numCourses + 1;
        nextCourse = numCourses - 1;
        console.log('Before Sending to Print Function');
        console.log(courseArray[nextCourse]);
        scheduleCourse(courseArray[nextCourse]);
        liteModal.close();
	}
});
