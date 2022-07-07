import '@testing-library/jest-dom';
import { registerReducers } from '../redux/reducers/registerReducers';
import { typesRegister } from '../redux/types/types';


describe('Verificar reducer del Register', () => {
    test('deberia registrar un usuario', () => {
        const action = {
            type: typesRegister.register,
            payload: {
                id: 1,
                fullname: "Whitney stevenson",
                email: "whitneystena418@gmail.com",
                password: "Welcome1",
                phone: "3043867279",
                error: false
            }
        }

        const state = registerReducers({}, action);
        const expectedObject = {
            id: action.payload.id,
            fullname: action.payload.fullname,
            email: action.payload.email,
            password: action.payload.password,
            phone: action.payload.phone,
            error: action.payload.error
        };

        expect(state).toEqual(expectedObject);
    });

    test('deberia limpiar el state cuando se llame el action de clear', () => {
        const initialState = {
            id: 1,
            fullname: "Whitney stevenson",
            email: "whitneystena418@gmail.com",
            password: "Welcome1",
            phone: "3043867279",
            error: false
        }

        const action = {
            type: typesRegister.clear,
        }

        const state = registerReducers(initialState, action);
        const expectedObject = {};
        expect(state).toEqual(expectedObject);
    });

});