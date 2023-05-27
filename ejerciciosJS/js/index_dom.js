import hamburgerMenu from "./menu_hamburger.js"
import { digitalClock, alarm } from "./reloj.js"
import { moveBall, shortcuts } from "./teclado.js"
import countdown from "./cuenta_regresiva.js"

const d = document

d.addEventListener("DOMContentLoaded", (e) =>{
    hamburgerMenu(".panel-btn", ".panel", ".menu a")
    digitalClock("#reloj", "#activar-reloj", "#desactivar-reloj")
    alarm("assets/alarma.mp3", "#activar-alarma", "#desactivar-alarma")
    countdown("countdown",
        "May 30, 2023 12:00:00", 
        "HOLA, YA LLEGÓ EL DÍA"
    )
})

d.addEventListener("keydown", (e) =>{
    shortcuts(e)
    moveBall(e, ".ball", ".stage")
})