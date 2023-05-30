const d = document
let x = 0, y = 0

export function moveBall(e, ball, stage){
    const $ball = d.querySelector(ball),
    $stage = d.querySelector(stage),
    limitsBall = $ball.getBoundingClientRect(),
    limitsStage = $stage.getBoundingClientRect()

    //console.log(limitsBall, limitsStage)
    //console.log(e.keyCode)
    //console.log(e.key)

    //const move = (direction) => {}

    
    switch (e.keyCode) {
        case 37:
            e.preventDefault()
            //move("left")
            if (limitsBall.left > limitsStage.left) x--
            break;
        case 38:
            e.preventDefault()
            //move("up")
            if (limitsBall.top > limitsStage.top) y--
            break;
        case 39:
            e.preventDefault()
            //move("right")
            if (limitsBall.right < limitsStage.right) x++
            break;
        case 40:
            e.preventDefault()
            //move("down")
            if (limitsBall.bottom < limitsStage.bottom) y++
            break;

        default:
            break;        
    }       
    $ball.style.transform = `translate(${x * 10}px, ${y * 10}px)`

}


export function shortcuts(e){
    /*
    console.log(e.type)
    console.log(e.key)
    console.log(`ctrl: ${e.ctrlKey}`)
    console.log(`alt: ${e.altKey}`)
    console.log(`shift: ${e.shiftKey}`)
    console.log(e)
    */

    if (e.key === "a" && e.altKey){
        alert("Haz lanzado una alerta con el teclado")
    }

    if (e.key === "c" && e.altKey){
        confirm("Haz lanzado una confirmación con el teclado")
    }

    if (e.key === "p" && e.altKey){
        prompt("Haz lanzado un prompt con el teclado")
    }
}