const user1 = document.getElementById('user1')

window.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('#search')
    const tableContainer = document.querySelector('#results tbody')
    const resultsContainer = document.querySelector('#resultsContainer')
    const errorsContainer = document.querySelector('.errors-container')
    let search_cantantes = ''

    if (search){
        search.addEventListener('input', event =>{
            search_cantantes = event.target.value.toUpperCase()
            user1.style.display = 'none'
            showResults()
        })
    }

    //Enviar petición usando fetch
    const searchData = async() =>{
        let searchData = new FormData()
        searchData.append('search_cantantes', search_cantantes)

        try{
            const response = await fetch('./php/search_data.php', {
                method: 'POST',
                body: searchData
            });
            return response.json();

        }catch(error){
            alert(`${'Hubo un error: '}${error.message}`)
            console.log(error)
        }
    }

    //Mostrar los datos
    const showResults = () =>{
        searchData()
        .then(dataResults => {
            console.log(dataResults)

            tableContainer.innerHTML = ''
            if(typeof dataResults.data !== 'undefined' && !dataResults.data){
                errorsContainer.style.display = 'block'
                errorsContainer.querySelector('p').innerHTML = `No hay resultados: <span class="bold">${search_cantantes}</span>`
                resultsContainer.style.display = 'none'
            }else{
                resultsContainer.style.display = 'block'
                errorsContainer.style.display = 'none'
                for(const cantante of dataResults){
                    const row= document.createElement('tr')
                    row.innerHTML= ` 
                        <td>${cantante.id}</td>
                        <td>${cantante.first_name.toUpperCase().replace(search_cantantes, '<span class="bold">$&</span>')}</td>
                        <td>${cantante.last_name.toUpperCase().replace(search_cantantes, '<span class="bold">$&</span>')}</td>
                    `
                    tableContainer.appendChild(row)
                }
                
            }
        })
    }


})