
window.onload = () => {

    let btn_save = document.querySelector('.wrapper #sign-in')
    btn_save.addEventListener('click', e => {
        e.preventDefault()
        //comprobar usuario
        window.location.href = '__dashboard.html'
    })
    
    let btn_create_user = document.querySelector('.wrapper #create-account')
    btn_create_user.addEventListener('click', e => {
        e.preventDefault()
        window.location.href = '__create_account.html'
    })

    let btn_registro = document.querySelector("#registrarse")
    btn_registro.addEventListener('click', e => {
        e.preventDefault()
        alert('Se le dara permiso a su dashboard en el menor tiempo posible, gracias.')
        window.location.href = 'index.html'

    })

    let btn_back_registro = document.querySelector('#back_registrarse')
    btn_back_registro.addEventListener('click', e => {
        e.preventDefault()
        window.location.href = 'index.html'

    })




}