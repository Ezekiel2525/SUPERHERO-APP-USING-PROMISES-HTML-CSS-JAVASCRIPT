const ACCESS_TOKEN = '8f2559346b5024ca1c64488a284f5748';
const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}`;

const SearchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('searchbtn');
const heroTextName = document.getElementById('herotextname');
const heroContainer = document.getElementById('herocontainer');
const heroDetails = document.getElementById('herodetails');
const randomBtn = document.getElementById('randombtn');


const stattoEmoji = {
    intelligence : '🧠',
    strength : '💪',
    speed : '⚡',
    durability : '🏋️',
    power : '📊',
    combat : '⚔️'
}


const getHeroInfo = (character) => {
    const stats = Object.keys(character.powerstats).map((stat) =>{
        return `<p>${stattoEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    }).join('');

    heroTextName.innerHTML = `<p class="herotext">${character.name}</p>`;
    heroContainer.innerHTML = ` <img class="heroimg" src="${character.image.url}" alt="">`;
    heroDetails.innerHTML = `${stats}`;
    heroContainer.appendChild(heroDetails);
    SearchInput.value = '';
};



const searchedSuperHero = (name) => {
    const seachedHeroURL = fetch(`${BASE_URL}/search/${name}`);
    seachedHeroURL.then((response) => response.json())
    .then((json) => { 
        getHeroInfo(json.results[0])
    });
}

searchBtn.addEventListener('click', () => searchedSuperHero(SearchInput.value));




const getRandomSuperHero = (id) => {
    const superHeroURL = fetch(`${BASE_URL}/${id}`);
    superHeroURL.then((response) => response.json())
    .then((json) => {
        getHeroInfo(json)
    }); 
};

const randomChoice = () => {
    let numofHeroes = 731;
    return Math.floor(Math.random() * numofHeroes) + 1;
};

randomBtn.addEventListener('click', () => getRandomSuperHero(randomChoice()));