import bvbTemplate from '../template/bvb/bvb.hbs';
import bvbBB from '../template/bvb/bb.hbs';
import bvbSB from '../template/bvb/sb.hbs';
import images from '../images/bvb/*/*/*.jpg'

const mainList = document.querySelector('.header__list')
const bvbBtn = document.querySelector('[data="bvb"]')
const resImg = document.querySelector('.lightbox__image')
const divBox = document.querySelector('.js-lightbox')
const backdropDiv = document.querySelector('.lightbox__overlay')
const closeBtn = document.querySelector('[data-action="close-lightbox"]')
const homeBtn = document.querySelector('.home__btn')
const boxContent = document.querySelector('.js-box-content')

let actionBox = ''
let stackBB = '';
let pos = '';
let action = '';

bvbBtn.addEventListener('click', () => {
    mainList.classList.add('visually-hidden')
    boxContent.insertAdjacentHTML ('beforeend', bvbTemplate());

    const stackBox = document.querySelector('.stack__box')
    const posBox = document.querySelector('.pos__box')
    actionBox = document.querySelector('.action__content-box')
    

    stackBox.addEventListener('click', onClickStackBtn)
    posBox.addEventListener('click', onClickPositionBtn)
    actionBox.addEventListener('click', onClickActionBtn)

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

    if(pos === 'bb') {
        actionBox.innerHTML = ''
        actionBox.insertAdjacentHTML ('beforeend', bvbBB());
    }

    if(pos === 'sb') {
        actionBox.innerHTML = ''
        actionBox.insertAdjacentHTML ('beforeend', bvbSB());

        const betInput = document.querySelector('[data="3bet-label"]')
        
        if(stackBB > 25) {
            betInput.classList.remove('visually-hidden')
        }
    }
}

function onClickActionBtn(e) {
    if(e.target.nodeName !== 'INPUT') { 
        return
    }
    e.stopPropagation();
    action = e.target.value
}


function openModal () {
    const btnGenerate = document.querySelector('[data="generate"]')
    btnGenerate.addEventListener('click', onClickGenerateBtn)
}

function onClickGenerateBtn() {
    console.log(pos)
    console.log(stackBB)
    console.log(action)

    resImg.src=`${images[pos][stackBB][action]}`
    divBox.classList.add('is-open')
    closeBtn.addEventListener('click', onCloseBtnClick);
}

function onCloseBtnClick() {
    divBox.classList.remove('is-open')
    resImg.src=''
    resImg.alt=''
    // window.removeEventListener('keydown', onEscKeyPress)
}

backdropDiv.addEventListener('click', onBackdropClick)
function onBackdropClick(ev) {
    if(ev.currentTarget === ev.target) {
        onCloseBtnClick()
    }
}