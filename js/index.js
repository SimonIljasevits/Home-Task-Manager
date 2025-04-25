$(document).ready(function() {
    handleHomeJoining()
  
    });

let homeName = ""

function handleHomeJoining(){
    $('#joinHomeBtn').click(function() {
      $('#popupForm').fadeIn(200);  
      homeName = $("#joinHomeText").val()
      $("#formHeader").text("Join " + homeName)
    });
  

    $('.closeFormBtn').click(function() {
      $('#popupForm').fadeOut(200);  
    });

    $('#taskForm').submit(function(e) {
      e.preventDefault();
  
      const assignee = $('#assignee').val();
      
      alert("You have succesfully joined " + homeName + " as " + assignee)
      window.location.href = "home.html"
    });
  }

