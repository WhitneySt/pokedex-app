import '@testing-library/jest-dom';
import { loginReducers } from '../redux/reducers/loginReducers';
import { typesLogin } from '../redux/types/types';

describe('Verificar reducer del Login', () => {

    test('Login usuario por email y contraseña', () => {
        const action = {
            type: typesLogin.login,
            payload: {
                email: 'whitneystena418@gmail.com',
                password: '123',
                displayName: 'Whitney',
                accessToken: null,
                photoURL: null,
                phoneNumber: null,
                error: false
            }
        }

        const state = loginReducers({}, action);
        const expectedObject = {
            email: action.payload.email,
            password: action.payload.password,
            displayName: action.payload.displayName,
            accessToken: action.payload.accessToken,
            photoURL: action.payload.photoURL,
            phoneNumber: action.payload.phoneNumber,
            error: action.payload.error
        };

        expect(state).toEqual(expectedObject);
    });

    test('Login usuario usando google o facebook', () => {
        const action = {
            type: typesLogin.loginGoogleAndFacebook,
            payload: {
                email: 'whitneystena418@gmail.com',
                displayName: 'Whitney',
                accessToken: null,
                photoURL: null,
                phoneNumber: null,
            }
        }

        const state = loginReducers({}, action);
        const expectedObject = {
            email: action.payload.email,
            password: action.payload.password,
            displayName: action.payload.displayName,
            accessToken: action.payload.accessToken,
            photoURL: action.payload.photoURL,
            phoneNumber: action.payload.phoneNumber,
            error: action.payload.error
        };

        expect(state).toEqual(expectedObject);

    });

    test('Logout deberia sacar al usuario y modificar el state dejando solo una propiedad authenticated en false', () => {
        const initialState = {
            email: 'whitneystena418@gmail.com',
            displayName: 'Whitney',
            accessToken: null,
            photoURL: null,
            phoneNumber: null,
        }
        const action = {
            type: typesLogin.logout
        }

        const state = loginReducers(initialState, action);
        const expectedObject = { authenticated: false };
        expect(state).toEqual(expectedObject);
    });

    test('Authenticated deberia modificar el state dejandolo igual pero agregando dos propiedades authenticated y error', () => {
        const initialState = {
            email: 'whitneystena418@gmail.com',
            displayName: 'Whitney',
            accessToken: null,
            photoURL: null,
            phoneNumber: null,
        }
        const action = {
            type: typesLogin.authenticated
        }

        const state = loginReducers(initialState, action);
        const expectedObject = {
            ...initialState,
            error: undefined,
            authenticated: true
        };
        expect(state).toEqual(expectedObject);
    });

    test('updateUserInfo deberia modificar el state dejandolo igual pero agregando las propiedades que vienen en el payload', () => {
        const initialState = {
            email: 'whitneystena418@gmail.com',
        }
        const action = {
            type: typesLogin.updateUserInfo,
            payload: {
                displayName: 'Whitney',
                accessToken: null,
                photoURL: null,
                phoneNumber: null,
            }
        }

        const state = loginReducers(initialState, action);
        const expectedObject = {
            ...initialState,
            ...action.payload
        };
        expect(state).toEqual(expectedObject);
    });

});