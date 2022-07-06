import { typesPokemon } from "../types/types";
import { HttpGet, MapEvolutions } from "../../modules/helpers";
import config from "../../config";

export const fillAsync = () => {
    return (dispatch) => {
        HttpGet(config.apiUrl)
            .then(async (response) => {
                const detailsPromises = [];
                for (const item of response.results) {
                    const pokemon = await HttpGet(config.detail(item.name));
                    const species = await HttpGet(pokemon.species.url);
                    let evolutions = await HttpGet(species.evolution_chain.url);
                    detailsPromises.push({
                        ...pokemon,
                        evolutions: MapEvolutions(evolutions.chain)
                    });
                }

                const details = await Promise.all(detailsPromises)

                dispatch(fillSync({
                    data: {
                        next: response.next || '',
                        count: response.count || '',
                        results: details
                    }, error: false
                }));
            })
            .catch(error => {
                console.log(error);
                dispatch(fillSync({ error: true }));
            });
    }
}


export const fillSync = ({ data, error }) => {
    return {
        type: typesPokemon.fill,
        payload: {
            next: data.next || '',
            count: data.count || '',
            results: data.results,
            error
        }
    }
}