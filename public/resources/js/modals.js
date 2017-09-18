$('.modal-dialog').draggable();

$('#contactModal').on('shown.bs.modal', function(e){
  $('#contact').one('focus', function(e){
    $(this).blur();
  });
});
