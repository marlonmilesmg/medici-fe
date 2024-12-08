import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../services/userService";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const UserForm = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            setMessage("User registered successfully!");
        } catch (error) {
            setMessage("Error registering user.");
        }
    };

    return (
        <div className="p-d-flex p-jc-center p-mt-5">
            <Card title="Register User" className="card-centered">
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <Password
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            toggleMask
                            required
                        />
                    </div>
                    <Button label="Register" icon="pi pi-user-plus" className="p-button-success p-mt-4" type="submit" />
                </form>
                {message && <p className="p-mt-3">{message}</p>}
                <div className="button-group">
                    <Link to="/">
                        <Button label="Back to Home" icon="pi pi-arrow-left" className="p-button-secondary" />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default UserForm;
