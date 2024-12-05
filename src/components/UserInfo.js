import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userService";

const UserInfo = () => {
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState("");

    const fetchUser = async () => {
        try {
            const response = await getUser(userId);
            setUserData(response.data);
            setMessage("");
        } catch (error) {
            setMessage("User not found.");
        }
    };

    return (
        <div>
            <h2>View User Information</h2>
            <input type="text" placeholder="Enter User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <button onClick={fetchUser}>Fetch</button>
            {userData && (
                <div>
                    <p><strong>ID:</strong> {userData.id}</p>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            )}
            {message && <p>{message}</p>}
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default UserInfo;
