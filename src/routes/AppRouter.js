import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { authentication } from "../Firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";
import Login from "../containers/Login";
import Register from "../containers/Register";
import DashboardRouters from "./DashboardRouters";
import PublicRouters from "./PublicRouters";
import PrivateRouters from "./PrivateRouters";
import { useSelector } from "react-redux";
import '../styles/styles.css'

const AppRouter = () => {
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(undefined);
    const { authenticated } = useSelector(store => store.loginStore);


    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            if (user?.uid && authenticated) {
                setIsLoggedIn(true);

                user.getIdToken()
                    .then((token) => {
                    })
            } else {
                setIsLoggedIn(false);
            }
        })
        setCheking(false);
    }, [authenticated, setIsLoggedIn, setCheking])

    if (cheking) {
        return (
            <h1>Espere....</h1>
        )
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRouters isAutentication={isLoggedIn}>
                        <Login />
                    </PublicRouters>

                } />

                <Route path="/register" element={
                    <PublicRouters isAutentication={isLoggedIn}>
                        <Register />
                    </PublicRouters>

                } />

                <Route path="/*" element={
                    <PrivateRouters isAutentication={isLoggedIn}>
                        <DashboardRouters />
                    </PrivateRouters>
                } />

            </Routes>
        </BrowserRouter >
    )
}

export default AppRouter;