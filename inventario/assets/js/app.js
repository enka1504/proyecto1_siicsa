document.addEventListener("DOMContentLoaded", () => {
  const stuffForm = document.getElementById("stuff-form");
  const container = document.getElementById("container");
  const closeFormBtn = document.getElementById("close-form");
  const furntBtn = document.getElementById("furnt-btn");
  const carsBtn = document.getElementById("cars-btn");
  const mediaBtn = document.getElementById("media-btn");
  const labBtn = document.getElementById("lab-btn");
  const titleForm = document.getElementById("title-form");
  const furntForm = document.getElementById("furnt-form");
  const carsForm = document.getElementById("cars-form");
  const mediaForm = document.getElementById("media-form");
  const labForm = document.getElementById("lab-form");

  const handleFormDisplay = (title, form) => {
    titleForm.textContent = title;
    stuffForm.style.display = "flex";
    container.style.display = "none";
    furntForm.style.display = "none";
    carsForm.style.display = "none";
    mediaForm.style.display = "none";
    labForm.style.display = "none";
    form.style.display = "flex";
  };

  closeFormBtn.addEventListener("click", () => {
    stuffForm.style.display = "none";
    container.style.display = "flex";
  });

  furntBtn.addEventListener("click", () => {
    handleFormDisplay("MOBILIARIO", furntForm);
  });

  carsBtn.addEventListener("click", () => {
    handleFormDisplay("VEHÍCULOS", carsForm);
  });

  mediaBtn.addEventListener("click", () => {
    handleFormDisplay("COMPUTO Y MULTIMEDIA", mediaForm);
  });

  labBtn.addEventListener("click", () => {
    handleFormDisplay("EQUIPOS DE LABORATORIO", labForm);
  });
});
