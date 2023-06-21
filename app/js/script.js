const body = document.querySelector('.body');
const burgerBtn = body.querySelector('.burger');
const menu = body.querySelector('.menu');
const header = body.querySelector('.header');
const contactsBtn = [...body.querySelectorAll('[href="#contacts"]')];

contactsBtn.forEach((element) => [
    element.addEventListener('click', () => {
        burgerBtn.classList.remove('burger--open');
        menu.classList.remove('menu--open');
        body.classList.remove('body--hidden');

    })
]);

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger--open');
    menu.classList.toggle('menu--open');
    body.classList.toggle('body--hidden');
});

let previousPosition = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentPosition = window.pageYOffset;

    if (currentPosition !== 0) {
        header.classList.add('header--glass');
    } else {
        header.classList.remove('header--glass');
    }
});