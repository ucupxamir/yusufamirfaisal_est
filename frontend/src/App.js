import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KaryawanList from './screens/KaryawanList';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<KaryawanList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
