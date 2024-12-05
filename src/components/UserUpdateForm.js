import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser, deleteUser } from "../services/userService";

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
        <div>
            <h2>Update User Details</h2>
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
            <button onClick={handleDelete} style={{ marginTop: "10px", color: "red" }}>
                Delete User
            </button>
            {message && <p>{message}</p>}
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default UserUpdateForm;
