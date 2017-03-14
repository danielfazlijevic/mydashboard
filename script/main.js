const button = document.querySelector('button');
const form = document.querySelector('form');
const input = document.querySelector('input');
const settings = document.querySelector('.settings');
const cityset = document.querySelector('#changecity');
const setbutton = document.querySelector('#saveset');
const message = document.querySelector('.notif');
const addBookmark = document.querySelector('.addBookmark');

form.addEventListener('submit', (e) => {
    if (!input.value) {
        e.preventDefault();
        input.style.border = '2px solid red';
        console.error('Cannot be empty');
        setTimeout(() => input.style.borderColor = 'transparent', 1600);
    }
});

if (!localStorage.city) {
    localStorage.city = 'Belgrade';
}
console.log(localStorage.city);
if (!localStorage.pages) {
    var pages = [{
        name: 'EASY2MP3',
        url: 'http://www.danielfazlijevic.com/yt2mp3'
    }, {
        name: 'YouTube',
        url: '//youtube.com'
    }, {
        name: 'Portfolio',
        url: '//danielfazlijevic.com'
    }]
    localStorage.setItem('pages', JSON.stringify(pages));
}
var list = JSON.parse(localStorage.pages);
console.log(list);
list.forEach(function (el) {
    document.getElementById('pages').innerHTML += `<a href=${el.url}> ${el.name}</a> <br/>`;
    document.getElementById('bookmarks').innerHTML += `<li class='h4 left-align'> ${el.name} | <a href=${el.url}>${el.url}</a> <span onclick="this.remove()">X</span></li>`
})


function notif(text) {
    message.style.opacity = 1;
    message.innerHTML = text + ' <i class="fa fa-check-circle" aria-hidden="true"></i>';
    message.style.display = 'block';
    window.setTimeout(() => {
        message.style.opacity = 0;
    }, 4000);
    window.setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
    console.log('sent notification');
}


setbutton.addEventListener('click', (e) => {
    e.preventDefault();
    closeSettings();
    if (!cityset.value) return;
    localStorage.city = cityset.value;
    message.textContent = `City set to ${localStorage.city}`;
    notif(`City set to ${localStorage.city}`);
    console.log(`City set to ${localStorage.city}`);
    checkWeather();
});



function openSettings() {
    settings.style.display = 'inline-block';
    settings.style.opacity = 1;
    closeNav();
}
function openBookmarks() {
    addBookmark.style.display = 'inline-block';
    addBookmark.style.opacity = 1;
    closeNav();
}
function closeSettings() {
    settings.style.opacity = 0;
    window.setTimeout(() => settings.style.display = 'none', 1000);
}
function closeBookmarks() {
    addBookmark.style.opacity = 0;
    window.setTimeout(() => addBookmark.style.display = 'none', 1000);
}
function fadeOut(elem) {

    (elem.style.opacity -= .1) < 0.1 ? elem.display = "none" : setTimeout(fadeOut(elem), 100);
    console.log(`Faded out ${elem.name}`);
}


/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    console.log('opend');
    document.getElementById("main").style.marginRight = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
        console.log('closd');
         document.getElementById("main").style.marginRight = "0";
}