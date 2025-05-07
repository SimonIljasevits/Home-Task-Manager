$(document).ready(function() {
    handleHomeJoining()
    handleHomeCreating()
  
    });

let homeName = ""

function handleHomeJoining(){
    $('#joinHomeBtn').click(function() {
      $('#joinPopupForm').fadeIn(200);  
      homeName = $("#joinHomeText").val()
      $("#joinFormHeader").text("Join " + homeName)
    });
  

    $('.closeJoinFormBtn').click(function() {
      $('#joinPopupForm').fadeOut(200);  
    });

    $('#joinTaskForm').submit(function(e) {
      e.preventDefault();
  
      const assignee = $('#assignee').val();
      
      alert("You have succesfully joined " + homeName + " as " + assignee)
      window.location.href = "home.html"
    });
  }

  function handleHomeCreating(){
    $('#createHomeBtn').click(function() {
      $('#createPopupForm').fadeIn(200);  
      homeName = $("#createHomeText").val()
      $("#createFormHeader").text(homeName + " Create Form")
    });

    $('#addMemberButton').click(function(){
      const memberName = $('.memberNameText').val();
      $('.memberNameText').val("")
      $('.memberList').append('<p>' + memberName + '</p>');
    });
  

    $('.closeCreateFormBtn').click(function() {
      $('#createPopupForm').fadeOut(200);  
    });

    $('#createTaskForm').submit(function(e) {
      e.preventDefault();
      
      alert("You have succesfully created home with name: " + homeName)
      window.location.href = "home.html"
    });
  }


 