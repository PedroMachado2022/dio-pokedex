const pokemonOl = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 5;
let offset = 0;

function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map(convertPokemonToHtml).join('');
        pokemonOl.innerHTML += newHtml;
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItems(offset, limit);
});
