var currentDay = $("#currentDay");
var timeslots = $("#time-blocks");
var saveBtn = $(".saveBtn");
var todaysDate = moment().format("dddd, MMMM Do, YYYY");
var start = moment().set("h",8).format("h a");
var time = moment().format("h a");

const key = "WorkDayScheduler";

// Prints current day at the top of the page, in red
function printCurrentDay() {
    currentDay.html(todaysDate);
    currentDay.addClass("red");
};

printCurrentDay();

// Figures out the current time, and compares that to the time slots generated
// Shades timeslots based on past, present, and future.
function currentTime() {
    var getHour = moment().hour();
    for (var i = 0; i < 10 ; i++) {
        var modTime = i + 8;
            if (getHour > modTime) {
                $("#slot" + i).addClass("past");
            } else if (getHour === modTime) {
                $("#slot" + i).addClass("present");
            } else {
                $("#slot" + i).addClass("future");
            };
        };
    };

// Inserts HTML into the DOM for each time slot needed
function setupTimeslots() {
    for (var i = 0; i < 10; i++) {
        var timeSet = moment(start, "h a").add(i, "h").format("h a");
        var timeslot =
        $(`<div class="time-block row d-flex justify-content-center">
        <div class="hour col-sm-1 p-2">${timeSet}</div>
        <textarea id="slot${i}" class="input col-sm-10"></textarea>
        <button id="button${i}" class="saveBtn col-sm-1"><i class="fas fa-save"></i></button>
        </div>`);
    timeslots.append(timeslot);
    };
};

// Sets up structure for localStorage saving
timeslots.on("click", "button", function() {
    var slotData = [
        {id:0,task:document.getElementById("slot0").value},
        {id:1,task:document.getElementById("slot1").value},
        {id:2,task:document.getElementById("slot2").value},
        {id:3,task:document.getElementById("slot3").value},
        {id:4,task:document.getElementById("slot4").value},
        {id:5,task:document.getElementById("slot5").value},
        {id:6,task:document.getElementById("slot6").value},
        {id:7,task:document.getElementById("slot7").value},
        {id:8,task:document.getElementById("slot8").value},
        {id:9,task:document.getElementById("slot9").value},
    ]
localStorage.setItem(key, JSON.stringify(slotData));
});

// Loads timeslot data into DOM-inserted timeslots
function loadTasks() {
    var taskLoad = JSON.parse(localStorage.getItem(key));
    if (taskLoad) {
        for (var i = 0; i < taskLoad.length; i++) {
            var slot = document.getElementById("slot" + i);
            slot.innerHTML = taskLoad[i].task;
        }
    }
};

// Executes everything not already called previously
setupTimeslots();
currentTime();
loadTasks();