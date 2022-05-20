var todaysDate = moment().format("dddd, MMMM Do, YYYY")
var currentDay = $("#currentDay");
var timeslots = $("#time-blocks");

function printCurrentDay() {
    currentDay.html(todaysDate);
    currentDay.addClass("red");
}

printCurrentDay();

function setupTimeslots() {
    var start = moment().set("h",8).format("h a");
    for (var i = 0; i < 10; i++) {
        var timeSet = moment(start, "h a").add(i, "h").format("h a");
        var timeslot =
        $(`<div class="time-block row d-flex justify-content-center">
        <div class="hour col-sm-1 p-2">${timeSet}</div>
        <textarea id="slot${i}" class="input col-sm-10"></textarea>
        <button id="button${i}" class="saveBtn col-sm-1"><i class="fas fa-save"></i></button>
        </div>`);

    timeslots.append(timeslot);
    }
    
    function currentTime() {
        var getHour = moment().hour();
        console.log("getHour = " + getHour);
    }
    
    currentTime();
}

setupTimeslots();

