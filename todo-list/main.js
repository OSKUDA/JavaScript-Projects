window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector('#tasks');

    // local storage
    let myTaskList = JSON.parse(window.localStorage.getItem('task'));
    if (myTaskList == null){
        myTaskList = [];
    }
    buildTaskElementFromMemory(list_el,myTaskList);

    // form submit event listener
    form.addEventListener('submit', (e)=> {
        e.preventDefault(); // prevents page refresh on submit
        const task = input.value;

        if(!task){
            alert('Please fill out the task');
            return;
        }
        addTaskElements(list_el,task,myTaskList);
        input.value = '';
    });
});

function buildTaskElementFromMemory(list_el,myTaskList){
    let count = 0;
    myTaskList.forEach((task) => buildTaskElement(list_el,task,myTaskList,count++));
}

function buildTaskElement(list_el, task, myTaskList, task_number){
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
    
    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly','readonly');

    task_content_el.appendChild(task_input_el);
    
    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerHTML = 'Edit';
    
    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerHTML = 'Delete';

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    task_edit_el.addEventListener('click', () => {
        if(task_edit_el.innerText.toLocaleLowerCase() == 'edit'){
            task_input_el.removeAttribute('readonly');
            task_input_el.focus();
            task_edit_el.innerText = 'Save';
        }else{
            updateListAndStore(myTaskList, task_input_el.value, task_number);
            task_input_el.setAttribute('readonly','readonly');
            task_edit_el.innerText = "Edit";
        }
     });

     task_delete_el.addEventListener('click', () => {
            deleteTask(myTaskList, task_number);
            list_el.removeChild(task_el);
     });
}

function addTaskElements(list_el,task,myTaskList){
    let task_number = myTaskList.length -1  + 1;
    updateListAndStore(myTaskList,task,task_number);
    buildTaskElement(list_el, task,myTaskList, task_number);
}

function updateListAndStore(myTaskList,newValue,index){
    myTaskList[index] = newValue;
    window.localStorage.setItem('task',JSON.stringify(myTaskList));
}

function deleteTask(myTaskList, task_number){
    myTaskList.splice(task_number,1);
    window.localStorage.setItem('task', JSON.stringify(myTaskList));
}