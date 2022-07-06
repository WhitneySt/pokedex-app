import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouters = ({ isAutentication, children }) => {

    return isAutentication ? children : <Navigate to="/login" />

}

export default PrivateRouters