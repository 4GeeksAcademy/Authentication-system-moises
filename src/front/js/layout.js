import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { MainPage } from "./pages/MainPage";
import injectContext from "./store/appContext";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    console.log("Token actual:", token);

    if (!token || token === "null" || token === "undefined") {
        console.warn("Acceso denegado. Redirigiendo a la página principal.");
        return <Navigate to="/" replace />;
    }

    return children;
};

const Layout = () => {
    const [userEmail, setUserEmail] = useState("");
    const basename = process.env.BASENAME || "";

    const onLoginSuccess = (token, email) => {
        if (token) {
            console.log("Inicio de sesión exitoso. Guardando token:", token);
            localStorage.setItem("token", token);
            setUserEmail(email);
            window.location.href = "/MainPage";
        } else {
            console.error("No se recibió token. Inicio de sesión fallido.");
        }
    };

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route
                            element={<Home onLoginSuccess={onLoginSuccess} />}
                            path="/"
                        />
                        <Route
                            path="/MainPage"
                            element={
                                <ProtectedRoute>
                                    <MainPage userEmail={userEmail} />
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
