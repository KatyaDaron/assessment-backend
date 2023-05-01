const complimentBtn = document.getElementById("complimentButton");
const container = document.querySelector(".container");

//creating button to get a random fortune
const fortuneBtn = document.createElement('button');
fortuneBtn.id = 'fortuneButton';
fortuneBtn.textContent = 'Reveal Your Fortune';
container.appendChild(fortuneBtn);

//creating main heading
const titleBoard = document.createElement('h1');
titleBoard.textContent = 'Find Inspiration Here';
container.insertBefore(titleBoard, complimentBtn);

//creating form element to hold heading and 'add photo' functionality
const form = document.createElement('form');
form.innerHTML = `<h1>Create a Vision Board</h1>
    <input 
        type='text'
        id="caption"
        placeholder="What's the image caption?"/>
    <input 
        type='text'
        id="img"
        placeholder='Paste an image URL'/>
    <button id="addButton">Add Photo</button>`
container.appendChild(form);
const formSubmit = document.querySelector('form');

//creating section element to hold photo collection
const phContainer = document.createElement('section');
container.appendChild(phContainer);
const photosContainer = document.querySelector('section');

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
}

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
        .catch(error => console.log(error));
}

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);

//quotes API
async function fetchData() {
    const options = {
      method: 'GET',
      url: 'https://quotes15.p.rapidapi.com/quotes/random/',
      headers: {
        'content-type': 'application/octet-stream',
        //personal key should be hidden for security purposes, will be deactivated
        'X-RapidAPI-Key': '8672b716camshf059860128dfe30p10b631jsnbad9eab019e5',
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        const quote = response.data.content;
        const author = response.data.originator.name;
        displayQuote(quote, author);
    } catch (error) {
        console.error(error);
    }
}
    
function displayQuote(quote, author) {
    const quoteContainer = document.createElement('div');
    quoteContainer.id = 'quote-container';
    quoteContainer.textContent = `${quote}\n- ${author} -`;
    container.insertBefore(quoteContainer, form);
    const titleQuote = document.createElement('h1');
    titleQuote.textContent = 'Quote Of The Day';
    container.insertBefore(titleQuote, quoteContainer);
}  
    
fetchData();

const getAllPhotos = () => {
    axios.get(`http://localhost:4000/api/photo`)
        .then(res => {
            displayPhotos(res.data);
        })
        .catch(err => console.log(err));
}

const createPhoto = body => {
    axios.post(`http://localhost:4000/api/photo`, body)
        .then(res => {
        displayPhotos(res.data);
        })
        .catch(err => console.log(err));
}

const deletePhoto = id => {
    axios.delete(`http://localhost:4000/api/photo/${id}`)
        .then(res => {
            displayPhotos(res.data);
        })
        .catch(err => console.log(err));
}

const updatePhoto = (id, type) => {
    axios.put(`http://localhost:4000/api/photo/${id}`, {type})
    .then(res => {
        displayPhotos(res.data);
    })
    .catch(err => console.log(err));
}

function submitHandler(e) {
    e.preventDefault()

    let img = document.querySelector('#img');
    let caption = document.querySelector('#caption');

    let bodyObj = {
        img: img.value,
        rating: 0,
        caption: caption.value,
    }

    createPhoto(bodyObj);

    img.value = '';
    caption.value = '';
}

function displayPhotos(arr) {
    photosContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createPhotoCard(arr[i])
        console.log(arr[i])
    }
}

function createPhotoCard(photo) {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');

    photoCard.innerHTML = `
    <button onclick="deletePhoto(${photo.id})">X</button>
    <img alt='photo' src=${photo.imageURL} class="photo-cover"/>
    <p class="photo-caption">${photo.caption}</p>
    <div class="btns-container">
        <button onclick="updatePhoto(${photo.id}, 'minus')">-</button>
        <p class="photo-rating">${photo.rating} &#10084;</p>
        <button onclick="updatePhoto(${photo.id}, 'plus')">+</button>
    </div>
    `
    photosContainer.appendChild(photoCard);
}

formSubmit.addEventListener('submit', submitHandler)
getAllPhotos();

const searchByQuery = document.createElement('div');
searchByQuery.classList.add('search-result');

searchByQuery.innerHTML = `
<h1>Search for Photos from Your Collection</h1>
<input 
    type='text'
    id="query"
    placeholder="Seach by caption">
<button id="searchButton">Search</button>`;

container.appendChild(searchByQuery);

const searchBtn = document.querySelector('#searchButton');

const performSearch = () => {
    const existingPictures = searchByQuery.getElementsByClassName('photo');
    while (existingPictures.length > 0) {
        existingPictures[0].remove();
    }

    const existingP = searchByQuery.querySelector('p');
    if (existingP) {
        existingP.remove();
    }

    const query = document.getElementById('query').value;
    
    axios.get(`http://localhost:4000/api/photo/search?caption=${query}`)
    .then(res => {
        console.log(res.data)
        if(res.data.length === 0) {
            const p = document.createElement('p');
            p.textContent = `Sorry...there is no match.`
            searchByQuery.appendChild(p);
        } else {
            res.data.forEach(photo => {
                const section = document.createElement('section');
                section.classList.add('photo')
                
                section.innerHTML = `
                <img alt='photo' src=${photo.imageURL} class="photo-cover"/>
                <p class="photo-caption">${photo.caption}</p>
                `
                searchByQuery.appendChild(section);
            })
        }
    })
    .catch(err => console.log(err));
}

searchBtn.addEventListener('click', performSearch);