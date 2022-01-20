const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');

//add search bar to top of page
const searchContainerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>`
searchContainer.insertAdjacentHTML('beforeend', searchContainerHTML);

const searchInput = document.getElementById('search-input');

//fetch 12 ramdom users from api
fetch ('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => {
        displayUsers(data.results)
        cardListeners(data.results)
        searchContainer.addEventListener('keyup', () => {
            filterSearchResults(searchInput.value.toLowerCase(), data.results);
        })

    });
//display users in gallery
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
            displayModal(data[i], data);
        })
    }
 }

 function displayModal(user, data) {
    const cellNumb = user.cell;
    //use regex to format cell number to '(111) 111-1111'
    const cellFormat = cellNumb.replace(/^(\(\d{3}\))-(\d{3})-(\d{4})$/ig, '$1 $2-$3')
    const dob = user.dob.date;
    //use regex to format birthday to 'mm/dd/yyyy'
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
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
            </div>
        </div>
    </div>`
    body.insertAdjacentHTML('beforeend', bodyHTML);

    //create event listeners for displayed modal
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', () => {
        removeModal();
    });
    const prevModal = document.getElementById('modal-prev');
    const nextModal = document.getElementById('modal-next');
    prevModal.addEventListener('click', () => {
        switchModalPrev(user, data);
    })
    nextModal.addEventListener('click', () => {
        switchModalNext(user, data);
    })
 }
//display modal for previous user profile when 'prev' button is clicked
 function switchModalPrev(user, data) {
    let index = data.indexOf(user);
    if (index > 0) {
        removeModal();
        index--;
        displayModal(data[index], data);
    }
 }
//display modal for next user profile when 'next' button is clicked
 function switchModalNext(user, data) {
     let index = data.indexOf(user);
     if (index < data.length - 1) {
        removeModal();
        index++;
        displayModal(data[index], data);
     }
 }

 function removeModal() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.remove();
    
 }
//pass new array of filtered users whose names include search input to displayUsers()
 function filterSearchResults(input, users) {
     const userArray = users.filter(user => {
         const fullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
         if (fullName.includes(input)) {
             return user;
         }
     });
     displayUsers(userArray);
     cardListeners(userArray);
 }
