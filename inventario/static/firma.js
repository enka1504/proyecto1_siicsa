const $canvas = document.querySelector('#canvas'),
$btnDescargar = document.querySelector('#btnDescargar'),
$btnLimpiar = document.querySelector('#btnLimpiar')
$btnGenerarDoc = document.querySelector('#btnGenerarDocumento')

const contexto = $canvas.getContext('2d')
const COLOR_PINCEL = "blue"
const COLOR_FONDO = "white"
const GROSOR = 2
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0
const obtenerXReal = (clientX) => clientX - $canvas.getBoundingClientRect().left
const obtenerYReal = (clientY) => clientY - $canvas.getBoundingClientRect().top
let haComenzadoDibujo = false

const limpiarCanvas = () => {
    contexto.fillStyle = COLOR_FONDO
    contexto.fillRect(0, 0, $canvas.width, $canvas.height)
}
limpiarCanvas()
$btnLimpiar.onclick = limpiarCanvas

$btnDescargar.onclick = () => {
    const enlace = document.createElement('a')
    enlace.download = "Firma.png"
    enlace.href = $canvas.toDataURL()
    enlace.click()
}


$btnGenerarDoc.onclick = () => {
    window.open("documento.html")
}

window.obtenerImagen = () => {
    return $canvas.toDataURL()
}

$canvas.addEventListener("pointerdown", evento => {
    // En este evento solo se ha iniciado el clic, así que dibujamos un punto
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.fillStyle = COLOR_PINCEL;
    contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
    contexto.closePath();
    // Y establecemos la bandera
    haComenzadoDibujo = true;
});

$canvas.addEventListener("pointermove", (evento) => {
    if (!haComenzadoDibujo) {
        return;
    }
    // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.moveTo(xAnterior, yAnterior);
    contexto.lineTo(xActual, yActual);
    contexto.strokeStyle = COLOR_PINCEL;
    contexto.lineWidth = GROSOR;
    contexto.stroke();
    contexto.closePath();
});
["pointerup", "pointerout"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, () => {
        haComenzadoDibujo = false;
    });
});