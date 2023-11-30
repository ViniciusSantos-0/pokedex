const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 5;
let offset = 0;
let maxRecords = 10;

function convertPokemonTypesToHTML(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`);
}

function convertPolemonToHtml(pokemon) {
    const number = pokemon.number || '';
    const name = pokemon.name || '';
    const types = pokemon.types ? pokemon.types.map(type => `<li class="type ${type}" >${type}</li>`).join('') : '';
    const img = pokemon.img || '';

    return `<li class="pokemon ${pokemon.type}">
        <span class="number">${number}</span>
        <span class="name">${name}</span>
    
        <div class="detail">
            <ol class="types">
                ${types}
            </ol>
            <img src="${img}" alt="${name}">
        </div>
    </li>`;
}


function appendPokemonToList(pokemons) {
    const newHtml = pokemons.map(convertPolemonToHtml).join('');
    pokemonList.innerHTML += newHtml;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        appendPokemonToList(pokemons);
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});
