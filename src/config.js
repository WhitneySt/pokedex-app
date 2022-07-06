const config = {
    // apiUrl: 'https://workshop-2-ag.herokuapp.com/pokemons',
    // detail: (pokemonName) => `https://workshop-2-ag.herokuapp.com/pokemon`,
    // evolutions: (pokemonId) => `https://workshop-2-ag.herokuapp.com/evolutions`,
    apiUrl: 'https://pokeapi.co/api/v2/pokemon',
    evolutions: (pokemonId) => `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`,
    detail: (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
}

export default config;