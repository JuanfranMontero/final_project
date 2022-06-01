
window.onload = () => {

    

    let btn_save = document.querySelector('.wrapper #sign-in')
    btn_save.addEventListener('click', e => {
        e.preventDefault()
        let usuario = document.querySelector('#usuario').value
        let password = document.querySelector('#password').value 

        fetch(`http://localhost:3002/check_user?usuario=${usuario}&password=${password}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(result => result.json())
		.then(data => {
           if(data.length > 0){
               console.log(data);
               if(data[0].activo == 1){
                   let imagen = data[0].imagen
                   let nombre_clinica = data[0].nombre_clinica
                   let usuario = data[0].usuario
                   let password = data[0].password
                   let telefono = data[0].telefono
                   let correo = data[0].email
                   let id = data[0].id_usuario
                   
                   localStorage.setItem("imagen", imagen);
                   localStorage.setItem("nombre_clinica", nombre_clinica);
                   localStorage.setItem("usuario", usuario);
                   localStorage.setItem("password", password);
                   localStorage.setItem("telefono", telefono);
                   localStorage.setItem("correo", correo);
                   localStorage.setItem('id', id);

                    window.location.href = '__dashboard.html'
               }
               else{
                   alert('Aún no se le ha podido activar su cuenta, pronto estará disponible. Gracias!')
               }
           }
           else{
               alert('Usuario o contraseña incorrecto, por favor, intentelo de nuevo.')
           }

		})
    })
    
    let btn_create_user = document.querySelector('.wrapper #create-account')
    btn_create_user.addEventListener('click', e => {
        e.preventDefault()
        window.location.href = '__create_account.html'
    })


}