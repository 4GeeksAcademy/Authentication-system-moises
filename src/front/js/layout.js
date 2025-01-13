import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { MainPage } from "./pages/MainPage";
import injectContext from "./store/appContext";

const Layout = () => {
    const [userEmail, setUserEmail] = useState("");
    const basename = process.env.BASENAME || "";

    // Maneja el inicio de sesión exitoso
    const onLoginSuccess = (token, email) => {
        localStorage.setItem("token", token); // Guarda el token en el almacenamiento local
        setUserEmail(email); // Actualiza el email del usuario en el estado
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
                            element={<MainPage userEmail={userEmail} />}
                            path="/MainPage"
                        />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
