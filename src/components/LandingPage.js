import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to User Management</h1>
            <nav>
                <ul>
                    <li><Link to="/register">Register User</Link></li>
                    <li><Link to="/user-info">View User Information</Link></li>
                    <li><Link to="/update-user">Update User Details</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default LandingPage;
