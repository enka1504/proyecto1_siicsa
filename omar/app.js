document.addEventListener("DOMContentLoaded", () => {
  const signatureForm = document.getElementById("signatureForm");
  const signatureCanvas = document.getElementById("signatureCanvas");
  const clearButton = document.getElementById("clearButton");
  const signatureImage = document.getElementById("signatureImage");

  const signaturePad = new SignaturePad(signatureCanvas);

  clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    signaturePad.clear();
  });

  signatureForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    if (signaturePad.isEmpty()) {
      alert("Por favor, dibuja tu firma primero.");
    } else {
      const signatureData = signaturePad.toDataURL("image/png");
      signatureImage.src = signatureData;

      signaturePad.clear();

      fetch("http://appsiicsa.com/siicsa/api/orden-trabajo/1/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": data.csrfmiddlewaretoken,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.success) {
            alert("OK")
          }
        });
      // .then((response) => {
      //   if (!response.ok) {
      //     throw new Error("Error HTTP: " + response.status);
      //   }
      //   return response.json();
      // })
      // .then((data) => console.log(data))
      // .then((error) => console.log(error));
    }
  });
});
