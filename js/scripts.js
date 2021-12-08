const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');

const searchContainerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`
searchContainer.insertAdjacentHTML('beforeend', searchContainerHTML);

const searchInput = document.getElementById('search-input');

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => {
        displayUsers(data.results)
        cardListeners(data.results)
        searchContainer.addEventListener('keyup', () => {
            filterSearchResults(searchInput.value.toLowerCase(), data.results);
        })
    });

function displayUsers(data) {
    gallery.innerHTML = '';
    data.map(user => {
        const galleryHTML = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>`
        gallery.insertAdjacentHTML('beforeend', galleryHTML)
    })
}

 function cardListeners(data) {
    for (let i=0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            displayModal(data[i]);
        })
    }
 }

 function displayModal(user) {
    console.log(user)
    const cellNumb = user.cell;
    const cellFormat = cellNumb.replace(/^(\(\d{3}\))-(\d{3})-(\d{4})$/ig, '$1 $2-$3')
    const dob = user.dob.date;
    const dobFormat = dob.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/ig, '$2-$3-$1');
    const bodyHTML = `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${cellFormat}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, 
                            ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${dobFormat}</p>
                    </div>
                </div>`
    body.insertAdjacentHTML('beforeend', bodyHTML);
    const modalContainer = document.querySelector('.modal-container');
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    });
 }

 function filterSearchResults(input, users) {
     const userArray = [];
     users.filter(user => {
         const fullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`
         if (fullName.includes(input)) {
             userArray.push(user);
         }
         displayUsers(userArray);
         cardListeners(userArray);
         
     })
 }