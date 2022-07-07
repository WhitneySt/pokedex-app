import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRouters = ({ isAutentication, children }) => {
    return !isAutentication ? children : <Navigate to="/home" />
}

export default PublicRouters