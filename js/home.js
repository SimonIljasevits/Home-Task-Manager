$(document).ready(function() {
    $('#createTaskBtn').click(function() {
      $('#popupForm').fadeIn(200);  
    });
  

    $('.closeFormBtn').click(function() {
      $('#popupForm').fadeOut(200);  
    });

    $('#taskForm').submit(function(e) {
      e.preventDefault(); 
  
      const taskName = $('#taskName').val();
      const assignee = $('#assignee').val();
      
      alert(taskName + " task was assigned to " + assignee)

      $('#popupForm').fadeOut(200);
      $('#taskForm')[0].reset(); 
    });
  });