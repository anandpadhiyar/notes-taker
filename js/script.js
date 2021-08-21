// console.log('Hello world');
showNotes();
document.querySelector('.note-btn').addEventListener('click', addNote);
document.querySelector('.searchbar').addEventListener('input', filterResult);

function filterResult() {
    let searchBar = document.querySelector('.searchbar');
    let searchTerm = searchBar.value.toLowerCase();
    let cards = document.querySelectorAll('.my-card');
    Array.from(cards).forEach(function(card) {
        let cardText = card.querySelector('.card-header').innerText.toLowerCase();
        console.log(cardText);
        if (cardText.includes(searchTerm)) {
            card.style.display = 'inline-block';
        }
        else {
            card.style.display = 'none';
        }
    });
    console.log(searchTerm);
}

function addNote() {
    // console.log('Button clicked');
    let data = JSON.parse(localStorage.getItem('data'));
    if (data == null) {
        data = [];
    }
    let newItem = document.querySelector('.note-input').value;
    data.push(newItem);
    localStorage.setItem('data', JSON.stringify(data));
    document.querySelector('.note-input').value = '';
    document.querySelector('.notes-view').innerHTML = '';
    showNotes();
}

function showNotes() {
    let data = JSON.parse(localStorage.getItem('data'));
    let notesView = document.querySelector('.notes-view');
    let nothingToShow = document.createElement('div');
    nothingToShow.classList.add('nothing-to-show');
    nothingToShow.innerHTML = '<p>There is no notes added currently, If you want to add one then click on Add your notes!!</p>';
    
    if (data == null || data.length == 0) {
        notesView.appendChild(nothingToShow);
    }
    else {
        let html;
        
        data.forEach(function (element, index) {
            let div = document.createElement('div');
            div.setAttribute('class', 'my-card');
            // console.log(element);  
            html = `
            <p class="card-desc">Notes ${index + 1}</p>
            <h2 class="card-header">${element}</h2>
            <button id="delete-button-${index}" onclick="deleteItem(${index})" class="delete-note">Delete</button>
            `;
           div.innerHTML = html;
            notesView.appendChild(div);
        });
    }
}

function deleteItem(index) {
    let data = JSON.parse(localStorage.getItem('data'));
    data.splice(index, 1);
    localStorage.setItem('data',JSON.stringify(data));
    document.querySelector('.notes-view').innerHTML = '';
    showNotes();
}