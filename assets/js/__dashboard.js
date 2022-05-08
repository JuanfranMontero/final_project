
window.onload = () => {

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
    let products = document.querySelectorAll("#main-container > .container-cards .card")


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