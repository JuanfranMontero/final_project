window.onload = () => {
        /*====HEADER====*/
        const btn = document.querySelector("#menu-btn")
        const menu = document.querySelector("#sidemenu")
    
        btn.addEventListener('click', () => {
            menu.classList.toggle("menu-expanded")
            menu.classList.toggle("menu-collapsed")
        });
        /*====FINAL HEADER====*/
}