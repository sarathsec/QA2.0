import React, { useState } from "react";
import * as XLSX from "xlsx";
import AddTestCase from "./Components/AddTestCase";
import WelcomePage from "./Components/WelcomePage";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, List, ListItem, ListItemText, Snackbar, Alert, Button } from "@mui/material";

function App() {
    const [showWelcome, setShowWelcome] = useState(true); // Show welcome page initially
    const [testCases, setTestCases] = useState([]);
    const [selectedTestCase, setSelectedTestCase] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target.result;
                const workbook = XLSX.read(arrayBuffer, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                const headers = parsedData[0];
                const cases = parsedData.slice(1).map((row) => {
                    let obj = {};
                    headers.forEach((key, index) => {
                        obj[key] = row[index];
                    });
                    return obj;
                });

                setTestCases(cases);

                // Send to backend
                const response = await fetch("http://localhost:5000/testcases/add-multiple", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cases),
                });

                if (response.ok) {
                    setAlertMessage("Test cases uploaded successfully!");
                    setAlertSeverity("success");
                } else {
                    setAlertMessage("Error uploading test cases.");
                    setAlertSeverity("error");
                }
            } catch (error) {
                console.error("File processing error:", error);
                setAlertMessage("Failed to process the file. Ensure it's a valid Excel file.");
                setAlertSeverity("error");
            }
        };

        reader.readAsArrayBuffer(file);
    };

    // Show Welcome Page initially, then move to test case management
    if (showWelcome) {
        return <WelcomePage onProceed={() => setShowWelcome(false)} />;
    }

    return (
        <Container style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>QA Test Case Management</Typography>

            {/* Upload Test Cases */}
            <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} style={{ marginBottom: "10px" }} />

            {/* Search Field */}
            <TextField
                label="Search Test Cases"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                style={{ marginBottom: "20px" }}
            />

            {/* Display Test Cases */}
            {testCases.length > 0 && (
                <div style={{ display: "flex" }}>
                    {/* Sidebar */}
                    <Paper style={{ width: "30%", padding: "10px", height: "400px", overflowY: "auto" }}>
                        <Typography variant="h6">Test Cases</Typography>
                        <List>
                            {testCases.filter(tc => (tc["Test Case Name"] || "").toLowerCase().includes(searchQuery)).map((testCase, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => setSelectedTestCase(testCase)}
                                    style={{ backgroundColor: selectedTestCase === testCase ? "#ddd" : "#fff" }}
                                >
                                    <ListItemText primary={testCase["Test Case Name"] || `Test Case ${index + 1}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    {/* Details Section */}
                    <Paper style={{ width: "70%", padding: "10px", marginLeft: "20px" }}>
                        {selectedTestCase ? (
                            <>
                                <Typography variant="h6">Test Case Details</Typography>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {Object.entries(selectedTestCase).map(([key, value]) => (
                                                <TableRow key={key}>
                                                    <TableCell style={{ fontWeight: "bold" }}>{key}</TableCell>
                                                    <TableCell style={{ whiteSpace: "pre-line" }}>{value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        ) : (
                            <Typography>Select a test case to see details.</Typography>
                        )}
                    </Paper>
                </div>
            )}

            {/* Snackbar for alerts */}
            <Snackbar open={!!alertMessage} autoHideDuration={3000} onClose={() => setAlertMessage("")}>
                <Alert severity={alertSeverity}>{alertMessage}</Alert>
            </Snackbar>
        </Container>
    );
}

export default App;
