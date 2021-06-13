import bbTemplate from '../template/bb.hbs';
import images from '../images/bb/*/*.jpg'


const mainList = document.querySelector('.header__list')
const bbDefBtn = document.querySelector('[data="bb-def"]')
const resImg = document.querySelector('.lightbox__image')
const divBox = document.querySelector('.js-lightbox')
const backdropDiv = document.querySelector('.lightbox__overlay')
const homeBtn = document.querySelector('.home__btn')
const boxContent = document.querySelector('.js-box-content')



let stackBB = '';
let pos = '';

bbDefBtn.addEventListener('click', () => {
    mainList.classList.add('visually-hidden')
    boxContent.insertAdjacentHTML ('beforeend', bbTemplate());

    // const contentBox = document.querySelector('#bb')
    const stackBox = document.querySelector('.stack__box')
    const posBox = document.querySelector('.pos__box')

    stackBox.addEventListener('click', onClickStackBtn)
    posBox.addEventListener('click', onClickPositionBtn)

    openModal ();

    homeBtn.classList.remove('visually-hidden');
    homeBtn.addEventListener('click', () => {
        mainList.classList.remove('visually-hidden')
        boxContent.innerHTML = '';
        homeBtn.classList.add('visually-hidden');
    })
})

function onClickStackBtn(e) {
    if(e.target.nodeName !== 'INPUT') { 
        return
    }
    stackBB = e.target.value
}

function onClickPositionBtn(e) {
    if(e.target.nodeName !== 'INPUT') { 
        return
    }
    pos = e.target.value
}


function openModal () {
    const btnGenerate = document.querySelector('[data="generate"]')
    btnGenerate.addEventListener('click', onClickGenerateBtn)
}

function onClickGenerateBtn() {
    resImg.src=`${images[stackBB][pos]}`
    divBox.classList.add('is-open')
}

backdropDiv.addEventListener('click', onBackdropClick)
function onBackdropClick(ev) {
    if(ev.currentTarget === ev.target) {
        divBox.classList.remove('is-open')
        resImg.src=''
        resImg.alt=''
    }
}
