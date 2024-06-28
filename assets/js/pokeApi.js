const pokeapi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.order;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;


    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon

}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeapi.getPokemons = (offset = 0, limit = 5) => {
        const urlBase = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        
        return fetch(urlBase)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonDetails) => pokemonDetails);
    }

