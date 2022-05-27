window.onload = () => {

	showAllProducts()

	/*====HEADER====*/
	const btn = document.querySelector("#menu-btn")
	const menu = document.querySelector("#sidemenu")

	btn.addEventListener('click', () => {
		menu.classList.toggle("menu-expanded")
		menu.classList.toggle("menu-collapsed")
	});
	/*====FINAL HEADER====*/


	/*====BUSCADOR Y LISTADO====*/

	let btnAdd = document.querySelector(".full-width-search_container .principal_container .container_add #form-add .btn-form #btn_add")
	let btnReset = document.querySelector(".full-width-search_container .principal_container .container_add .btn-form #btn_repeat")

	btnAdd.addEventListener("click", agregarIngrediente());

	const textbox = document.querySelector("#ingreso");
	textbox.addEventListener("keypress", event => {
		if (event.key === "Enter") {
			agregarIngrediente()
		}
	});

	btnReset.addEventListener('click', () => {
	
	})





	/*====FINAL BUSCADOR Y LISTADO====*/
	
	
	/*====POP UP====*/
	document.querySelector("#menu-btn-popup").addEventListener('click', () => {
		document.querySelector(".popup-product").style.display = "none"
	})
	
	/*====MAIN CONTAINER====*/
	let products = document.querySelectorAll(".container-cards > .card")
	
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

function showAllProducts(){
	let contador = 0
	let table_products = document.querySelector(".table_products")
	table_products.innerHTML = ""

	fetch(`http://localhost:3002/productos`, {
		method: 'GET',
		mode: 'cors',
		headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(result => result.json())
			.then(data => {
				for (let elements of data) {
					let div_product = document.createElement('div')
					div_product.classList.add("product")
					for (let element in elements) {
						console.log(`${element}: ${elements[element]}`);
						if (element == "imagen") {
							let picture_product = document.createElement('div')
							picture_product.classList.add("picture")
							let img = document.createElement('img')
							img.src = elements[element]
							img.alt = "Imagen de pienso"
							img.classList.add("picture-product")
							picture_product.appendChild(img)
							div_product.appendChild(picture_product)
						}
						if (element == "nombre"){
							let content = document.createElement('div')
							content.classList.add('content')
							let div_title = document.createElement('div')
							let title = document.createElement('h5')
							title.classList.add("title")
							title.textContent = elements[element]
							div_title.appendChild(title)
							content.appendChild(div_title)
							
							
						}
					}
					console.log(contador);
					contador++
					table_products.appendChild(div_product)
					
				}
				productosTotales(contador)
			})
}

/*====AGREGAR INGREDIENTE====*/
function agregarIngrediente(){
	let ingrediente = document.querySelector("#ingreso")
	document.querySelector(".top-info h5 span").innerHTML += `  ${ingrediente.value}  `
	buscar_piensos(ingrediente.value)
	ingrediente.value = ""
}


/*====PETICION API====*/

function buscar_piensos(ingrediente) {
	
	let contador = 0
	let table_products = document.querySelector(".table_products")
	table_products.textContent = ""
	
	let ingredientes = ingrediente
	fetch(`http://localhost:3002/no_ingredientes?ingredientes=${ingredientes}`, {
		method: 'GET',
		mode: 'cors',
		headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(result => result.json())
			.then(data => {
				for (let elements of data) {
					let div_product = document.createElement('div')
					div_product.classList.add("product")
					for (let element in elements) {
						if (element == "imagen") {
							let picture_product = document.createElement('div')
							picture_product.classList.add("picture")
							let img = document.createElement('img')
							img.src = elements[element]
							img.alt = "Imagen de pienso"
							img.classList.add("picture-product")
							picture_product.appendChild(img)
							div_product.appendChild(picture_product)
						}
						if (element == "nombre"){
							let content = document.createElement('div')
							content.classList.add('content')
							let div_title = document.createElement('div')
							let title = document.createElement('h5')
							title.classList.add("title")
							title.textContent = elements[element]
							div_title.appendChild(title)
							content.appendChild(div_title)
							
							
						}
						contador++
					}
					table_products.appendChild(div_product)
					
				}
				productosTotales(contador)
			})


		}

	/*====FINAL PETICION API====*/

	
	
	
	/*====CONTABILIZAR PRODUCTOS====*/
	function productosTotales(total){
		let numProductos = document.querySelector(".top-info h6 span")
		numProductos.innerHTML = total
	}


























	
	/*	
	for (let i = 0; i <= lista.children.length - 1; i++) {
		lista.children[i].addEventListener("click", eleminarTarea);
	}
	====BOTON REPETIR BUSQUEDA====
	document.querySelector("#btn_repeat").addEventListener('click', () => {
		let listado = document.querySelector(".listado_ingredientes #lista_ingredientes  li")
	});
	
	
	====AGREGAR TAREAS====
function agregarTarea() {
	let lista = document.getElementById(".top-info h5 span"),
	btnNuevaTarea = document.getElementById("btn_add"),
	tareaInput = document.getElementById("ingreso")
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
};*/