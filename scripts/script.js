let burger = document.querySelector('.nav__menu_btn')
let menu = document.querySelector('.nav__links')

burger.addEventListener('click', ()=>{
    menu.classList.toggle('active')
})