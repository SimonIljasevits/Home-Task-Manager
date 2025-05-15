const urlParams = new URLSearchParams(window.location.search)
const homeName = urlParams.get('home')
const memberName = urlParams.get('memberName')
const members = urlParams.get('members')
const taskDb = `${homeName}-tasks`
console.log(`Home page opened with homeName: ${homeName} and with memberName: ${memberName}`)
console.log('Task url is: ' + taskDb)

$(document).ready(function() {
  handleNewTaskCreating()
  handleTaskClearing()

  $('.megaTitle').append(` ${homeName.toUpperCase()}`)
  fetchTasks()
  console.log(members)
  $('#assignee').empty()
  members.split(',').forEach(m => {
    $('#assignee').append(`<option value="${m}">${m}</option>`)
  })
  });

  function handleNewTaskCreating(){
    $('#createTaskBtn').click(function() {
      $('#popupForm').fadeIn(200);  
    });
  

    $('.closeFormBtn').click(function() {
      $('#popupForm').fadeOut(200);  
    });

    $('#taskForm').submit(async function(e) {
      e.preventDefault(); 

      const taskName = $('#taskName').val();
      const assignee = $('#assignee').val();

      await postTask(taskName, assignee)

      alert(taskName + " task was assigned to " + assignee)

      $('#popupForm').fadeOut(200, function() {
        window.location.reload()
      });
      $('#taskForm')[0].reset(); 
    });
  }

  async function postTask(name, assignedTo){
    let task = {
      'name' : name,
      'assignedTo': assignedTo
    }

    await postDatabase(taskDb, JSON.stringify(task))
  }

  function handleTaskClearing(){
    $('.clearCompletedTasks').click(function(){
      const completedTaskIds = []
      $('.taskPlank').has('input[type="checkbox"]:checked').each(function () {
        const id = $(this).data('id');
        if (id !== undefined) {
          completedTaskIds.push(id);
        }
      });

      console.log(completedTaskIds)
      
      $('.taskPlank').has('input[type="checkbox"]:checked').remove();

      completedTaskIds.forEach(taskId => deleteDatabase(taskDb, taskId))
    })
  }

function createTaskWithId(name, id){
  return `<div class="taskPlank" data-id ="${id}">
    <img class="taskImage" src="images/task.png" alt="Task">
    <p style="padding-left: 15px;">${name}</p>
    <input type="checkbox" name="isTaskDone" id="isTaskDone">
  </div>`
}

async function fetchTasks() {
  tasks = await fetchDatabase(taskDb)
  tasks.forEach(t => { if (t.assignedTo === memberName){
    $('#taskBox').append(createTaskWithId(t.name, t.id))
  }
  });
}

  async function postDatabase(dbName, postContent){
    const url = "https://kool.krister.ee/chat/homeTaskManager-" + dbName;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: postContent
    });
    console.log(url)
    if (!response.ok){
      alert("Server returned " + response.status)
    }
  }

  async function fetchDatabase(dbName) {
    const response = await fetch("https://kool.krister.ee/chat/homeTaskManager-" + dbName);
    const data = await response.json();
    return data;
}

async function deleteDatabase(dbName, itemId){
  const url = `https://kool.krister.ee/chat/homeTaskManager-${dbName}/${itemId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: ''
  });
  console.log(url)
  if (!response.ok){
    alert("Server returned " + response.status)
  }
}