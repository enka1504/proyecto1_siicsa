let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let area = urlParams.get("area");

window.addEventListener("DOMContentLoaded", async () => {
  const modelo = document.getElementById("modelo");
  const serie = document.getElementById("serie");
  const anio = document.getElementById("anio");
  const placas = document.getElementById("placas");
  const localizacion = document.getElementById("localizacion");
  const capacidad = document.getElementById("capacidad");
  const color = document.getElementById("color");
  const cardPanel = document.getElementById("card-panel");
  const id_area = document.getElementById("id_area");
  const fitroVeh = document.getElementById("filtroVeh");
  const vehiculoForm = document.getElementById("vehiculoForm");
  const etiquetasLabel = document.getElementsByTagName("label");

  const currentPage = window.location.pathname;

  if (currentPage === "/vehiculo" && area === null) {
    fitroVeh.addEventListener("click", async (e) => {
      e.preventDefault();
      let area_selected = id_area.value;
  
      window.location.href = `/vehiculo?area=${area_selected}`;
    })

    let vehiculos = [];
    const response = await fetch("/api/vehiculos");
    const data = await response.json();
    vehiculos = data;
    rendervehiculos(vehiculos);
    const count = await fetch("/api/vehiculos/count");
    const data2 = await count.json();
    const countvehiculos = document.getElementById("countvehiculos");
    countvehiculos.innerHTML = `${data2.count}`;

    function rendervehiculos(vehiculos) {
      const vehiculoList = document.getElementById("vehiculoList");

      vehiculos.forEach((vehiculo) => {
        const vehiculoItem = document.createElement("li");
        vehiculoItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">directions_car</i>${vehiculo.modelo}</div>
                  <div class="collapsible-body">
                      <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${vehiculo.id}"><i class="material-icons">visibility</i></a>
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${vehiculo.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${vehiculo.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${vehiculo.id}</td>
                              </tr>                              
                              <tr>
                                  <th>Modelo</th>
                                  <td>${vehiculo.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${vehiculo.serie}</td>
                              </tr>
                              <tr>
                                  <th>Año</th>
                                  <td>${vehiculo.anio}</td>
                              </tr>
                              <tr>
                                  <th>Color</th>
                                  <td>${vehiculo.color}</td>
                              </tr>
                              <tr>
                                  <th>Placas</th>
                                  <td>${vehiculo.placas}</td>
                              </tr>
                              <tr>
                                  <th>Capacidad</th>
                                  <td>${vehiculo.capacidad}</td>
                              </tr>                              
                              <tr>
                                  <th>Área</th>
                                  <td>${vehiculo.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
        vehiculoList.append(vehiculoItem);
      });
    }
  } else if (currentPage === "/vehiculo" && area !== null) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let area = urlParams.get("area");
    let vehiculos = [];
    const response = await fetch(`/api/vehiculos/area/${area}`);
    const data = await response.json();
    vehiculos = data;
    rendervehiculos(vehiculos);

    function rendervehiculos(vehiculos) {
      const vehiculoList = document.getElementById("vehiculoList");

      vehiculos.forEach((vehiculo) => {
        const vehiculoItem = document.createElement("li");
        vehiculoItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">directions_car</i>${vehiculo.modelo}</div>
                  <div class="collapsible-body">
                      <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${vehiculo.id}"><i class="material-icons">visibility</i></a>
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${vehiculo.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${vehiculo.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${vehiculo.id}</td>
                              </tr>                              
                              <tr>
                                  <th>Modelo</th>
                                  <td>${vehiculo.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${vehiculo.serie}</td>
                              </tr>
                              <tr>
                                  <th>Año</th>
                                  <td>${vehiculo.anio}</td>
                              </tr>
                              <tr>
                                  <th>Color</th>
                                  <td>${vehiculo.color}</td>
                              </tr>
                              <tr>
                                  <th>Placas</th>
                                  <td>${vehiculo.placas}</td>
                              </tr>
                              <tr>
                                  <th>Capacidad</th>
                                  <td>${vehiculo.capacidad}</td>
                              </tr>                              
                              <tr>
                                  <th>Área</th>
                                  <td>${vehiculo.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
        vehiculoList.append(vehiculoItem);
      });
    }
  } else if (currentPage === "/vehiculo/registro") {
    vehiculoForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (modelo.value === "") {
        cardPanel.innerHTML = `
        <div class="uk-alert-danger uk-alert" uk-alert="">
          <a class="uk-alert-close uk-icon uk-close" uk-close="">
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
              <line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
            </svg>
          </a>
          <ul class="errorlist browser-default">
            <li>
            Modelo
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (serie.value === "") {
        cardPanel.innerHTML = `
        <div class="uk-alert-danger uk-alert" uk-alert="">
          <a class="uk-alert-close uk-icon uk-close" uk-close="">
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
              <line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
            </svg>
          </a>
          <ul class="errorlist browser-default">
            <li>
            Serie
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (anio.value === "") {
        cardPanel.innerHTML = `
        <div class="uk-alert-danger uk-alert" uk-alert="">
          <a class="uk-alert-close uk-icon uk-close" uk-close="">
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
              <line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
            </svg>
          </a>
          <ul class="errorlist browser-default">
            <li>
            Año
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (placas.value === "") {
        cardPanel.innerHTML = `
        <div class="uk-alert-danger uk-alert" uk-alert="">
          <a class="uk-alert-close uk-icon uk-close" uk-close="">
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
              <line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
            </svg>
          </a>
          <ul class="errorlist browser-default">
            <li>
            Placa
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (localizacion.value === "") {
        cardPanel.innerHTML = `
        <div class="uk-alert-danger uk-alert" uk-alert="">
          <a class="uk-alert-close uk-icon uk-close" uk-close="">
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
              <line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
            </svg>
          </a>
          <ul class="errorlist browser-default">
            <li>
            Localizacion
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (capacidad.value === "") {
        cardPanel.innerHTML = `
        <div class="uk-alert-danger uk-alert" uk-alert="">
          <a class="uk-alert-close uk-icon uk-close" uk-close="">
            <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line>
              <line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line>
            </svg>
          </a>
          <ul class="errorlist browser-default">
            <li>
            Capacidad
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      } else {
        const modelo = vehiculoForm["modelo"].value;
        const serie = vehiculoForm["serie"].value;
        const anio = vehiculoForm["anio"].value;
        const color = vehiculoForm["color"].value;
        const placas = vehiculoForm["placas"].value;
        const localizacion = vehiculoForm["localizacion"].value;
        const capacidad = vehiculoForm["capacidad"].value;
        const id_area = vehiculoForm["id_area"].value;

        const response = await fetch("/api/vehiculos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelo,
            serie,
            anio,
            color,
            placas,
            localizacion,
            capacidad,
            id_area,
          }),
        });
        window.location.href = "/vehiculo";
      }
    });
  } else if (currentPage === "/vehiculo/editar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    for (let i = 0; i < etiquetasLabel.length; i++) {
      etiquetasLabel[i].classList.add("active");
    }
    let vehiculos = [];
    const response = await fetch(`/api/vehiculos/${id}`);
    const data = await response.json();
    vehiculos = data;
    console.log(vehiculos);

    for (let i = 0; i < color.options.length; i++) {
      if (
        color.options[i].textContent.trim() === vehiculos.color.trim()
      ) {
        color.options[i].selected = true;
        break;
      }
    }
    modelo.value = vehiculos.modelo;
    serie.value = vehiculos.serie;
    anio.value = vehiculos.anio;
    placas.value = vehiculos.placas;
    localizacion.value = vehiculos.localizacion;
    capacidad.value = vehiculos.capacidad;
    id_area.value = vehiculos.id_area;

    vehiculoForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const modelo = vehiculoForm["modelo"].value;
      const serie = vehiculoForm["serie"].value;
      const anio = vehiculoForm["anio"].value;
      const color = vehiculoForm["color"].value;
      const placas = vehiculoForm["placas"].value;
      const localizacion = vehiculoForm["localizacion"].value;
      const capacidad = vehiculoForm["capacidad"].value;
      const id_area = vehiculoForm["id_area"].value;

      const response = await fetch(`/api/vehiculos/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelo,
          serie,
          anio,
          color,
          placas,
          localizacion,
          capacidad,
          id_area,
        }),
      });
      const data = await response.json();
      window.location.href = "/vehiculo";
    });
  } else if (currentPage === "/vehiculo/eliminar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

    let vehiculos = [];
    const response = await fetch("/api/vehiculos");
    const data = await response.json();
    vehiculos = data;

    const btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", async () => {
      const response = await fetch(`/api/vehiculos/eliminar/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      vehiculos = vehiculos.filter((vehiculo) => vehiculo.id !== data.id);

      window.location.href = "/vehiculo";
    });
  } else if (currentPage === "/vehiculo/detalle") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    let vehiculos = [];
    const response = await fetch(`/api/vehiculos/${id}`);
    const data = await response.json();
    vehiculos = data;
    const vehiculoList = document.getElementById("vehiculoList");
    const vehiculoItem = document.createElement("li");
    vehiculoItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">directions_car</i>${vehiculos.modelo}</div>
                  <div class="collapsible-body" style="display: block;">
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${vehiculos.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${vehiculos.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${vehiculos.id}</td>
                              </tr>                              
                              <tr>
                                  <th>Modelo</th>
                                  <td>${vehiculos.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${vehiculos.serie}</td>
                              </tr>
                              <tr>
                                  <th>Año</th>
                                  <td>${vehiculos.anio}</td>
                              </tr>
                              <tr>
                                  <th>Color</th>
                                  <td>${vehiculos.color}</td>
                              </tr>
                              <tr>
                                  <th>Placas</th>
                                  <td>${vehiculos.placas}</td>
                              </tr>
                              <tr>
                                  <th>Capacidad</th>
                                  <td>${vehiculos.capacidad}</td>
                              </tr>                              
                              <tr>
                                  <th>Área</th>
                                  <td>${vehiculos.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
    vehiculoList.append(vehiculoItem);
  }
});
