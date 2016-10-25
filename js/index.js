'use strict';

// height per minute
var hpm = 100 / 15 / 60;
var numCourses = 0;
var nextCourse = 0;

// Expecting hh:mm 24-hour
function scheduleCourse(courseItem) {

    var totalStart = ((courseItem.startTimeHours * 60) + (courseItem.startTimeMins)) - 420;
    var totalEnd = ((courseItem.endTimeHours * 60) + (courseItem.endTimeMins)) - 420;

    var top = totalStart * hpm + '%';
    var height = (totalEnd - totalStart) * hpm + '%';
    var $dayColumn = $(courseItem.classDays.join(", "));
    $dayColumn.append('\n <div class="schedule-sheet-item" style="background: #' +courseItem.colour +'; top: ' + top + '; height: ' + height + '">\n      <div>\n        <h4>' + courseItem.title + '</h4>\n        <h6>' + courseItem.startTimeHours + ':' + courseItem.startTimeMins + ' - ' + courseItem.endTimeHours + ':' + courseItem.endTimeMins + '</h6>\n      </div>\n    </div>\n  ');
    if (courseItem.hasLab) {
    	scheduleLab(courseItem.colour, courseItem.lab);
    }
}

function scheduleLab(courseColour, labItem) {

    var totalStart = ((labItem.startTimeHours * 60) + (labItem.startTimeMins))-420;
    var totalEnd = ((labItem.endTimeHours * 60) + (labItem.endTimeMins))-420;

    var top = totalStart * hpm + '%';
    var height = (totalEnd - totalStart) * hpm + '%';
    var $dayColumn = $(labItem.classDays.join(", "));
    $dayColumn.append('\n <div class="schedule-sheet-item" style="background: #' +courseColour +'; top: ' + top + '; height: ' + height + '">\n      <div>\n        <h4>' + labItem.title + '</h4>\n        <h6>' + labItem.startTimeHours + ':' + labItem.startTimeMins + ' - ' + labItem.endTimeHours + ':' + labItem.endTimeMins + '</h6>\n      </div>\n    </div>\n  ');
}

// Apply parseInt to an array of numbers
function intify(arr) {
  return arr.map(function (n) {
    return parseInt(n);
  });
}


function isValidInfo(labOrCourse) {
  var boxesChecked = $(labOrCourse + '.allBoxes input').is(':checked');
  var titleFilled = $(labOrCourse + '#courseTitle').val().length > 0;
  return( boxesChecked && titleFilled );
}

function isValidTime(labOrCourse){
    var startHour = parseInt($(labOrCourse + '#startTime .hour').val());
    var startMinute = parseInt($(labOrCourse + '#startTime .minute').val());
    var startMeridiem = $(labOrCourse + '#startTime .meridiem').val()

    var endHour = parseInt($(labOrCourse + '#endTime .hour').val());
    var endMinute = parseInt($(labOrCourse + '#endTime .minute').val());
    var endMeridiem = $(labOrCourse + '#endTime .meridiem').val();

    //startTime & endTime represent the time in minutes
    var startTime = (startMeridiem == 'PM') ? ((startHour + 12) * 60) + startMinute : (startHour * 60) + startMinute;
    var endTime = (endMeridiem == 'PM') ? ((endHour + 12) * 60) + endMinute : (endHour * 60) + endMinute;

    return( endTime - startTime > 45 && startTime > 479 && endTime < 6480 );
}

function initCourse(labOrCourse){
  if (labOrCourse == "#addCourseForm "){
    var newCourse = {
      title: $(labOrCourse + '#courseTitle').val(),  //String that has course title.
      colour: $('#courseColour').val(),  //String that has hex colour value
      classDays: getCourseDays("#addCourseForm "),  //Array that has correct days #mon,#tues,#wed,#thurs,#fri
      startTimeHours: to24Hour(parseInt($(labOrCourse + '#startTime .hour').val()) , $(labOrCourse + '#startTime .meridiem').val() ),  //Number that has the start hour in 24 hours
      startTimeMins: parseInt($(labOrCourse + '#startTime .minute').val()),  //Number that has the start min
      totalStartMins: 0,
      endTimeHours: to24Hour(parseInt($(labOrCourse + '#endTime .hour').val()) , $(labOrCourse + '#endTime .meridiem').val() ),  //Number that has the end hour in 24 hours
      endTimeMins: parseInt($(labOrCourse + '#endTime .minute').val()),  //Number that has the end min
      totalEndMins: 0,
      instructor: $(labOrCourse + '#instructor').val(),  //String that has the instructor name
      location: $(labOrCourse + '#location').val(),  //String that has the location
      hasLab: $('#labCheckBox').is(':checked'),  //Boolean true or false depending on if a lab exists
      lab: null   //Either has the lab or a pointer to the lab somehow
    }
    if (newCourse.hasLab) {
      newCourse.lab = initCourse("#labForm ");
    }
  } else {
    var newCourse = {
      title: $(labOrCourse + '#courseTitle').val(),  //String that has course title.
      colour: $('#courseColour').val(),  //String that has hex colour value
      classDays: getCourseDays("#labForm "),  //Array that has correct days #mon,#tues,#wed,#thurs,#fri
      startTimeHours: to24Hour(parseInt($(labOrCourse + '#startTime .hour').val()) , $(labOrCourse + '#startTime .meridiem').val() ),  //Number that has the start hour in 24 hours
      startTimeMins: parseInt($(labOrCourse + '#startTime .minute').val()),  //Number that has the start min
      totalStartMins: 0,
      endTimeHours: to24Hour(parseInt($(labOrCourse + '#endTime .hour').val()) , $(labOrCourse + '#endTime .meridiem').val() ),  //Number that has the end hour in 24 hours
      endTimeMins: parseInt($(labOrCourse + '#endTime .minute').val()),  //Number that has the end min
      totalEndMins: 0,
      instructor: $(labOrCourse + '#instructor').val(),  //String that has the instructor name
      location: $(labOrCourse + '#location').val(),  //String that has the location
    }
  }
  return(newCourse);
}

function getCourseDays(labOrCourseDays) {
  var daysArray = [];
  $(labOrCourseDays+ '.allBoxes input:checked').each(function(){
    daysArray.push( $(this).val() );
  });

  return(daysArray);
}

function to24Hour (oneTwoHour, amOrPM) {
  var twoFourHour = oneTwoHour;
  if (amOrPM == 'PM') {
    twoFourHour = twoFourHour + 12;
  }
  return(twoFourHour);
}