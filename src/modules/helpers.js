import { collection, query, where, getDocs } from "firebase/firestore";
import { dataBase } from "../Firebase/firebaseConfig";
import axios from "axios";

export const getPokemonByNameFromDatabase = (name) => {
    return new Promise((resolve, reject) => {
        try {
            const collectionUsers = collection(dataBase, "pokemons");
            const querySnapshot = query(collectionUsers, where("name", "==", name));
            getDocs(querySnapshot).then(documents => {
                documents.forEach((document) => {
                    return resolve({
                        firestoreId: document.id,
                        ...document.data()
                    });
                });
            })
        } catch (error) {
            return reject(error);
        }
    })
}


export const HttpGet = (url) => {
    return new Promise((resolve, reject) => {
        axios(url)
            .then(({ data }) => {
                return resolve(data);
            }).catch(error => {
                console.log(error);
                return reject(error);
            });
    });
}

// return an array ordered from the first to the last evolution
//https://stackoverflow.com/questions/39112862/pokeapi-angular-how-to-get-pokemons-evolution-chain
export const MapEvolutions = (chain) => {
    const evolutionsChain = [];
    // let evolutionsData = response.data.chain;
    let evolutionsData = chain;

    do {
        const evolutionDetails = evolutionsData['evolution_details'][0];

        evolutionsChain.push({
            "species_name": evolutionsData.species.name,
            "min_level": !evolutionDetails ? 1 : evolutionDetails.min_level,
            "trigger_name": !evolutionDetails ? null : evolutionDetails.trigger.name,
            "item": !evolutionDetails ? null : evolutionDetails.item
        });

        evolutionsData = evolutionsData['evolves_to'][0];
    } while (!!evolutionsData && evolutionsData.hasOwnProperty('evolves_to'));

    return evolutionsChain;
}