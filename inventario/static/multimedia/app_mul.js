let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let tipo = urlParams.get("tipo");
let area = urlParams.get("area");

window.addEventListener("DOMContentLoaded", async () => {
  const modelo = document.getElementById("modelo");
  const serie = document.getElementById("serie");
  const ubicacion = document.getElementById("ubicacion");
  const descripcion = document.getElementById("descripcion");
  const estado = document.getElementById("estado");
  const especificaciones = document.getElementById("especificaciones");
  const fecha_adquisicion = document.getElementById("fecha_adquisicion");
  const fecha_mantenimiento = document.getElementById("fecha_mantenimiento");
  const cardPanel = document.getElementById("card-panel");
  const fitroMul = document.getElementById("filtroMul");
  const id_area = document.getElementById("id_area");
  const id_tipo = document.getElementById("id_tipo");
  const multimediaForm = document.getElementById("multimediaForm");
  const etiquetasLabel = document.getElementsByTagName("label");

  const currentPage = window.location.pathname;

  if (currentPage === "/multimedia" && tipo === null) {
    fitroMul.addEventListener("click", async (e) => {
      e.preventDefault();
      let tipo_selected = id_tipo.value;
      let area_selected = id_area.value;
  
      window.location.href = `/multimedia?tipo=${tipo_selected}&area=${area_selected}`;
    })

    let multimedias = [];
    const response = await fetch("/api/multimedias");
    const data = await response.json();
    multimedias = data;
    renderMultimedias(multimedias);
    const count = await fetch("/api/multimedias/count");
    const data2 = await count.json();
    const countmultimedias = document.querySelector("#countmultimedia");
    countmultimedias.innerHTML = `${data2.count}`;

    function renderMultimedias(multimedias) {
      const multimediaList = document.getElementById("multimediaList");

      multimedias.forEach((multimedia) => {
        const multimediaItem = document.createElement("li");
        multimediaItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">devices_other</i>${multimedia.tipo}</div>
                  <div class="collapsible-body">
                      <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${multimedia.id}"><i class="material-icons">visibility</i></a>
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${multimedia.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${multimedia.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${multimedia.id}</td>
                              </tr>
                              <tr>
                                  <th>Tipo</th>
                                  <td>${multimedia.tipo}</td>
                              </tr>
                              <tr>
                                  <th>Modelo</th>
                                  <td>${multimedia.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${multimedia.serie}</td>
                              </tr>
                              <tr>
                                  <th>Descripción</th>
                                  <td>${multimedia.descripcion}</td>
                              </tr>
                              <tr>
                                  <th>Fecha de Adquisición</th>
                                  <td>${multimedia.fecha_adquisicion}</td>
                              </tr>
                              <tr>
                                  <th>Estado</th>
                                  <td>${multimedia.estado}</td>
                              </tr>
                              <tr>
                                  <th>Ubicación</th>
                                  <td>${multimedia.ubicacion}</td>
                              </tr>
                              <tr>
                                  <th>Especifícaciones</th>
                                  <td>${multimedia.especificaciones}</td>
                              </tr>
                              <tr>
                                  <th>Último Mantenimineto</th>
                                  <td>${multimedia.fecha_mantenimiento}</td>
                              </tr>
                              <tr>
                                  <th>Área</th>
                                  <td>${multimedia.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
        multimediaList.append(multimediaItem);
      });
    }
  } else if (currentPage === "/multimedia" && tipo !== null || area !== null) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let tipo = urlParams.get("tipo");
    let area = urlParams.get("area");
    let multimedias = [];
    if (tipo !== "" && area !== "") {
      const response = await fetch(`/api/multimedias/tipoyarea/${tipo}/${area}`);
      const data = await response.json();
      multimedias = data;
    } else if (tipo !== "" && area === "") {
      const response = await fetch(`/api/multimedias/tipo/${tipo}`);
      const data = await response.json();
      multimedias = data;
    } else if (area !== "" && tipo === "") {
      const response = await fetch(`/api/multimedias/area/${area}`);
      const data = await response.json();
      multimedias = data;
    }
    renderMultimedias(multimedias);

    function renderMultimedias(multimedias) {
      const multimediaList = document.getElementById("multimediaList");

      multimedias.forEach((multimedia) => {
        const multimediaItem = document.createElement("li");
        multimediaItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">devices_other</i>${multimedia.tipo}</div>
                  <div class="collapsible-body">
                      <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${multimedia.id}"><i class="material-icons">visibility</i></a>
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${multimedia.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${multimedia.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${multimedia.id}</td>
                              </tr>
                              <tr>
                                  <th>Tipo</th>
                                  <td>${multimedia.tipo}</td>
                              </tr>
                              <tr>
                                  <th>Modelo</th>
                                  <td>${multimedia.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${multimedia.serie}</td>
                              </tr>
                              <tr>
                                  <th>Descripción</th>
                                  <td>${multimedia.descripcion}</td>
                              </tr>
                              <tr>
                                  <th>Fecha de Adquisición</th>
                                  <td>${multimedia.fecha_adquisicion}</td>
                              </tr>
                              <tr>
                                  <th>Estado</th>
                                  <td>${multimedia.estado}</td>
                              </tr>
                              <tr>
                                  <th>Ubicación</th>
                                  <td>${multimedia.ubicacion}</td>
                              </tr>
                              <tr>
                                  <th>Especifícaciones</th>
                                  <td>${multimedia.especificaciones}</td>
                              </tr>
                              <tr>
                                  <th>Último Mantenimineto</th>
                                  <td>${multimedia.fecha_mantenimiento}</td>
                              </tr>
                              <tr>
                                  <th>Área</th>
                                  <td>${multimedia.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
        multimediaList.append(multimediaItem);
      });
    }
  } else if (currentPage === "/multimedia/registro") {
    const multimediaForm = document.querySelector("#multimediaForm");
    multimediaForm.addEventListener("submit", async (e) => {
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
      if (ubicacion.value === "") {
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
            Ubicación
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (descripcion.value === "") {
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
            Descripción
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (estado.value === "" || /^\d+$/.test(estado.value)) {
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
                <li>Este campo es obligatorio y no puede contener números.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (especificaciones.value === "") {
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
      if (fecha_adquisicion.value === "") {
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
      if (fecha_mantenimiento.value === "") {
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
      } else {
        const tipo = multimediaForm["tipo"].value;
        const modelo = multimediaForm["modelo"].value;
        const serie = multimediaForm["serie"].value;
        const ubicacion = multimediaForm["ubicacion"].value;
        const descripcion = multimediaForm["descripcion"].value;
        const estado = multimediaForm["estado"].value;
        const especificaciones = multimediaForm["especificaciones"].value;
        const fecha_adquisicion = multimediaForm["fecha_adquisicion"].value;
        const fecha_mantenimiento = multimediaForm["fecha_mantenimiento"].value;
        const id_area = multimediaForm["id_area"].value;

        const response = await fetch("/api/multimedias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo,
            modelo,
            serie,
            ubicacion,
            descripcion,
            estado,
            especificaciones,
            fecha_adquisicion,
            fecha_mantenimiento,
            id_area,
          }),
        });
        window.location.href = "/multimedia";
      }
    });
  } else if (currentPage === "/multimedia/editar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    for (let i = 0; i < etiquetasLabel.length; i++) {
      etiquetasLabel[i].classList.add("active");
    }
    let multimedias = [];
    const response = await fetch(`/api/multimedias/${id}`);
    const data = await response.json();
    multimedias = data;
    console.log(multimedias);
    for (let i = 0; i < id_tipo.options.length; i++) {
      console.log(id_tipo.options[i].textContent);
      if (
        id_tipo.options[i].textContent.trim() === multimedias.tipo.trim()
      ) {
        id_tipo.options[i].selected = true;
        break;
      }
    }
    modelo.value = multimedias.modelo;
    serie.value = multimedias.serie;
    ubicacion.value = multimedias.ubicacion;
    descripcion.value = multimedias.descripcion;
    estado.value = multimedias.estado;
    especificaciones.value = multimedias.especificaciones;
    fecha_adquisicion.value = multimedias.fecha_adquisicion;
    fecha_mantenimiento.value = multimedias.fecha_mantenimiento;
    id_area.value = multimedias.id_area;

    multimediaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id_tipo = multimediaForm["id_tipo"].value;
      const modelo = multimediaForm["modelo"].value;
      const serie = multimediaForm["serie"].value;
      const ubicacion = multimediaForm["ubicacion"].value;
      const descripcion = multimediaForm["descripcion"].value;
      const estado = multimediaForm["estado"].value;
      const especificaciones = multimediaForm["especificaciones"].value;
      const fecha_adquisicion = multimediaForm["fecha_adquisicion"].value;
      const fecha_mantenimiento = multimediaForm["fecha_mantenimiento"].value;
      const id_area = multimediaForm["id_area"].value;

      const response = await fetch(`/api/multimedias/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tipo,
          modelo,
          serie,
          ubicacion,
          descripcion,
          estado,
          especificaciones,
          fecha_adquisicion,
          fecha_mantenimiento,
          id_area,
        }),
      });
      const data = await response.json();
      window.location.href = "/multimedia";
    });
  } else if (currentPage === "/multimedia/eliminar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

    let multimedias = [];
    const response = await fetch("/api/multimedias");
    const data = await response.json();
    multimedias = data;

    const btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", async () => {
      const response = await fetch(`/api/multimedias/eliminar/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      multimedias = multimedias.filter(
        (multimedia) => multimedia.id !== data.id
      );

      window.location.href = "/multimedia";
    });
  } else if (currentPage === "/multimedia/detalle") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    let multimedias = [];
    const response = await fetch(`/api/multimedias/${id}`);
    const data = await response.json();
    multimedias = data;
    const multimediaList = document.getElementById("multimediaList");
    const multimediaItem = document.createElement("li");
      multimediaItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">devices_other</i>${multimedias.tipo}</div>
                  <div class="collapsible-body" style="display: block;">
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${multimedias.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${multimedias.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${multimedias.id}</td>
                              </tr>
                              <tr>
                                  <th>Tipo</th>
                                  <td>${multimedias.tipo}</td>
                              </tr>
                              <tr>
                                  <th>Modelo</th>
                                  <td>${multimedias.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${multimedias.serie}</td>
                              </tr>
                              <tr>
                                  <th>Descripción</th>
                                  <td>${multimedias.descripcion}</td>
                              </tr>
                              <tr>
                                  <th>Fecha de Adquisición</th>
                                  <td>${multimedias.fecha_adquisicion}</td>
                              </tr>
                              <tr>
                                  <th>Estado</th>
                                  <td>${multimedias.estado}</td>
                              </tr>
                              <tr>
                                  <th>Ubicación</th>
                                  <td>${multimedias.ubicacion}</td>
                              </tr>
                              <tr>
                                  <th>Especifícaciones</th>
                                  <td>${multimedias.especificaciones}</td>
                              </tr>
                              <tr>
                                  <th>Último Mantenimineto</th>
                                  <td>${multimedias.fecha_mantenimiento}</td>
                              </tr>
                              <tr>
                                  <th>Área</th>
                                  <td>${multimedias.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
      multimediaList.append(multimediaItem);
  }
});
