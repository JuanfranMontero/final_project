window.onload = () => {

    
    let btn_registro = document.querySelector("#registrarse")
    btn_registro.addEventListener('click', e => {
        e.preventDefault()
        registroUsuario()
       // alert('Se le dara permiso a su dashboard en el menor tiempo posible, gracias.')
        //window.location.href = 'index.html'

    })

    let btn_back_registro = document.querySelector('#back_registrarse')
    btn_back_registro.addEventListener('click', e => {
        e.preventDefault()
        window.location.href = 'index.html'

    })

}

function registroUsuario() { 

    let nombre_clinica = document.querySelector('.user-info-form #nombre-clinica').value
    let telefono = document.querySelector('.user-info-form #telefono').value
    let email = document.querySelector('.user-info-form #email-ipt').value
    let usuario = document.querySelector('.user-info-form #name-ipt').value
    let password = document.querySelector('.user-info-form #password-ipt').value
    let password_chk = document.querySelector('.user-info-form #password-chk-ipt').value


    if(password === password_chk){

        fetch(`http://localhost:3002/createUser?nombre_clinica=${nombre_clinica}&usuario=${usuario}&password=${password}&email=${email}&telefono=${telefono}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(result => result.json())
		.then(data => {
            alert('Registrad@ correctamente, en el menor tiempo posible se le dara acceso a su dashboard')
            window.location.href = "index.html"
		})

    }
    else{
        alert('Las contraseñas deben coincidir, intentelo de nuevo. Gracias')
    }
    
}