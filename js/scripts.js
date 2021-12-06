const searchContainer = document.querySelector('search-container');
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    
    .then(data => {
        console.log(data.results)
        displayUsers(data)
        cardListeners(data.results)
    });

function displayUsers(data) {
    data.results.map(user => {
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
                        <p class="modal-text">${user.cell}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, 
                            ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${user.dob.date}</p>
                    </div>
                </div>`
    body.insertAdjacentHTML('beforeend', bodyHTML);
    const modalContainer = document.querySelector('.modal-container');
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    });
 }