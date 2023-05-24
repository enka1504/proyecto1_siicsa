function guardar(){
    let form = document.forms["registro"]

    let nombre = form.nombre.value
    let telefono = form.telefono.value
    let email = form.email.value

    let sabor = form.sabor.value

    let tipo = form.tipo.value
    

    let acom = []
    let chocolatee = document.getElementById("chocolatee")
    let pay = document.getElementById("pay")
    let chispas = document.getElementById("chispas")
    let pasas = document.getElementById("pasas")

    if(chocolatee.checked){
        acom.push(chocolatee.value)
    }
    if(pay.checked){
        acom.push(pay.value)
    }
    if(chispas.checked){
        acom.push(chispas.value)
    }
    if(pasas.checked){
        acom.push(pasas.value)
    }

    let msj = "El usuario: " + nombre + "<br>Teléfono: " + telefono + "<br>Email: " + email + "<br>Eligió<br>Sabor: " + sabor + "<br>Tipo: " + tipo + "<br>Acompañamientos: "
    
    for (let i = 0; i < acom.length; i++){
        const element = acom[i]

        msj += element + ", "
    }

    document.write(msj)

}