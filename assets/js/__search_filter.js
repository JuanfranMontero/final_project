window.onload = () => {

	 /*====HEADER====*/
	 const btn = document.querySelector("#menu-btn")
	 const menu = document.querySelector("#sidemenu")
 
	 btn.addEventListener('click', () => {
		 menu.classList.toggle("menu-expanded")
		 menu.classList.toggle("menu-collapsed")
	 });
	 /*====FINAL HEADER====*/

	let lista = document.getElementById("lista_ingredientes"),
		tareaInput = document.getElementById("ingreso"),
		btnNuevaTarea = document.getElementById("btn_add");


	let agregarTarea = function () {
		let tarea = tareaInput.value.toLowerCase(),
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

		for (let i = 0; i <= lista.children.length - 1; i++) {
			lista.children[i].addEventListener("click", function () {
				this.parentNode.removeChild(this);
			});
		}
	};


	let eleminarTarea = function () {
		this.parentNode.removeChild(this);
	};

	btnNuevaTarea.addEventListener("click", agregarTarea);

	const textbox = document.querySelector("#ingreso");
	textbox.addEventListener("keypress", event => {
		if (event.key === "Enter") {
			agregarTarea()
		}
	});



	for (let i = 0; i <= lista.children.length - 1; i++) {
		lista.children[i].addEventListener("click", eleminarTarea);
	}

	/*====BOTON REPETIR BUSQUEDA====*/
	document.querySelector("#btn_repeat").addEventListener('click', () => {
		let listado = document.get(".listado_ingredientes #lista_ingredientes  li")
		console.log(listado);
	});

	/*====POP UP====*/
    document.querySelector("#menu-btn-popup").addEventListener('click', () => {
        document.querySelector(".popup-product").style.display = "none"
    })

    /*====MAIN CONTAINER====*/
    let products = document.querySelectorAll(".container-cards > .card")
	console.log(products);


    products.forEach(product_element => {
        product_element.addEventListener('click', () => {
            let picture = product_element.querySelector(".picture > img").src,
                marca = product_element.querySelector(".marca").textContent,
                description = product_element.querySelector(".description").textContent;

            document.querySelector("#picture_popup").src = picture
            document.querySelector("#title_popup").innerHTML = marca
            document.querySelector("#description_popup").innerHTML = description

            document.querySelector(".popup-product").style.display = "block"
            
        })
    })

    /*====FINAL MAIN CONTAINER====*/

}

