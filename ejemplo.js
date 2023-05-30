
//la url que uds van a consumir es la siguiente
// ->/siicsa/api/orden-trabajo/id(id del campo para actualizar)/update

//este ejemplo es como se consume informacion en las urls que ven

document.addEventListener('DOMContentLoaded', function () {
    const $inpuTest = document.querySelector('[name="test"]');
    const $inputPruebas = document.querySelector('[name="prueba"]')
    const table_test = document.querySelector('#t-tests');
    //const table_test_selected = document.querySelector('#t-tests-selected');
    const $fTrabajos = document.querySelector('#f-trabajos')
    
    $inpuTest.addEventListener('input', function () {
        if (this.value.length === 1) {
            this.value = this.value.replace(" ", "")
            cleanup(table_test);
            return;
        }
        if (this.value.length % 3 === 0 && this.value.length > 0) {
            get_tests(this.value)
        }
    }); //fin input_test.addEventlistener

    async function get_tests(q) {
        fetch(`/siicsa/api/tests?search=${q}&type=test`)
            .then(data => data.json())
            .then(data => {
                cleanup(table_test)
                data.forEach(e => {
                    table_test.insertAdjacentHTML('beforeend', `<tr data-uuid="${e.uuid}" data-id="${e.id}"><td>${e.folio} - ${e.nombre}</td></tr>`)
                });
                table_test.querySelectorAll('tr').forEach(element => {
                    element.addEventListener('click', function () {
                        cleanup(table_test)
                        $inputPruebas.value = element.dataset.id
                        $inputPruebas.parentElement.style.display = 'none';
                        let set_test = this.cloneNode(true);
                        set_test.children[0].insertAdjacentHTML('beforeend', '<a class="btn-flat red-text"><i class="material-icons">close</i></a>')
                        set_test.querySelector('a').addEventListener('click', function () {
                            this.closest('tr').remove()
                            $inputPruebas.value="";
                            $inputPruebas.parentElement.style.display = 'block';
                            table_test.closest('.card-panel').style.border = 'none';
                        })
                        
                        table_test.insertAdjacentElement('beforeend', set_test);
                        table_test.closest('.card-panel').style.border = '4px solid #c8e6c9';
                    });
                });
            })       
    }

    $fTrabajos.addEventListener('submit', async (event) => {
        event.preventDefault();

        let $divMessage = document.getElementById('message-container')
        const data = Object.fromEntries(new FormData(event.target).entries());
        let ordenPk = document.getElementById('orden-pk').value; 
        data.orden = ordenPk;
        console.log(data)
        fetch('/siicsa/api/trabajos/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': data.csrfmiddlewaretoken
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                
                if (data.success) {
                    cleanup(table_test)
                    $inputPruebas.parentElement.style.display = 'block';
                    $divMessage.classList.add('success');
                    $divMessage.style.display = 'block';
                    $divMessage.innerHTML = '<p>' + data.message + '</p>';
                    $fTrabajos.reset();
                    setTimeout(function() {
                        $divMessage.style.display = 'none';
                      }, 3000);
                }
                else {
                    // Mostrar errores de validación en el formulario
                    
                    $divMessage.classList.add('error');
                    $divMessage.style.display = 'hide';
                    $divMessage.innerHTML = '<p>' + data.message + '</p>';
                    const errors = data.errors;
                    Object.keys(errors).forEach(field => {
                      const errorMessage = errors[field].join(', '); // Combina los mensajes de error en un solo string
                      const errorElement = document.getElementById(`error-${field}`);
                      if (errorElement) {
                        errorElement.textContent = errorMessage;
                      }
                    });
                    setTimeout(function() {
                        $divMessage.style.display = 'none';
                      }, 3000);
                }
                
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
                document.getElementById('message-container').innerHTML = '<p>Error en el servidor</p>';
            });

    });


    function cleanup(element) {
        element.innerHTML = '';
    }

});