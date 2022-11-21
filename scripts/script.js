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

// Модальное окно

let modal = document.querySelector('.modal')
let left_block__link = document.querySelector('.left_block__link')
let service_links = document.querySelectorAll('.service_block__link')
let employees = document.querySelectorAll('.block_employees__block_employee')
let btn_close = document.querySelector('.btn-close')
let header = document.querySelector('header')
let main = document.querySelector('main')
let footer = document.querySelector('footer')

for (let link of service_links){
    link.addEventListener('click',()=>{
        modal.style.display = 'block'
        header.style.filter = 'blur(15px)'
        main.style.filter = 'blur(15px)'
        footer.style.filter = 'blur(15px)'
    })
}
for (let employee of employees){
    employee.addEventListener('click',()=>{
        modal.style.display = 'block'
        header.style.filter = 'blur(15px)'
        main.style.filter = 'blur(15px)'
        footer.style.filter = 'blur(15px)'
    })
}
left_block__link.addEventListener('click', ()=>{
    modal.style.display = 'block'
    header.style.filter = 'blur(15px)'
    main.style.filter = 'blur(15px)'
    footer.style.filter = 'blur(15px)'
})
btn_close.addEventListener('click', ()=>{
    modal.style.display = 'none'
    header.style.filter = 'blur(0)'
    main.style.filter = 'blur(0)'
    footer.style.filter = 'blur(0)'
})

// Маска ввода номера телефона

document.addEventListener("DOMContentLoaded", function () {
    let eventCalllback = function (e) {
        let el = e.target,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    let phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
});

// Отправка данных формы

const modal_form = document.querySelector('.modal-form')

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
const validationInput = (length, selector) => {
    const input = document.querySelector(selector)
    if(length === 0){
        input.classList.add('border-danger')
    }else{
        input.classList.remove('border-danger')
    }
}
modal_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const data = new FormData(modal_form)

    const username = data.get('username')
    const phoneNumber = data.get('phone_number')
    const formMasters = data.get('form_masters')
    const formServices = data.get('form_services')
    const date = data.get('date')

    // Валидация

    validationInput(username.length, "#floatingName")
    validationInput(phoneNumber.length, "#floatingNumber")
    validationInput(formMasters.length, "#select_masters")
    validationInput(formServices.length, "#select_services")
    validationInput(date.length, "#floatingDate")

    const clearPhoneNumber = phoneNumber.match(/\d/g).join('')
    const cleanFormMasters = Number(formMasters)
    const cleanFormServices = Number(formServices)

    postData('https://beauty-saloon-server.herokuapp.com/api/orders', {
        name: username, phone: clearPhoneNumber, masterId: cleanFormMasters, serviceId: cleanFormServices, visitDate: date
    }).then((data) => {
        if(data.status == 'Opened'){
            modal_form.innerHTML = "<p>Ваша заявка отправлена! В ближайшее время с вами свяжется менеджер.</p>"
            setTimeout(() => {
                modal.style.display = 'none'
                header.style.filter = 'blur(0)'
                main.style.filter = 'blur(0)'
                footer.style.filter = 'blur(0)'
                modal_form.innerHTML = "<div class=\"form-floating mb-3\" >\n" +
                    "                        <input type=\"text\" class=\"form-control rounded-3\" id=\"floatingName\" placeholder=\"Ваше имя\" name=\"username\" required>\n" +
                    "                        <label for=\"floatingName\">Имя</label>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"form-floating mb-3\">\n" +
                    "                        <input type=\"text\" class=\"form-control rounded-3\" id=\"floatingNumber\" placeholder=\"+7 (___) ___-__-__)\" data-phone-pattern name=\"phone_number\" required>\n" +
                    "                        <label for=\"floatingNumber\">Номер телефона</label>\n" +
                    "                    </div>\n" +
                    "                    <p>Выберите мастера:</p>\n" +
                    "                    <select name=\"form_masters\" id=\"select_masters\" class=\"form-select mb-3\" required>\n" +
                    "                        <option value=\"1\">Master 1</option>\n" +
                    "                        <option value=\"2\">Master 2</option>\n" +
                    "                        <option value=\"3\">Master 3</option>\n" +
                    "                        <option value=\"4\">Master 4</option>\n" +
                    "                    </select>\n" +
                    "                    <p>Выберите услугу:</p>\n" +
                    "                    <select name=\"form_services\" id=\"select_services\" class=\"form-select mb-3\" required>\n" +
                    "                        <option value=\"1\">Service 1</option>\n" +
                    "                        <option value=\"2\">Service 2</option>\n" +
                    "                        <option value=\"3\">Service 3</option>\n" +
                    "                        <option value=\"4\">Service 4</option>\n" +
                    "                    </select>\n" +
                    "                    <div class=\"form-floating mb-3\">\n" +
                    "                        <input type=\"date\" class=\"form-control rounded-3\" id=\"floatingDate\" placeholder=\"+7 (___) ___-__-__)\" name=\"date\">\n" +
                    "                        <label for=\"floatingDate\">Дата визита</label>\n" +
                    "                    </div>\n" +
                    "                    <button class=\"w-100 mb-2 btn btn-lg rounded-3 btn-outline-dark\" type=\"submit\">Записаться</button>"
            },3000)
        }else{
            modal_form.innerHTML = "<p>Возникла проблема</p>"
            setTimeout(() => {
                modal.style.display = 'none'
                header.style.filter = 'blur(0)'
                main.style.filter = 'blur(0)'
                footer.style.filter = 'blur(0)'
                modal_form.innerHTML = "<div class=\"form-floating mb-3\" >\n" +
                    "                        <input type=\"text\" class=\"form-control rounded-3\" id=\"floatingName\" placeholder=\"Ваше имя\" name=\"username\" required>\n" +
                    "                        <label for=\"floatingName\">Имя</label>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"form-floating mb-3\">\n" +
                    "                        <input type=\"text\" class=\"form-control rounded-3\" id=\"floatingNumber\" placeholder=\"+7 (___) ___-__-__)\" data-phone-pattern name=\"phone_number\" required>\n" +
                    "                        <label for=\"floatingNumber\">Номер телефона</label>\n" +
                    "                    </div>\n" +
                    "                    <p>Выберите мастера:</p>\n" +
                    "                    <select name=\"form_masters\" id=\"select_masters\" class=\"form-select mb-3\" required>\n" +
                    "                        <option value=\"1\">Master 1</option>\n" +
                    "                        <option value=\"2\">Master 2</option>\n" +
                    "                        <option value=\"3\">Master 3</option>\n" +
                    "                        <option value=\"4\">Master 4</option>\n" +
                    "                    </select>\n" +
                    "                    <p>Выберите услугу:</p>\n" +
                    "                    <select name=\"form_services\" id=\"select_services\" class=\"form-select mb-3\" required>\n" +
                    "                        <option value=\"1\">Service 1</option>\n" +
                    "                        <option value=\"2\">Service 2</option>\n" +
                    "                        <option value=\"3\">Service 3</option>\n" +
                    "                        <option value=\"4\">Service 4</option>\n" +
                    "                    </select>\n" +
                    "                    <div class=\"form-floating mb-3\">\n" +
                    "                        <input type=\"date\" class=\"form-control rounded-3\" id=\"floatingDate\" placeholder=\"+7 (___) ___-__-__)\" name=\"date\">\n" +
                    "                        <label for=\"floatingDate\">Дата визита</label>\n" +
                    "                    </div>\n" +
                    "                    <button class=\"w-100 mb-2 btn btn-lg rounded-3 btn-outline-dark\" type=\"submit\">Записаться</button>"
            },3000)
        }
    });
})
