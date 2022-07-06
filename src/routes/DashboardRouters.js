import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../containers/Home';


const DashboardRouters = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    );
};

export default DashboardRouters;