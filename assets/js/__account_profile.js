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

        })


    }