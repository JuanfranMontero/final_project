
window.onload = () => {

	
	/*====POP UP====*/
	let close = document.getElementById('menu-btn-popup')
	close.addEventListener('click', () => {
		document.querySelector('.popup-product').style.display = 'none'
	})

	let productsSearch = document.querySelectorAll(".table_products .product")
	
	productsSearch.forEach(product_element => {
		product_element.addEventListener('click', () => {
			console.log(product_element);
			let picture = product_element.querySelector(".picture-product").src,
				marca = product_element.querySelector(".content").textContent,
				description = product_element.querySelector(".description").textContent;


			document.querySelector("#picture_popup").src = picture
			document.querySelector("#title_popup").innerHTML = marca
			document.querySelector("#description_popup").innerHTML = description
			
			document.querySelector(".popup-product").style.display = "block"
			
		})
	})
	/*====END POP UP====*/

	mostrarDatosLocalStorage()
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

	btnAdd.addEventListener("click", e => {
		e.preventDefault()
		agregarIngrediente()
	})

	btnReset.addEventListener('click', e => {
		e.preventDefault()
		let resultados = document.querySelector(".main-container .top-info h5 span")
		resultados.innerHTML = ""
		showAllProducts()
	})


	/*====FINAL BUSCADOR Y LISTADO====*/





	let go_out = document.querySelector('#log_out a')
	go_out.addEventListener('click', () => {
		localStorage.clear()
		window.location.href = "index.html"
	})

}

/*====AGREGAR INGREDIENTE====*/
function agregarIngrediente() {
	let ingrediente = document.querySelector("#ingreso")
	if (ingrediente.value != '') {
		document.querySelector(".top-info h5 span").innerHTML += `  ${ingrediente.value}  `
		buscar_piensos(ingrediente.value)
		ingrediente.value = ""
	}
	else {
		alert('Debes introducir un ingrediente para realizar la búsqueda.')
	}


}


function showAllProducts() {
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
					let picture_product = document.createElement('div')
					picture_product.classList.add("picture")
					if (element == "imagen") {
						let img = document.createElement('img')
						img.src = elements[element]
						img.alt = "Imagen de pienso"
						img.classList.add("picture-product")
						picture_product.appendChild(img)
						div_product.appendChild(picture_product)
					}
					let content = document.createElement('div')
					content.classList.add('content')
					if (element == "nombre") {
						let div_title = document.createElement('div')
						div_title.classList.add("title")
						let title = document.createElement('h5')
						title.innerHTML = elements[element]
						div_title.appendChild(title)
						content.appendChild(div_title)
						div_product.appendChild(content)
					}
				}
				let div_readmore = document.createElement('div')
				div_readmore.classList.add("read")
				let p = document.createElement('p')
				p.innerHTML = 'Leer más <i class="fal fa-long-arrow-alt-right"></i>'
				div_readmore.append(p)
				div_product.appendChild(div_readmore)

				contador++
				table_products.appendChild(div_product)
			}
			productosTotales(contador)
		})
}


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
					let picture_product = document.createElement('div')
					picture_product.classList.add("picture")
					if (element == "imagen") {
						let img = document.createElement('img')
						img.src = elements[element]
						img.alt = "Imagen de pienso"
						img.classList.add("picture-product")
						picture_product.appendChild(img)
						div_product.appendChild(picture_product)
					}
					let content = document.createElement('div')
					content.classList.add('content')
					if (element == "nombre") {
						let div_title = document.createElement('div')
						div_title.classList.add("title")
						let title = document.createElement('h5')
						title.innerHTML = elements[element]
						div_title.appendChild(title)
						content.appendChild(div_title)
						div_product.appendChild(content)
					}
				}
				let div_readmore = document.createElement('div')
				div_readmore.classList.add("read")
				let p = document.createElement('p')
				p.innerHTML = 'Leer más <i class="fal fa-long-arrow-alt-right"></i>'
				div_readmore.append(p)
				div_product.appendChild(div_readmore)

				contador++
				table_products.appendChild(div_product)
			}
			productosTotales(contador)
		})


}

/*====CONTABILIZAR PRODUCTOS====*/
function productosTotales(total) {
	let numProductos = document.querySelector(".top-info h6 span")
	numProductos.textContent = ""
	numProductos.textContent = total
}

function mostrarDatosLocalStorage() {
	let picture_nav = document.querySelector('#sidemenu #profile #photo img')
	picture_nav.src = localStorage.getItem('imagen')
	let nombre_clinica_nav = document.querySelector('#sidemenu #profile #name span')
	nombre_clinica_nav.innerHTML = localStorage.getItem('nombre_clinica')
}