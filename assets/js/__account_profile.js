window.onload = () => {

    mostrarDatosLocalStorage()

    /*====HEADER====*/
    const btn = document.querySelector("#menu-btn")
    const menu = document.querySelector("#sidemenu")

    btn.addEventListener('click', () => {
        menu.classList.toggle("menu-expanded")
        menu.classList.toggle("menu-collapsed")
    });
    /*====FINAL HEADER====*/


    let btn_modifiy = document.querySelector('#main-container-account .wrapper_account_profile .btn_profile #modify')
    btn_modifiy.addEventListener('click', e => {
        e.preventDefault()
        let inputs = document.querySelectorAll('input')
        inputs.forEach(element => {
            element.removeAttribute('readonly')
            element.classList.add('visible')
        })
        modificarDatos()
    })

    let btn_save = document.querySelector('#main-container-account .wrapper_account_profile .btn_profile #save')
    btn_save.addEventListener('click', e => {
        e.preventDefault()
        let inputs = document.querySelectorAll('input')
        inputs.forEach(element => {
            element.setAttribute('readonly', 'readonly')
            element.classList.remove('visible')
        })
        let mensaje = document.querySelector('#main-container-account .wrapper_account_profile .mensaje-guardado')
        mensaje.style.display = 'block'
        setTimeout(() => {
            mensaje.style.display = 'none'
        }, 3000)

        guardarDatos()
    })

    let go_out = document.querySelector('#log_out a')
    go_out.addEventListener('click', () => {
        localStorage.clear()
        window.location.href = "index.html"
    })

}


function modificarDatos() {

    let nombre_clinica = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-clinica')
    let nombre_usuario = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-usuario')
    let contrasena = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #contrasena')
    let correo = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #correo')
    let telefono = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #telefono')



    nombre_clinica.removeAttribute('value')
    nombre_clinica.setAttribute('value', nombre_clinica.value)

    nombre_usuario.removeAttribute('value')
    nombre_usuario.setAttribute('value', nombre_usuario.value)

    contrasena.type = 'text'
    contrasena.removeAttribute('value')
    contrasena.setAttribute('value', contrasena.value)

    correo.removeAttribute('value')
    correo.setAttribute('value', correo.value)

    telefono.removeAttribute('value')
    telefono.setAttribute('value', telefono.value)


    mostrarDatosLocalStorage()
}

function mostrarDatosLocalStorage() {

    let picture_nav = document.querySelector('#sidemenu #profile #photo img')
    let nombre_clinica_nav = document.querySelector('#sidemenu #profile #name span')
    let picture = document.querySelector('#main-container-account .wrapper_account_profile .picture_profile img')
    let nombre_clinica = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-clinica')
    let nombre_usuario = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-usuario')
    let contrasena = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #contrasena')
    let correo = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #correo')
    let telefono = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #telefono')

    picture_nav.src = localStorage.getItem('imagen')

    nombre_clinica_nav.innerHTML = localStorage.getItem('nombre_clinica')

    picture.src = localStorage.getItem('imagen')

    nombre_clinica.removeAttribute('value')
    nombre_clinica.setAttribute('value', localStorage.getItem('nombre_clinica'))

    nombre_usuario.removeAttribute('value')
    nombre_usuario.setAttribute('value', localStorage.getItem('usuario'))

    contrasena.removeAttribute('value')
    contrasena.setAttribute('value', localStorage.getItem('password'))

    correo.removeAttribute('value')
    correo.setAttribute('value', localStorage.getItem('correo'))

    telefono.removeAttribute('value')
    telefono.setAttribute('value', localStorage.getItem('telefono'))
}

function guardarDatos() {

    let nombre_clinica = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-clinica').value
    let nombre_usuario = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-usuario').value
    let contrasena = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #contrasena').value
    let correo = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #correo').value
    let telefono = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #telefono').value
    let id = localStorage.getItem('id')

    fetch(`http://localhost:3002/editUser?nombre_clinica=${nombre_clinica}&usuario=${nombre_usuario}&password=${contrasena}&email=${correo}&telefono=${telefono}&id=${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(data => {

        localStorage.setItem('nombre_clinica', nombre_clinica)
        localStorage.setItem('usuario', nombre_usuario)
        localStorage.setItem('password', contrasena)
        localStorage.setItem('correo', correo)
        localStorage.setItem('telefono', telefono)
    })

}