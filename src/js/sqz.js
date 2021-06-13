import sqzTemplate from '../template/sqz/sqz.hbs';
import sqzCO from '../template/sqz/co.hbs';
import sqzBU from '../template/sqz/bu.hbs';
import sqzSB from '../template/sqz/sb.hbs';
import sqzBB from '../template/sqz/bb.hbs';
import images from '../images/sqz/*/*/*.jpg'

const mainList = document.querySelector('.header__list')
const sqzBtn = document.querySelector('[data="sqz"]')
const resImg = document.querySelector('.lightbox__image')
const divBox = document.querySelector('.js-lightbox')
const backdropDiv = document.querySelector('.lightbox__overlay')
const homeBtn = document.querySelector('.home__btn')
const boxContent = document.querySelector('.js-box-content')


let oppBox = '';
let raiser = '';
let caller = '';
let stackBB = '';
let pos = '';
let opponents = ''

sqzBtn.addEventListener('click', () => {
    mainList.classList.add('visually-hidden')
    boxContent.insertAdjacentHTML ('beforeend', sqzTemplate());

    // const contentBox = document.querySelector('#sqz')
    const stackBox = document.querySelector('.stack__box')
    const posBox = document.querySelector('.pos__box')

    raiser = document.querySelector('[data="raiser"]')
    caller = document.querySelector('[data="caller"]')
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

    if(pos === 'co') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', sqzCO());
        addRaiserAndCaller()
    }

    if(pos === 'bu') {
        opponents = ''
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', sqzBU());
        addRaiserAndCaller()
    }

    if(pos === 'sb') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', sqzSB());
        addRaiserAndCaller()
    }

    if(pos === 'bb') {
        oppBox.innerHTML = ''
        oppBox.insertAdjacentHTML ('beforeend', sqzBB());
        addRaiserAndCaller()
    }
    function addRaiserAndCaller() {
        document.querySelector('[data="raiser"]').addEventListener('click', onSelectRaiser)
        document.querySelector('[data="caller"]').addEventListener('click', onSelectCaller)
    }
}

function onSelectRaiser(e) {
    const optionIndexRaiser = e.target.options.selectedIndex
    raiser = e.target.options[optionIndexRaiser].value
}

function onSelectCaller(e) {
    const optionIndexCaller = e.target.options.selectedIndex
    caller = e.target.options[optionIndexCaller].value
}

function openModal () {
    const btnGenerate = document.querySelector('[data="generate"]')
    btnGenerate.addEventListener('click', onClickGenerateBtn)
}

function onClickGenerateBtn() {
    opponents = `${raiser}-${caller}`
    resImg.src=`${images[stackBB][pos][opponents]}`;
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