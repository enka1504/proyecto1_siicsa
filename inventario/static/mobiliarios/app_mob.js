let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let tipo = urlParams.get("tipo");
let area = urlParams.get("area");

window.addEventListener("DOMContentLoaded", async () => {
  const tipo_mob = document.getElementById("tipo_mob");
  const modelo = document.getElementById("modelo");
  const cardPanel = document.getElementById("card-panel");
  const fitroMob = document.getElementById("filtroMob");
  const id_area = document.getElementById("id_area");
  const id_tipo = document.getElementById("id_tipo");
  const otro = document.getElementById("otro");
  const etiquetasLabel = document.getElementsByTagName("label");

  const currentPage = window.location.pathname;

  if (currentPage === "/mobiliario" && tipo === null) {
    fitroMob.addEventListener("click", async (e) => {
      e.preventDefault();
      let tipo_selected = id_tipo.value;
      let area_selected = id_area.value;

      window.location.href = `/mobiliario?tipo=${tipo_selected}&area=${area_selected}`;
    });

    let mobiliarios = [];
    const response = await fetch("/api/mobiliarios");
    const data = await response.json();
    mobiliarios = data;
    renderMobiliarios(mobiliarios);
    const count = await fetch("/api/mobiliarios/count");
    const data2 = await count.json();
    const countmobiliarios = document.querySelector("#countmobiliarios");
    countmobiliarios.innerHTML = `${data2.count}`;

    function renderMobiliarios(mobiliarios) {
      const mobiliarioList = document.getElementById("mobiliarioList");

      mobiliarios.forEach((mobiliario) => {
        const mobiliarioItem = document.createElement("li");
        mobiliarioItem.innerHTML = `
            <div class="collapsible-header" tabindex="0"><i class="material-icons">event_seat</i>${mobiliario.tipo_mob}</div>
                <div class="collapsible-body">
                    <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${mobiliario.id}"><i class="material-icons">visibility</i></a>
                    <a class="btn-small right brown-back" href="${currentPage}/editar?id=${mobiliario.id}"><i class="material-icons">edit</i></a>
                    <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${mobiliario.id}"><i class="material-icons">delete</i></a>
                    <table class="striped">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>${mobiliario.id}</td>
                            </tr>
                            <tr>
                                <th>Tipo de mobiliario</th>
                                <td>${mobiliario.tipo_mob}</td>
                            </tr>
                            <tr>
                                <th>Modelo</th>
                                <td>${mobiliario.modelo}</td>
                            </tr>
                            <tr>
                                <th>Otro</th>
                                <td>${mobiliario.otro}</td>
                            </tr>
                            <tr>
                                <th>Área</th>
                                <td>${mobiliario.nombre_area}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        mobiliarioList.append(mobiliarioItem);
      });
    }
  } else if (
    (currentPage === "/mobiliario" && tipo !== null) ||
    area !== null
  ) {
    fitroMob.addEventListener("click", async (e) => {
      e.preventDefault();
      let tipo_selected = id_tipo.value;
      let area_selected = id_area.value;

      window.location.href = `/mobiliario?tipo=${tipo_selected}&area=${area_selected}`;
    });

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let tipo = urlParams.get("tipo");
    let area = urlParams.get("area");
    let mobiliarios = [];
    if (tipo !== "" && area !== "") {
      const response = await fetch(
        `/api/mobiliarios/tipoyarea/${tipo}/${area}`
      );
      const data = await response.json();
      mobiliarios = data;
    } else if (tipo !== "" && area === "") {
      const response = await fetch(`/api/mobiliarios/tipo/${tipo}`);
      const data = await response.json();
      mobiliarios = data;
    } else if (area !== "" && tipo === "") {
      const response = await fetch(`/api/mobiliarios/area/${area}`);
      const data = await response.json();
      mobiliarios = data;
    }

    renderMobiliarios(mobiliarios);

    function renderMobiliarios(mobiliarios) {
      const mobiliarioList = document.getElementById("mobiliarioList");

      mobiliarios.forEach((mobiliario) => {
        const mobiliarioItem = document.createElement("li");
        mobiliarioItem.innerHTML = `
            <div class="collapsible-header" tabindex="0"><i class="material-icons">event_seat</i>${mobiliario.tipo_mob}</div>
                <div class="collapsible-body">
                    <a class="btn-small right brown-back" href="${currentPage}/detalle?id=${mobiliario.id}"><i class="material-icons">visibility</i></a>
                    <a class="btn-small right brown-back" href="${currentPage}/editar?id=${mobiliario.id}"><i class="material-icons">edit</i></a>
                    <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${mobiliario.id}"><i class="material-icons">delete</i></a>
                    <table class="striped">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>${mobiliario.id}</td>
                            </tr>
                            <tr>
                                <th>Tipo de mobiliario</th>
                                <td>${mobiliario.tipo_mob}</td>
                            </tr>
                            <tr>
                                <th>Modelo</th>
                                <td>${mobiliario.modelo}</td>
                            </tr>
                            <tr>
                                <th>Otro</th>
                                <td>${mobiliario.otro}</td>
                            </tr>
                            <tr>
                                <th>Área</th>
                                <td>${mobiliario.nombre_area}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        mobiliarioList.append(mobiliarioItem);
      });
    }
  } else if (currentPage === "/mobiliario/registro") {
    const mobiForm = document.querySelector("#mobiForm");
    mobiForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (tipo_mob.value === "" || /^\d+$/.test(tipo_mob.value)) {
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
      } else {
        const tipo_mob = mobiForm["tipo_mob"].value;
        const modelo = mobiForm["modelo"].value;
        const otro = mobiForm["otro"].value;
        const id_area = mobiForm["id_area"].value;

        const response = await fetch("/api/mobiliarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo_mob,
            modelo,
            otro,
            id_area,
          }),
        });
        window.location.href = "/mobiliario";
      }
    });
  } else if (currentPage === "/mobiliario/editar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    for (let i = 0; i < etiquetasLabel.length; i++) {
      etiquetasLabel[i].classList.add("active");
    }
    let mobiliarios = [];
    const response = await fetch(`/api/mobiliarios/${id}`);
    const data = await response.json();
    mobiliarios = data;
    for (let i = 0; i < tipo_mob.options.length; i++) {
      console.log(tipo_mob.options[i].textContent);
      if (
        tipo_mob.options[i].textContent.trim() === mobiliarios.tipo_mob.trim()
      ) {
        tipo_mob.options[i].selected = true;
        break;
      }
    }
    modelo.value = mobiliarios.modelo;
    otro.value = mobiliarios.otro;
    id_area.value = mobiliarios.id_area;
    mobiForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const tipo_mob = mobiForm["tipo_mob"].value;
      const modelo = mobiForm["modelo"].value;
      const otro = mobiForm["otro"].value;
      const id_area = mobiForm["id_area"].value;

      const response = await fetch(`/api/mobiliarios/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo_mob,
          modelo,
          otro,
          id_area,
        }),
      });
      window.location.href = "/mobiliario";
    });
  } else if (currentPage === "/mobiliario/eliminar") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

    let mobiliarios = [];
    const response = await fetch("/api/mobiliarios");
    const data = await response.json();
    mobiliarios = data;

    const btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", async () => {
      const response = await fetch(`/api/mobiliarios/eliminar/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      mobiliarios = mobiliarios.filter(
        (mobiliario) => mobiliario.id !== data.id
      );

      window.location.href = "/mobiliario";
    });
  } else if (currentPage === "/mobiliario/detalle") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");
    let mobiliarios = [];
    const response = await fetch(`/api/mobiliarios/${id}`);
    const data = await response.json();
    mobiliarios = data;
    const mobiliarioList = document.getElementById("mobiliarioList");
    const mobiliarioItem = document.createElement("li");
    mobiliarioItem.innerHTML = `
            <div class="collapsible-header" tabindex="0"><i class="material-icons">event_seat</i>${mobiliarios.tipo_mob}</div>
                <div class="collapsible-body" style="display: block;">
                    <a class="btn-small right brown-back" href="${currentPage}/editar?id=${mobiliarios.id}"><i class="material-icons">edit</i></a>
                    <a class="btn-small right red accent-4" href="${currentPage}/eliminar?id=${mobiliarios.id}"><i class="material-icons">delete</i></a>
                    <table class="striped">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>${mobiliarios.id}</td>
                            </tr>
                            <tr>
                                <th>Tipo de mobiliario</th>
                                <td>${mobiliarios.tipo_mob}</td>
                            </tr>
                            <tr>
                                <th>Modelo</th>
                                <td>${mobiliarios.modelo}</td>
                            </tr>
                            <tr>
                                <th>Otro</th>
                                <td>${mobiliarios.otro}</td>
                            </tr>
                            <tr>
                                <th>Área</th>
                                <td>${mobiliarios.nombre_area}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
    mobiliarioList.append(mobiliarioItem);
  }
});
