document.addEventListener("DOMContentLoaded", () => {
  const signatureCanvas = document.getElementById("signatureCanvas");
  const clearButton = document.getElementById("clearButton");
  const saveButton = document.getElementById("saveButton");
  const signatureImage = document.getElementById("signatureImage");

  const signaturePad = new SignaturePad(signatureCanvas);

  clearButton.addEventListener("click", () => signaturePad.clear());

  saveButton.addEventListener("click", () => {
    if (signaturePad.isEmpty()) {
      alert("Por favor, dibuja tu firma primero.");
    } else {
      const signatureData = signaturePad.toDataURL("image/png");

      signatureImage.src = signatureData;

      const data = {
        firmaCliente: signatureData,
      };

      // console.log(JSON.stringify(data));

      fetch("http://appsiicsa.com/siicsa/api/orden-trabajo/6/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
          }

          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  });
});
