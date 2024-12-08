import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser, deleteUser } from "../services/userService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const UserUpdateForm = () => {
    const [userId, setUserId] = useState("");
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, formData);
            setMessage("User updated successfully!");
        } catch (error) {
            setMessage("Error updating user.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
            setMessage("User deleted successfully!");
            setFormData({ username: "", email: "", password: "" });
        } catch (error) {
            setMessage("Error deleting user.");
        }
    };

    return (
        <div className="p-d-flex p-jc-center p-mt-5">
            <Card title="Update User Details" className="card-centered">
                <div className="p-field">
                    <label htmlFor="userId">User ID</label>
                    <InputText
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        required
                    />
                </div>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="New Username"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="New Email"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <InputText
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="New Password"
                            type="password"
                        />
                    </div>
                    <Button label="Update" icon="pi pi-check" className="p-button-success p-mt-3" type="submit" />
                </form>
                <div className="button-group">
                    <Button
                        label="Delete User"
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={handleDelete}
                    />
                    <Link to="/">
                        <Button label="Back to Home" icon="pi pi-arrow-left" className="p-button-secondary" />
                    </Link>
                </div>
                {message && <p className="p-mt-3">{message}</p>}
            </Card>
        </div>
    );
};

export default UserUpdateForm;
