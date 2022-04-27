window.onload = () => {

	// HEADER
	let header = document.querySelector('header')
	window.addEventListener('scroll', () => {
		window.scrollY >= 150 ? header.classList.add('nav_fijo') : header.classList.remove('nav_fijo')
	})

	document.querySelector("#menu-toggler").addEventListener('click', () => {
		toggleBodyClass('menu-active')
	})





	var lista = document.getElementById("lista_ingredientes"),
		tareaInput = document.getElementById("ingreso"),
		btnNuevaTarea = document.getElementById("btn_add");


	var agregarTarea = function () {
		var tarea = tareaInput.value.toLowerCase(),
			nuevaTarea = document.createElement("li"),
			enlace = document.createElement("a"),
			contenido = document.createTextNode(tarea);

		if (tarea != "") {

			enlace.appendChild(contenido);
			enlace.setAttribute("href", "#");
			nuevaTarea.appendChild(enlace);
			lista.appendChild(nuevaTarea);

			tareaInput.value = "";
			tareaInput.focus();
		}

		for (var i = 0; i <= lista.children.length - 1; i++) {
			lista.children[i].addEventListener("click", function () {
				this.parentNode.removeChild(this);
			});
		}
	};


	var eleminarTarea = function () {
		this.parentNode.removeChild(this);
	};

	btnNuevaTarea.addEventListener("click", agregarTarea);

	for (var i = 0; i <= lista.children.length - 1; i++) {
		lista.children[i].addEventListener("click", eleminarTarea);
	}


}

function toggleBodyClass(className) {
	document.body.classList.toggle(className);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
