document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const clearButton = document.querySelector("#clear-button");
  const deleteButton = document.querySelector("#delete-button");
  const saveButton = document.querySelector(".save-button");
  const ctx = canvas.getContext("2d");
  const img = document.getElementById("img");
  let writingMode = false;

  saveButton.addEventListener( "click", () => {
    
    const imageURL = canvas.toDataURL("image/png")
    img.src = imageURL;
    img.style.display = "block";
    deleteButton.style.display = "block";
    // const image = document.createElement('img')
    // image.src = imageURL
    // image.height = canvas.height
    // image.width = canvas.width
    // image.style.display = 'block'
    // form.appendChild(image)
    clearPad();

    const data ={
        firmaCliente: imageURL
    }
    console.log(JSON.stringify(data))
    fetch("http://appsiicsa.com/siicsa/api/orden-trabajo/6/update", {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(!response.ok){
            throw new Error("Error: " + response.status)
        }
        return response.json()
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
  });

  const clearPad = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearPad();
  });

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    img.style.display = "none";
    deleteButton.style.display = "none";
  });

  const getTargetPosition = (event) => {
    positionX = event.clientX - event.target.getBoundingClientRect().x;
    positionY = event.clientY - event.target.getBoundingClientRect().y;

    return [positionX, positionY];
  };

  const handlePointerMove = (event) => {
    if (!writingMode) return;

    const [positionX, positionY] = getTargetPosition(event);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    writingMode = false;
  };

  const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();

    const [positionX, positionY] = getTargetPosition(event);
    ctx.moveTo(positionX, positionY);
  };

  ctx.lineWidth = 2;
  ctx.lineJoin = ctx.lineCap = "round";

  canvas.addEventListener("pointerdown", handlePointerDown, { passive: true });
  canvas.addEventListener("pointerup", handlePointerUp, { passive: true });
  canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
});
