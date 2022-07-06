import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Details from '../containers/Details';
import Home from '../containers/Home';
import Pokeball from '../containers/Pokeball';


const DashboardRouters = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/pokemon/:name" element={<Details />} />
                <Route path="/pokeball" element={<Pokeball />} />
            </Routes>
        </>
    );
};

export default DashboardRouters;