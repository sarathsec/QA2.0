import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import HESPage from "./Components/HESPage";
import AddTestCase from "./Components/AddTestCase";
import WelcomePage from "./Components/WelcomePage";
import TestCaseManagement from "./Components/TestCaseManagement";
import { Snackbar, Alert } from "@mui/material";

function App() {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const navigate = useNavigate();

    const handleProceed = useCallback((category) => {
        navigate(`/${category.toLowerCase()}`);
    }, [navigate]);

    const showAlert = useCallback((message, severity = "success") => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<WelcomePage onProceed={handleProceed} />} />
                <Route path="/hes" element={<HESPage />} />
                <Route
                    path="/testcases"
                    element={<TestCaseManagement showAlert={showAlert} />}
                />
            </Routes>

            <Snackbar
                open={!!alertMessage}
                autoHideDuration={3000}
                onClose={() => setAlertMessage("")}
            >
                <Alert severity={alertSeverity}>{alertMessage}</Alert>
            </Snackbar>
        </>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
