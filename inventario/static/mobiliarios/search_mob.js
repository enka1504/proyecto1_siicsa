window.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('search');
    const general = document.getElementById('general');
    const tableContainer = document.getElementById('results tbody')
    const resultsContainer = document.getElementById('resultsContainer')
    const errorsContainer = document.getElementById('errors-container')
    let tipo_mob_with_wildcards = ''
    
    
    if (search){
        search.addEventListener('input', event =>{
            tipo_mob_with_wildcards = event.target.value.toLowerCase()
            showResults()
        })
        
    }

    const searchData = async() =>{
        let searchData = new FormData()
        searchData.append('tipo_mob_with_wildcards', tipo_mob_with_wildcards)

        try{
            const response = await fetch(`/api/area/mob/${tipo_mob_with_wildcards}`, {
                method: 'POST',
                body: searchData
            });
            return response.json();

        }catch(error){
            alert(`${'Hubo un error: '}${error.message}`);
            console.log(error)
        }
    }

    const showResults = () =>{
        searchData()
        .then(dataResults => {
            console.log(dataResults)
            console.log(tipo_mob_with_wildcards)
            if(typeof dataResults !== 'undefined' && !dataResults){
                errorsContainer.style.display = 'block'
                errorsContainer.querySelector('p').innerHTML = `No hay resultados: <span class="bold">${dataResults}</span>`
                resultsContainer.style.display = 'none';
                general.style.display = 'none';
            }else{
                
                errorsContainer.style.display = 'none';
                general.style.display = 'none';
                for(const mobiliario of dataResults){
                    const row= document.createElement('tr')
                    row.innerHTML = ` 
                        <td>${mobiliario.id}</td>
                        <td>${mobiliario.tipo_mob}</td>
                        <td>${mobiliario.id_area}</td>
                    `
                    console.log(row)
                }          
            }
        })
    }
    showResults()
})