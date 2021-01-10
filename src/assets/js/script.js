
//Declaration of dates. taking start and end time.
var todayDateStatTime  = moment().hour(8);
var todayDateEndTime  = moment().hour(17);
var timeFormat = 'hA';

//Time difference for time block 
var timeDiff = todayDateEndTime.diff(todayDateStatTime,'h');
var todoListHour = todayDateStatTime;
$("#currentDay").text(moment().format("dddd, MMMM Do"));
//Rander Today Calander will rander all time block
randerDayPlanner();


//Rander Today Calander will rander all time block
function randerDayPlanner(){

    for(var i=0; i<timeDiff; i++)
    {
        var divrow = $('<div>');
        var divcolTime = $('<div>');
        var taTodoTask = $('<textarea>');
        var btnTodoTaskSave = $('<button>');
        var iforSavebtn = $('<i>');
    
        //Applying css class to the elements.
        divrow.addClass('row time-block');
        divcolTime.addClass('col-1 hour d-flex align-items-center');
        taTodoTask.addClass('col-10 description');
        btnTodoTaskSave.addClass('col-1 saveBtn btn');
        iforSavebtn.addClass('fa fa-save');
        
        //Increment of hour by 1 with given 'hA' formate.
        var timeToShow = todoListHour.add(1,"hours").format(timeFormat);

        divcolTime.append(timeToShow);
        btnTodoTaskSave.attr("task-time",timeToShow);
        divrow.attr("id",timeToShow);
        
        //Add Future/pass and preset time block CSS based on current time.
        var currentHour = moment().hour();
        if(moment(todoListHour).hour() === currentHour)
        {
            taTodoTask.addClass('present');
        }
        else if(moment(todoListHour).hour() < currentHour)
        {
            taTodoTask.addClass('past');   
        }
        else
        {
            taTodoTask.addClass('future');
        }   

        divrow.append(divcolTime);
        divrow.append(taTodoTask);
        btnTodoTaskSave.append(iforSavebtn);
        divrow.append(btnTodoTaskSave);

        $(".container").append(divrow);
    }
    //Load Task Description from Localstorage.
   loadSavedTodos();
}
//Rander saved tasks  from Localstorage.
function loadSavedTodos() {

    //Reading localstorage list if any
    var taskList = JSON.parse(localStorage.getItem('todoTaskList')) || [];
    if(taskList){
        for(var i=0;i<taskList.length;i++)
        {
            var taskTime = taskList[i].tasktime;
            var timeRow = $('#'+taskTime);
            timeRow.children('textarea').val(taskList[i].taskDesc);
   
        }
    }
}

//Save Button Click for each Task.
$(document).on('click', '.saveBtn', function(event) {
    event.preventDefault();
    
    //Reading localstorage list if any
    var taskList = JSON.parse(localStorage.getItem('todoTaskList')) || [];

    //get data from current click element
    var time =  $(this).attr("task-time"); //Save button attr to get time.
    var todoTaskDesc =  $(this).siblings(".description").val().trim(); //get textArea - sibling to get description value
    
    var isTaskExist = false;
   
    for(var i=0;i<taskList.length;i++)
    {
        if(time === taskList[i].tasktime){
            isTaskExist = true;
            if(todoTaskDesc === ""){
                taskList.splice(i,1);
                break;
            }
            else{
                taskList[i].taskDesc = todoTaskDesc;
            }
        }
    }
    if(!isTaskExist){
        //Create object and add to localstorage.
        if(todoTaskDesc === ""){
            alert("Please enter todo task");
        }
        else{
            var task = { tasktime: time, taskDesc :todoTaskDesc};
            taskList.push(task);
        }
    }

    localStorage.setItem('todoTaskList',JSON.stringify(taskList));
   
  });

