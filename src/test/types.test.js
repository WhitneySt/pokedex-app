import '@testing-library/jest-dom';
import { typesLogin, typesPokemon, typesRegister } from '../redux/types/types';

describe('Verificar types', () => {
    test('TypesLogin debe ser un objeto', () => {
        const expectedObject = {
            login: '[Login] login',
            loginGoogleAndFacebook: '[Login] loginGoogleAndFacebook',
            logout: '[Login] logout',
            authenticated: '[login] authenticated',
            updateUserInfo: '[login] updateUserInfo',
            completeUserInfo: '[login] completeUserInfo'
        };

        expect(typesLogin).toEqual(expectedObject);
    });

    test('TypesPokemon debe ser un objeto', () => {
        const expectedObject = {
            fill: '[Pokemon] fill',
            fillFavorites: '[Pokemon] fillFavorites',
            fillAbilities: '[Pokemon] fillAbilities',
            addPokemon: '[Pokemon] addPokemon',
            updatePokemon: '[Pokemon] updatePokemon',
            deletePokemon: '[Pokemon] deletePokemon',
            clearSearch: '[Pokemon] clearSearch',
            selectPokemon: '[Pokemon] selectPokemon',
            error: '[Pokemon] error',
        };

        expect(typesPokemon).toEqual(expectedObject);
    });

    test('TypesRegister debe ser un objeto', () => {
        const expectedObject = {
            register: '[Register-Usuario] register',
            clear: '[Register-Clear] clear'
        };

        expect(typesRegister).toEqual(expectedObject);
    });

})