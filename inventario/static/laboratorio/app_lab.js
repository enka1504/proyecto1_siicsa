let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let area = urlParams.get("area");

window.addEventListener("DOMContentLoaded", async () => {
  const nombre = document.getElementById("nombre");
  const modelo = document.getElementById("modelo");
  const serie = document.getElementById("serie");
  const ubicacion = document.getElementById("ubicacion");
  const tipo_mantenimiento = document.getElementById("tipo_mantenimiento");
  const alcance_medicion = document.getElementById("alcance_medicion");
  const resolucion = document.getElementById("resolucion");
  const incertidumbre = document.getElementById("incertidumbre");
  const cardPanel = document.getElementById("card-panel");
  const fitroLab = document.getElementById("filtroLab");
  const id_area = document.getElementById("id_area");
  const equipoForm = document.getElementById("equipoForm");
  const etiquetasLabel = document.getElementsByTagName("label");

  const currentPage = window.location.pathname;

  if (currentPage === "/laboratorio" && area === null) {
    fitroLab.addEventListener("click", async (e) => {
      e.preventDefault();
      let area_selected = id_area.value;
  
      window.location.href = `/laboratorio?area=${area_selected}`;
    })
    let equipos = [];
    const response = await fetch("/api/equipos_lab");
    const data = await response.json();
    equipos = data;
    renderEquipos(equipos);
    const count = await fetch("/api/equipos_lab/count");
    const data2 = await count.json();
    const countEquipos = document.querySelector("#countequipos");
    countEquipos.innerHTML = `${data2.count}`;

    function renderEquipos(equipos) {
      const equipo_labList = document.getElementById("equipo_labList");

      equipos.forEach((equipo) => {
        const equipoItem = document.createElement("li");
        equipoItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">build</i>${equipo.nombre}</div>
                  <div class="collapsible-body">
                      <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${equipo.id}"><i class="material-icons">visibility</i></a>
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${equipo.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${equipo.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${equipo.id}</td>
                              </tr>
                              <tr>
                                  <th>Nombre</th>
                                  <td>${equipo.nombre}</td>
                              </tr>
                              <tr>
                                  <th>Modelo</th>
                                  <td>${equipo.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${equipo.serie}</td>
                              </tr>
                              <tr>
                                  <th>Ubicación</th>
                                  <td>${equipo.ubicacion}</td>
                              </tr>
                              <tr>
                                  <th>Tipo de Mantenimiento</th>
                                  <td>${equipo.tipo_mantenimiento}</td>
                              </tr>
                              <tr>
                                  <th>Alcance de Medición</th>
                                  <td>${equipo.alcance_medicion}</td>
                              </tr>
                              <tr>
                                  <th>Resolución</th>
                                  <td>${equipo.resolucion}</td>
                              </tr>
                              
                              <tr>
                                  <th>Incertidumbre</th>
                                  <td>${equipo.incertidumbre}</td>
                              </tr>
                              <tr>
                                  <th>Área</th>
                                  <td>${equipo.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
        equipo_labList.append(equipoItem);
      });
    }
  } else if (currentPage === "/laboratorio" && area !== null) {
    let equipos = [];
    const response = await fetch(`/api/equipos_lab/area/${area}`);
    const data = await response.json();
    equipos = data;
    renderEquipos(equipos);

    function renderEquipos(equipos) {
      const equipo_labList = document.getElementById("equipo_labList");

      equipos.forEach((equipo) => {
        const equipoItem = document.createElement("li");
        equipoItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">build</i>${equipo.nombre}</div>
                  <div class="collapsible-body">
                      <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${equipo.id}"><i class="material-icons">visibility</i></a>
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${equipo.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${equipo.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${equipo.id}</td>
                              </tr>
                              <tr>
                                  <th>Nombre</th>
                                  <td>${equipo.nombre}</td>
                              </tr>
                              <tr>
                                  <th>Modelo</th>
                                  <td>${equipo.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${equipo.serie}</td>
                              </tr>
                              <tr>
                                  <th>Ubicación</th>
                                  <td>${equipo.ubicacion}</td>
                              </tr>
                              <tr>
                                  <th>Tipo de Mantenimiento</th>
                                  <td>${equipo.tipo_mantenimiento}</td>
                              </tr>
                              <tr>
                                  <th>Alcance de Medición</th>
                                  <td>${equipo.alcance_medicion}</td>
                              </tr>
                              <tr>
                                  <th>Resolución</th>
                                  <td>${equipo.resolucion}</td>
                              </tr>
                              
                              <tr>
                                  <th>Incertidumbre</th>
                                  <td>${equipo.incertidumbre}</td>
                              </tr>
                              <tr>
                                  <th>Área</th>
                                  <td>${equipo.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
        equipo_labList.append(equipoItem);
      });
    }
  } else if (currentPage === "/laboratorio/registro") {
    const equipoForm = document.getElementById("equipoForm");
    equipoForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (nombre.value === "" || /^\d+$/.test(nombre.value)) {
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
            Nombre
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio y no puede contener números.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (modelo.value === "" || /^\d+$/.test(modelo.value)) {
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
      if (
        tipo_mantenimiento.value === "" ||
        /^\d+$/.test(tipo_mantenimiento.value)
      ) {
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
            Tipo de Mantenimiento
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio y no puede contener números.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (alcance_medicion.value === "") {
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
            Alcance de medición
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (resolucion.value === "") {
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
            Resolución
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      }
      if (incertidumbre.value === "") {
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
            Incertidumbre
              <ul class="errorlist browser-default">
                <li>Este campo es obligatorio.</li>
              </ul>
            </li>
          </ul>
        </div>
        `;
      } else {
        const nombre = equipoForm["nombre"].value;
        const modelo = equipoForm["modelo"].value;
        const serie = equipoForm["serie"].value;
        const ubicacion = equipoForm["ubicacion"].value;
        const tipo_mantenimiento = equipoForm["tipo_mantenimiento"].value;
        const alcance_medicion = equipoForm["alcance_medicion"].value;
        const resolucion = equipoForm["resolucion"].value;
        const incertidumbre = equipoForm["incertidumbre"].value;
        const id_area = equipoForm["id_area"].value;

        const response = await fetch("/api/equipos_lab", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            modelo,
            serie,
            ubicacion,
            tipo_mantenimiento,
            alcance_medicion,
            resolucion,
            incertidumbre,
            id_area,
          }),
        });
        window.location.href = "/laboratorio";
      }
    });
  } else if (currentPage === "/laboratorio/editar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    let equipos = [];
    const response = await fetch(`/api/equipos_lab/${id}`);
    const data = await response.json();
    equipos = data;
    for (let i = 0; i < etiquetasLabel.length; i++) {
      etiquetasLabel[i].classList.add("active");
    }

    nombre.value = equipos.nombre;
    modelo.value = equipos.modelo;
    serie.value = equipos.serie;
    ubicacion.value = equipos.ubicacion;
    tipo_mantenimiento.value = equipos.tipo_mantenimiento;
    alcance_medicion.value = equipos.alcance_medicion;
    resolucion.value = equipos.resolucion;
    incertidumbre.value = equipos.incertidumbre;
    id_area.value = equipos.id_area;

    equipoForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = equipoForm["nombre"].value;
      const modelo = equipoForm["modelo"].value;
      const serie = equipoForm["serie"].value;
      const ubicacion = equipoForm["ubicacion"].value;
      const tipo_mantenimiento = equipoForm["tipo_mantenimiento"].value;
      const alcance_medicion = equipoForm["alcance_medicion"].value;
      const resolucion = equipoForm["resolucion"].value;
      const incertidumbre = equipoForm["incertidumbre"].value;
      const id_area = equipoForm["id_area"].value;

      const response = await fetch(`/api/equipos_lab/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          modelo,
          serie,
          ubicacion,
          tipo_mantenimiento,
          alcance_medicion,
          resolucion,
          incertidumbre,
          id_area,
        }),
      });
      window.location.href = "/laboratorio";
    });
  } else if (currentPage === "/laboratorio/eliminar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    let equipos = [];
    const response = await fetch("/api/equipos_lab");
    const data = await response.json();
    equipos = data;

    const btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", async (e) => {
      const response = await fetch(`/api/equipos_lab/eliminar/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      equipos = equipos.filter((equipo) => equipo.id !== data.id);

      window.location.href = "/laboratorio";
    });
  } else if (currentPage === "/laboratorio/detalle") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    let equipos = [];
    const response = await fetch(`/api/equipos_lab/${id}`);
    const data = await response.json();
    equipos = data;
    const equipo_labList = document.getElementById("equipo_labList");
    const equipoItem = document.createElement("li");
    equipoItem.innerHTML = `
              <div class="collapsible-header" tabindex="0"><i class="material-icons">build</i>${equipos.nombre}</div>
                  <div class="collapsible-body" style="display: block;">
                      <a class="btn-small right brown-back" href="${currentPage}/editar?id=${equipos.id}"><i class="material-icons">edit</i></a>
                      <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${equipos.id}"><i class="material-icons">delete</i></a>
                      <table class="striped">
                          <tbody>
                              <tr>
                                  <th>Id</th>
                                  <td>${equipos.id}</td>
                              </tr>
                              <tr>
                                  <th>Nombre</th>
                                  <td>${equipos.nombre}</td>
                              </tr>
                              <tr>
                                  <th>Modelo</th>
                                  <td>${equipos.modelo}</td>
                              </tr>
                              <tr>
                                  <th>Serie</th>
                                  <td>${equipos.serie}</td>
                              </tr>
                              <tr>
                                  <th>Ubicación</th>
                                  <td>${equipos.ubicacion}</td>
                              </tr>
                              <tr>
                                  <th>Tipo de Mantenimiento</th>
                                  <td>${equipos.tipo_mantenimiento}</td>
                              </tr>
                              <tr>
                                  <th>Alcance de Medición</th>
                                  <td>${equipos.alcance_medicion}</td>
                              </tr>
                              <tr>
                                  <th>Resolución</th>
                                  <td>${equipos.resolucion}</td>
                              </tr>
                              
                              <tr>
                                  <th>Incertidumbre</th>
                                  <td>${equipos.incertidumbre}</td>
                              </tr>
                              <tr>
                                  <th>Área</th>
                                  <td>${equipos.nombre_area}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
    equipo_labList.append(equipoItem);
  }
});
