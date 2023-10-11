document.addEventListener('DOMContentLoaded', () => {
  var collapsibles = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsibles);
});

document.addEventListener('DOMContentLoaded', function() {
  var select = document.querySelectorAll('select');
  M.FormSelect.init(select);
});

document.addEventListener('DOMContentLoaded', function() {
  var datepicker = document.querySelectorAll('.datepicker');
  M.Datepicker.init(datepicker, {
    format: 'dd/mm/yyyy', // Puedes personalizar el formato de la fecha según tus necesidades
    autoClose: true // Esta opción cerrará automáticamente el date picker después de seleccionar una fecha
  });
});
