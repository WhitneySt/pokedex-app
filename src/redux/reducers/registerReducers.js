import { typesRegister } from "../types/types"

export const registerReducers = (state = {}, action) => {
    switch (action.type) {
        case typesRegister.register:
            return {
                id: action.payload.id,
                fullname: action.payload.fullname,
                email: action.payload.email,
                password: action.payload.password,
                phone: action.payload.phone,
                error: action.payload.error
            }

        case typesRegister.clear:
            return {

            }
        default:
            return state
    }

}