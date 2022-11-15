const burger = document.querySelector('.logo_block__burger')
let clicks = 0;
const links = document.querySelectorAll('.navigation_block__link')

burger.addEventListener('click', () => {
    clicks++;
    burger.classList.toggle('logo_block__burger__active')
    for(let link of links){
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

if(links.length){
    links.forEach(link => {
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