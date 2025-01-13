import React from 'react';
import "../../styles/MainPage.css";

export const MainPage = ({ userEmail }) => {
    return (
        <div className="container mt-5">
            <div className="jumbotron text-center p-5 shadow-lg rounded">
                <h1 className="display-4 text-primary">Welcome to the Main Page</h1>
                <p className="lead text-muted">You are logged in as:</p>
                <h3 className="font-weight-bold text-success">{userEmail}</h3>
            </div>
        </div>
    );
};