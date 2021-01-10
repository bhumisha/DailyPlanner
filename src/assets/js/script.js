

var todayDateStatTime  = moment('08:00:00',"h");
var todayDateEndTime  = moment('17:00:00',"h");
var timeFormat = 'hA';

var timeDiff = todayDateEndTime.diff(todayDateStatTime,'h');
var timeToshow = todayDateStatTime;

console.log(todayDateStatTime);
randerTodayCal();

var taskList = JSON.parse(localStorage.getItem('todoTaskList')) || [];

function randerTodayCal(){

    for(var i=0; i<timeDiff; i++)
    {
        var divrow = $('<div>');
        var divcolTime = $('<div>');
        var todoTask = $('<textarea>');
        var btnTaskSave = $('<button>');
        var iforSavebtn = $('<i>');
    
        divrow.addClass('row time-block');
        divcolTime.addClass('col-1 hour d-flex align-items-center');
        todoTask.addClass('col-10 description');
        btnTaskSave.addClass('col-1 saveBtn btn');
        iforSavebtn.addClass('fa fa-save');
        
        btnTaskSave.append(iforSavebtn);

        var timeShow = moment(timeToshow.add(1,"H")).format(timeFormat)

        divcolTime.append(timeShow);
        divcolTime.attr("time-calc",timeToshow.format("HH"));
        btnTaskSave.attr("task-time",timeShow);
        divrow.attr("id",timeShow);
        
        var currentHour = moment().hour();
        if(currentHour == moment(timeToshow).hour())
        {
            todoTask.addClass('present');
        }
        else if(currentHour > moment(timeToshow).hour())
        {
            todoTask.addClass('past');   
        }
        else
        {
            todoTask.addClass('future');
        }   

        divrow  = divrow.append(divcolTime);
        divrow  = divrow.append(todoTask);
        divrow  = divrow.append(btnTaskSave);

        $(".container").append(divrow);
    }
   renderTodos();
}
function renderTodos() {
    var taskList = JSON.parse(localStorage.getItem('todoTaskList')) || [];
    if(taskList){
        for(var i=0;i<taskList.length;i++)
        {
            var taskTime = taskList[i].time;
            var timeRow = $('#'+taskTime);
            timeRow.children('textarea').val(taskList[i].taskDesc);
   
        }
    }
}
$(document).on('click', '.saveBtn', function(event) {
    event.preventDefault();
    
    var taskList = JSON.parse(localStorage.getItem('todoTaskList')) || [];
    
    var time =  $(this).attr("task-time");
    var todoTaskDesc =  $(this).siblings(".description").val().trim();
    var task = { time: time, taskDesc :todoTaskDesc};

    taskList.push(task);
    
    localStorage.setItem('todoTaskList',JSON.stringify(taskList));
    
   renderTodos(taskList);
    
  });

