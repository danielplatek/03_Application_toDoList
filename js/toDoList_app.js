document.addEventListener('DOMContentLoaded', function (e) {

    var taskInput     = document.querySelector('#taskInput');
    var addTaskButton = document.querySelector('#addTaskButton');
    var removeAllTask = document.querySelector('#removeFinishedTasksButton');
    var taskList      = document.querySelector('#taskList');
    var taskCounter   = document.querySelector('#counter');
    var priority      = document.querySelector('#taskPriority');
    var counter       = 0;

    taskCounter.innerText = (counter);      // Task counter

    //Counter function add and subtract
    var addCounter = () => (counter++, taskCounter.innerText = (counter));
    var subCounter = () => (counter--, taskCounter.innerText = (counter));

    addTaskButton.addEventListener('click',function(e){

        // Validation: task and priority
        if ( taskInput.value.length > 5   &&
            taskInput.value.length < 100 &&
            priority.value > 0           &&
            priority.value <= 10         ){

            var newTask = document.createElement("li");
            newTask.dataset.pri = priority.value;
            newTask.style.color = 'black';
            var allLi = document.querySelectorAll("#taskList li");

            // Priority verification for new tasks vs existing tasks
            var index = allLi.length;
            for (var i = 0; i < allLi.length; i++) {
                if (parseInt(newTask.dataset.pri) < parseInt(allLi[i].dataset.pri)) {
                    index = i;
                    break;
                }
            }
            taskList.insertBefore(newTask, allLi[index]);

            // Insert a new task as h1
            var taskName = document.createElement("h1");
            newTask.appendChild(taskName);
            taskName.innerText = taskInput.value;

            // New button
            var deleteBtn = document.createElement("button");
            newTask.appendChild(deleteBtn);
            deleteBtn.innerText = "Delete";

            // New button
            var completeBtn = document.createElement("button");
            newTask.appendChild(completeBtn);
            completeBtn.innerText = "Complete";

            // Clear input
            taskInput.value = '';
            priority.value = '';

            addCounter();

            // Mark done / not done task in red / black. Subtract / add from task counter
            completeBtn.addEventListener('click', function(e) {
                if (this.parentElement.style.color == 'red' ){
                    this.parentElement.style.color = 'black';
                    addCounter();
                }else {
                    this.parentElement.style.color = 'red';
                    subCounter();
                }
            });

            // Remove button, and subtract the task from the counter
            deleteBtn.addEventListener('click', function(e) {
                if (this.parentElement.style.color == 'black') {
                    this.parentElement.remove();
                    subCounter();
                }
                else{
                    this.parentElement.remove();
                }
            });

            // Delete all tasks and reset the counter
            removeAllTask.addEventListener('click', function(e) {  // ad 4.
                while( taskList.firstChild ){
                    taskList.removeChild( taskList.firstChild );
                }
                taskCounter.innerText = (counter = 0);
            });

        } else {
            alert('Your task is too short: (6 - 99 characters) an priority should be an integer (1 - 10) :) ');
        }
    })
});