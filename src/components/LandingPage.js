import React from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const LandingPage = () => {
    return (
        <div className="p-d-flex p-jc-center p-mt-5">
            <Card title="Welcome to User Management" className="card-centered">
                <p>Manage your users with ease. Choose an action below:</p>
                <div className="button-group">
                    <Link to="/register">
                        <Button label="Register User" icon="pi pi-user-plus" className="p-button-success" />
                    </Link>
                    <Link to="/user-info">
                        <Button label="View User Info" icon="pi pi-eye" className="p-button-info" />
                    </Link>
                    <Link to="/update-user">
                        <Button label="Update User" icon="pi pi-pencil" className="p-button-warning" />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default LandingPage;
