import { typesPokemon } from "../types/types";
import { dataBase } from "../../Firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { HttpGet, MapEvolutions } from "../../modules/helpers";
import config from "../../config";

export const fillAsync = () => {
  return async (dispatch) => {
    try {
      //   const collectionUsers = collection(dataBase, "pokemons");
      //   const querySnapshot = query(collectionUsers);

      //   const documents = await getDocs(querySnapshot);
      //   let details = [];
      //   documents.forEach((document) => {
      //     details.push({
      //       firestoreId: document.id,
      //       ...document.data(),
      //     });
      //   });

      //   if (details.length === 0) {
      const response = await HttpGet(config.apiUrl);
      const detailsPromises = [];
      for (const item of response.results) {
        const pokemon = await HttpGet(config.detail(item.name));
        const species = await HttpGet(pokemon.species.url);
        let evolutions = await HttpGet(species.evolution_chain.url);
        detailsPromises.push({
          ...pokemon,
          evolutions: MapEvolutions(evolutions.chain),
        });
      }

      const details = await Promise.all(detailsPromises);
      // for (const detail of details) {
      //   await addDoc(collection(dataBase, "pokemons"), detail);
      // }
      //   }

      dispatch(
        fillSync({
          data: {
            results: details,
          },
          error: false,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(fillSync({ error: true }));
    }
  };
};

export const fillSync = ({ data, error }) => {
  return {
    type: typesPokemon.fill,
    payload: {
      results: data.results,
      error,
    },
  };
};

export const fillFavoritesAsync = () => {
  return (dispatch) => {
    const collectionUsers = collection(dataBase, "pokemons");
    const querySnapshot = query(collectionUsers);
    getDocs(querySnapshot)
      .then((documents) => {
        const details = [];
        documents.forEach((document) => {
          details.push({
            firestoreId: document.id,
            ...document.data(),
          });
        });

        dispatch(
          fillFavoritesSync({
            data: {
              results: details,
            },
            error: false,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(fillFavoritesSync({ error: true }));
      });
  };
};

export const fillFavoritesSync = ({ data, error }) => {
  return {
    type: typesPokemon.fillFavorites,
    payload: {
      results: data.results,
      error,
    },
  };
};

export const addPokemonAsync = (pokemon) => {
  return (dispatch) => {
    addDoc(collection(dataBase, "pokemons"), pokemon)
      .then((docRef) => {
        dispatch(
          addPokemonSync({
            pokemon: {
              firestoreId: docRef.id,
              ...pokemon,
            },
          })
        );

        dispatch(errorSync({ error: false }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          errorSync({
            error: true,
          })
        );
      });
  };
};

export const addPokemonSync = (params) => {
  return {
    type: typesPokemon.addPokemon,
    payload: params.pokemon,
  };
};

export const errorSync = (params) => {
  return {
    type: typesPokemon.error,
    payload: {
      error: params.error,
    },
  };
};

export const deletePokemonAsync = (params) => {
  return (dispatch) => {
    deleteDoc(doc(dataBase, "pokemons", params.id))
      .then(() => {
        dispatch(deletePokemonSync({ id: params.id }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePokemonSync = (params) => {
  return {
    type: typesPokemon.deletePokemon,
    payload: {
      id: params.id,
    },
  };
};
