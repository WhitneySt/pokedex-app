import { typesPokemon } from "../types/types";

const initialState = {
  pokemons: [],
  favorites: [],
  abilities: [],
  selected: []
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
    case typesPokemon.fillAbilities:
      return {
        ...state,
        abilities: [...action.payload.abilities]
      }
    case typesPokemon.addPokemon:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case typesPokemon.updatePokemon:
      return {
        ...state,
        editPokemonError: action.payload.error,
        favorites: state.favorites.map(favorite => {
          const originalItem = favorite;
          if (favorite.firestoreId === action.payload.firestoreId) {
            originalItem.height = action.payload.height;
            originalItem.weight = action.payload.weight;
            originalItem.abilities = action.payload.abilities;
          }

          return originalItem
        })
      }
    case typesPokemon.deletePokemon:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.firestoreId !== action.payload.id
        ),
      };
    case typesPokemon.selectPokemon:
      return {
        ...state,
        selected: state.pokemons.filter(p => p.name === action.payload.name)
      }
    case typesPokemon.clearSearch:
      return {
        ...state,
        selected: []
      }
    case typesPokemon.error:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
