import vsOpenTemplate from '../template/vs-open/vs-open.hbs';
import ep from '../template/vs-open/ep.hbs';
import mp from '../template/vs-open/mp.hbs';
import hj from '../template/vs-open/hj.hbs';
import co from '../template/vs-open/co.hbs';
import bu from '../template/vs-open/btn.hbs';
import sb from '../template/vs-open/sb.hbs';
import images from '../images/vsOpen/*/*/*.jpg'

const mainList = document.querySelector('.header__list')
const vsOpenBtn = document.querySelector('[data="vs-open"]')
const resImg = document.querySelector('.lightbox__image')
const divBox = document.querySelector('.js-lightbox')
const backdropDiv = document.querySelector('.lightbox__overlay')
const homeBtn = document.querySelector('.home__btn')
const boxContent = document.querySelector('.js-box-content')


let oppBox = '';
let raiser = '';
let stackBB = '';
let pos = '';


vsOpenBtn.addEventListener('click', () => {
    mainList.classList.add('visually-hidden')
    boxContent.insertAdjacentHTML ('beforeend', vsOpenTemplate());

    const stackBox = document.querySelector('.stack__box')
    const posBox = document.querySelector('.pos__box')

    raiser = document.querySelector('[data="vs-open"]')
    oppBox = document.querySelector('.opp__content')

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

    if(pos === 'ep') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', ep());
        addRaiser()
    }

    if(pos === 'mp') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', mp());
        addRaiser()
    }

    if(pos === 'hj') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', hj());
        addRaiser()
    }

    if(pos === 'co') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', co());
        addRaiser()
    }

    if(pos === 'bu') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', bu());
        addRaiser()
    }

    if(pos === 'sb') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', sb());
        addRaiser()
    }

    function addRaiser() { 
        document.querySelector('[data="raiser"]').addEventListener('click', onSelectRaiser) 
    }
}

function onSelectRaiser(e) {
    const optionIndexRaiser = e.target.options.selectedIndex
    raiser = e.target.options[optionIndexRaiser].value
    console.log(raiser)
}


function openModal () {
    const btnGenerate = document.querySelector('[data="generate"]')
    btnGenerate.addEventListener('click', onClickGenerateBtn)
}

function onClickGenerateBtn() {
    resImg.src=`${images[stackBB][pos][raiser]}`;
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