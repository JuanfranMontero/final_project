
window.onload = () => {

    mostrarDatosLocalStorage()

    /*====HEADER====*/
    const btn = document.querySelector("#menu-btn")
    const menu = document.querySelector("#sidemenu")

    btn.addEventListener('click', () => {
        menu.classList.toggle("menu-expanded")
        menu.classList.toggle("menu-collapsed")
    });

    /*====FINAL HEADER====*/

    /*====POP UP====*/
    document.querySelector("#menu-btn-popup").addEventListener('click', () => {
        document.querySelector(".popup-product").style.display = "none"
    })

    /*====MAIN CONTAINER====*/
    let products = document.querySelectorAll(".container-cards .card")


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



    let go_out = document.querySelector('#log_out a')
    go_out.addEventListener('click', () => {
        localStorage.clear()
        window.location.href = "index.html"
    })

}


function mostrarDatosLocalStorage(){
    let picture_nav = document.querySelector('#sidemenu #profile #photo img')
    picture_nav.src = localStorage.getItem('imagen')
    let nombre_clinica_nav = document.querySelector('#sidemenu #profile #name span')
    nombre_clinica_nav.innerHTML = localStorage.getItem('nombre_clinica')
}