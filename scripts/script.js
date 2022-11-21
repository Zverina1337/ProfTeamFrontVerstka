const burger = document.querySelector('.logo_block__burger')
let clicks = 0;
const headerLinks = document.querySelectorAll('.navigation_block__link')

burger.addEventListener('click', () => {
    clicks++
    burger.classList.toggle('logo_block__burger__active')
    for(let link of headerLinks){
        link.classList.remove('navigation_block__link__animation__out')
        link.classList.add('navigation_block__link__animation__in')

        setTimeout(()=>{
            link.classList.toggle('navigation_block__link__active')
            link.classList.remove('navigation_block__link__animation__in')
        }, 1000 )

        if(clicks % 2 == 0){
            link.classList.add('navigation_block__link__animation__out')
        }
    }
    
})

for(let link of headerLinks){
    link.addEventListener('click', (e)=>{
        clicks--
        burger.classList.toggle('logo_block__burger__active')
        for(let link of headerLinks){
            link.classList.remove('navigation_block__link__active')
        }
    })
}


// Плавный скролл

if(headerLinks.length){
    headerLinks.forEach(link => {
        link.addEventListener('click',(e) => {
            if(e.target.dataset.goto && document.querySelector(e.target.dataset.goto)){
                const gotoBlock = document.querySelector(e.target.dataset.goto)
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                })
            }
        })
    });
}

// Табы услуги и цены

const servicesLinks = document.querySelectorAll('.links_block__link')
const arrow_left_button = document.querySelector('.arrows_block__left_button')
const arrow_right_button = document.querySelector('.arrows_block__right_button')
const tables = document.querySelectorAll('.content_block__table_block')
let pagesCount = 1;

// Non-responsive

for(let link of servicesLinks){
    link.addEventListener('click',(e)=>{
        e.preventDefault()
        for(let innerLink of servicesLinks){
            innerLink.classList.remove('clicked')
        }
        e.target.classList.toggle("clicked")
        for(let table of tables){
            if(e.target.dataset.number == table.dataset.number){
                table.style.display = "table"
                for(let innerLink of servicesLinks){
                    innerLink.classList.contains('clicked') ? innerLink.style.color = "#00BF78" : innerLink.style.color = "black"
                }
            }else{
                for(let innerLink of servicesLinks){
                    innerLink.classList.contains('clicked') ? innerLink.style.color = "#00BF78" : innerLink.style.color = "black"
                }
                table.style.display = "none"
            }
        }
    })
    link.style.display = 'block'
}

// Responsive

const increment = () =>{
    if(pagesCount < servicesLinks.length){
        pagesCount++
    }
    displayLink()
    displayTable()
}

const decrement = () =>{
    if(pagesCount > 1){
        pagesCount--
    }
    displayLink()
    displayTable()
}

const displayLink = () =>{
    for(let link of servicesLinks){
        if(link.dataset.number == pagesCount){
            link.style.display = "block"
        }else{
            link.style.display = "none"
        }
    }
}

const displayTable = () =>{
    for(let table of tables){
        if(table.dataset.number == pagesCount){
            table.style.display = "table"
        }else{
            table.style.display = "none"
        }
    }
}

displayTable()
window.innerWidth <= 780 && displayLink()

// Получение данных из формы (футер)

const formContacts = document.querySelector(".form_block__form")

formContacts.addEventListener('submit',(e)=>{
    e.preventDefault()
    const data = new FormData(formContacts)

    const username = data.get('username')
    const phoneNumber = data.get('phone_number')

    console.log(`Имя ${username}`)
    console.log(`Номер телефона ${phoneNumber}`)
})

// Слайдер

const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
        nextEl: '.arrows_block__arrow_button__prev',
        prevEl: '.arrows_block__arrow_button__next',
    },
});

// Галерея

// Модальное окно

//
// let modal = document.querySelector('.modal')
// let left_block__link = document.querySelector('.left_block__link')
// let btn_close = document.querySelector('.btn-close')
//
// left_block__link.addEventListener('click', ()=>{
//     modal.style.display = 'block'
// })
// btn_close.addEventListener('click', ()=>{
//     modal.style.display = 'none'
// })