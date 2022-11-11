let burger = document.querySelector('.logo_block__burger')
let menu = document.querySelectorAll('.navigation_block__link')

burger.addEventListener('click', ()=>{
    burger.classList.toggle('logo_block__burger__active')
})