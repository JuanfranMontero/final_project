window.onload = () => {
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
            
            capturarDatos()
        })



    }


    function capturarDatos(){

        //let picture = document.querySelector('#main-container-account .wrapper_account_profile .picture_profile img')
        let nombre_clinica = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-clinica')
        let nombre_usuario = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #nombre-usuario')
        let contrasena = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #contrasena')
        let correo = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #correo')
        let telefono = document.querySelector('#main-container-account .wrapper_account_profile .info_profile #telefono')



        //picture.removeAttribute('src')
        //picture.setAttribute('src', 'prueba')

        nombre_clinica.removeAttribute('value')
        nombre_clinica.setAttribute('value', 'prueba')

        nombre_usuario.removeAttribute('value')
        nombre_usuario.setAttribute('value', 'prueba')

        contrasena.removeAttribute('value')
        contrasena.setAttribute('value', 'prueba')

        correo.removeAttribute('value')
        correo.setAttribute('value', 'prueba')

        telefono.removeAttribute('value')
        telefono.setAttribute('value', 'prueba')
    }