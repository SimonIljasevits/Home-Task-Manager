$(document).ready(function() {
    handleHomeJoining()
    handleHomeCreating()
    fetchHomeInfo('simon')
    });

let homeName = ""
let homeMembers = ['Parent']
let homeInfoToJoin = {};

function handleHomeJoining(){
    $('#joinHomeBtn').click(async function() {
      homeName = $("#joinHomeText").val()
      if (homeName === ''){
        console.log('You cant join home without homeName')
        return;
      }

      const data = await fetchHomeInfo(homeName)
      if (!data){
        alert("Home with such name doesn't exist")
        return;
      }
      homeInfoToJoin = data
      addAssigneeOptions()
      $('#joinPopupForm').fadeIn(200);  
      $("#joinFormHeader").text("Join " + homeName)
    });
  

    $('.closeJoinFormBtn').click(function() {
      $('#joinPopupForm').fadeOut(200); 
      homeInfoToJoin = {} 
      homeName = ""
    });

    $('#joinTaskForm').submit(function(e) {
      e.preventDefault();
  
      const assignee = $('#assignee').val();
      
      alert("You have succesfully joined " + homeName + " as " + assignee)
      const params = new URLSearchParams({
        home: homeName,
        memberName: assignee,
        members: homeInfoToJoin.members
      });
      window.location.href = `home.html?${params.toString()}`;
    });
  }

  function addAssigneeOptions(){
    $('#assignee').empty();
    homeInfoToJoin.members.forEach(m => $('#assignee').append(`<option value="${m}">${m}</option>`))
  }

  function handleHomeCreating(){
    $('#createHomeBtn').click(async function() {
      homeName = $("#createHomeText").val()
      if (homeName === ''){
        alert('You cant create home without homeName')
        return;
      }
      const data = await fetchHomeInfo(homeName)
      if (data){
        alert("Home with such name already exists")
        return;
      }
      $('#createPopupForm').fadeIn(200);  
      $("#createFormHeader").text(homeName + " Create Form")
    });

    $('#addMemberButton').click(function(){
      const memberName = $('.memberNameText').val();
      $('.memberNameText').val("")
      homeMembers.push(memberName)
      $('.memberList').append('<p>' + memberName + '</p>');
    });
  

    $('.closeCreateFormBtn').click(function() {
      $('#createPopupForm').fadeOut(200);  
      homeMembers = ['Parent']
      homeName = ""
    });

    $('#createTaskForm').submit(async function(e) {
      e.preventDefault();
      
      await postHomeInfo(homeName, homeMembers)
      alert("You have succesfully created home with name: " + homeName)
      const params = new URLSearchParams({
        home: homeName,
        memberName: "Parent",
        members: homeMembers
      });
      window.location.href = `home.html?${params.toString()}`;
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

 async function fetchHomeInfo(homeName) {
    data = await fetchDatabase(homeName);
    if (!data[0]){
      console.log('HomeInfo is null') 
      return null;
    }
    console.log("HomeInfo is: " + data[0].members)
    return data[0];
 }

async function postHomeInfo(name, members){
  let homeInfo = {}
  homeInfo["name"] = name;
  homeInfo["members"] = members;
  console.log(JSON.stringify(homeInfo))
  await postDatabase(name, JSON.stringify(homeInfo))
}

 