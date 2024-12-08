import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserForm from "./components/UserForm";
import UserInfo from "./components/UserInfo";
import UserUpdateForm from "./components/UserUpdateForm";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";


const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<UserForm />} />
                    <Route path="/user-info" element={<UserInfo />} />
                    <Route path="/update-user" element={<UserUpdateForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
