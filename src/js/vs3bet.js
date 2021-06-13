import vs3betTemplate from '../template/vs3bet/vs3bet.hbs';
import mp from '../template/vs3bet/mp.hbs';
import hj from '../template/vs3bet/hj.hbs';
import co from '../template/vs3bet/co.hbs';
import bu from '../template/vs3bet/bu.hbs';
import images from '../images/vs3bet/*/*/*.jpg'

const mainList = document.querySelector('.header__list')
const vs3betBtn = document.querySelector('[data="vs3bet"]')
const resImg = document.querySelector('.lightbox__image')
const divBox = document.querySelector('.js-lightbox')
const backdropDiv = document.querySelector('.lightbox__overlay')
const closeBtn = document.querySelector('[data-action="close-lightbox"]')
const homeBtn = document.querySelector('.home__btn')
const boxContent = document.querySelector('.js-box-content')


let oppBox = '';
let raiser = '';
let stackBB = '';
let pos = '';


vs3betBtn.addEventListener('click', () => {
    mainList.classList.add('visually-hidden')
    boxContent.insertAdjacentHTML ('beforeend', vs3betTemplate());

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

    function addRaiser() { 
        document.querySelector('[data="raiser"]').addEventListener('click', onSelectRaiser) 
    }
}

function onSelectRaiser(e) {
    const optionIndexRaiser = e.target.options.selectedIndex
    raiser = e.target.options[optionIndexRaiser].value
}


function openModal () {
    const btnGenerate = document.querySelector('[data="generate"]')
    btnGenerate.addEventListener('click', onClickGenerateBtn)
}

function onClickGenerateBtn() {
    resImg.src=`${images[stackBB][pos][raiser]}`;
    divBox.classList.add('is-open')
    closeBtn.addEventListener('click', onCloseBtnClick);
}

function onCloseBtnClick() {
    divBox.classList.remove('is-open')
    resImg.src=''
    resImg.alt=''
}

backdropDiv.addEventListener('click', onBackdropClick)
function onBackdropClick(ev) {
    if(ev.currentTarget === ev.target) {
        onCloseBtnClick()
    }
}