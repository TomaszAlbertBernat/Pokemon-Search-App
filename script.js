const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');

const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

searchButton.addEventListener('click', searchPokemon);

async function searchPokemon() {
    const searchTerm = searchInput.value.toLowerCase();
    
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        alert(error.message);
        clearPokemonInfo();
    }
}

function displayPokemonInfo(pokemon) {
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonId.textContent = `#${pokemon.id}`;
    weight.textContent = `Weight: ${pokemon.weight}`;
    height.textContent = `Height: ${pokemon.height}`;
    
    types.innerHTML = '';
    pokemon.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.textContent = type.type.name.toUpperCase();
        typeSpan.style.backgroundColor = typeColors[type.type.name];
        types.appendChild(typeSpan);
    });
    
    hp.textContent = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.textContent = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.textContent = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAttack.textContent = pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDefense.textContent = pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat;
    
    sprite.src = pokemon.sprites.front_default;
    sprite.style.display = 'inline-block';
}

function clearPokemonInfo() {
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.innerHTML = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
    sprite.src = '';
    sprite.style.display = 'none';
}