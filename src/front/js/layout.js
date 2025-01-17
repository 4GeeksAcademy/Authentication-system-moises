import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { MainPage } from "./pages/MainPage";
import injectContext from "./store/appContext";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token || token === "null" || token === "undefined") {
        return <Navigate to="/" replace />;
    }

    return children;
};

const Layout = () => {
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
    const basename = process.env.BASENAME || "";

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    const onLoginSuccess = (token, email) => {
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", email);
            setUserEmail(email);
            window.location.href = "/MainPage";
        }
    };

    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setUserEmail("");
    };

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home onLoginSuccess={onLoginSuccess} />} path="/" />
                        <Route
                            path="/MainPage"
                            element={
                                <ProtectedRoute>
                                    <MainPage userEmail={userEmail} onLogout={onLogout} />
                                </ProtectedRoute>
                            }
                        />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
