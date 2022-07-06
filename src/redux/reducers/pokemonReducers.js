import { typesPokemon } from "../types/types";

const initialState = {
  pokemons: [],
  favorites: [],
};

export const pokemonReducers = (state = initialState, action) => {
  switch (action.type) {
    case typesPokemon.fill:
      return {
        ...state,
        pokemons: [...action.payload.results],
      };
    case typesPokemon.fillFavorites:
      return {
        ...state,
        favorites: [...action.payload.results],
      };
    case typesPokemon.addPokemon:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case typesPokemon.deletePokemon:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.firestoreId !== action.payload.id
        ),
      };
    case typesPokemon.error:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
