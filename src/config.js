const config = {
    apiUrl: {
        pokemons: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=30',
        abilities: 'https://pokeapi.co/api/v2/ability?offset=0&limit=400'
    },
    evolutions: (pokemonId) => `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`,
    detail: (pokemonName) => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
}

export default config;