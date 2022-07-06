import { typesPokemon } from "../types/types";

const initialState = {
    pokemons: []
};

export const pokemonReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesPokemon.fill:
            return {
                count: action.payload.count,
                next: action.payload.next,
                error: action.payload.error,
                pokemons: [...action.payload.results]
            }
        default:
            return state;
    }
}