	window.onload = () => {

	var lista = document.getElementById("lista_ingredientes"),
		tareaInput = document.getElementById("ingreso"),
		btnNuevaTarea = document.getElementById("btn_add");

	
	var agregarTarea = function(){
		var tarea = tareaInput.value,
			nuevaTarea = document.createElement("li"),
			enlace = document.createElement("a"),
			contenido = document.createTextNode('- ' + tarea);

		if (tarea != "") {
			
            enlace.appendChild(contenido);
            enlace.setAttribute("href", "#");
            nuevaTarea.appendChild(enlace);
            lista.appendChild(nuevaTarea);

            tareaInput.value = "";
            tareaInput.focus();
		}
	
		for (var i = 0; i <= lista.children.length -1; i++) {
			lista.children[i].addEventListener("click", function(){
				this.parentNode.removeChild(this);
			});
		}
	};


	var eleminarTarea = function(){
		this.parentNode.removeChild(this);
	};

	btnNuevaTarea.addEventListener("click", agregarTarea);

	for (var i = 0; i <= lista.children.length -1; i++) {
		lista.children[i].addEventListener("click", eleminarTarea);
	}
}