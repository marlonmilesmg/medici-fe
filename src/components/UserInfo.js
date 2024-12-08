import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

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
            setUserData(null);
            setMessage("User not found.");
        }
    };

    return (
        <div className="p-d-flex p-jc-center p-mt-5">
            <Card title="View User Information" className="card-centered">
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
                <Button
                    label="Fetch User Info"
                    icon="pi pi-search"
                    className="p-button-info p-mt-3"
                    onClick={fetchUser}
                />
                {userData && (
                    <div className="p-mt-3">
                        <p><strong>ID:</strong> {userData.id}</p>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                    </div>
                )}
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

export default UserInfo;
