import React, { useState, useCallback, useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
    Container,
    Typography,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    List,
    ListItem,
    ListItemText,
    Box,
    CircularProgress
} from '@mui/material';

const TestCaseManagement = ({ showAlert }) => {
    const [testCases, setTestCases] = useState([]);
    const [selectedTestCase, setSelectedTestCase] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const filteredTestCases = useMemo(() => {
        return testCases.filter(tc =>
            (tc["Test Case Name"] || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [testCases, searchQuery]);

    const handleFileUpload = useCallback(async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);
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
                    const obj = {};
                    headers.forEach((key, index) => {
                        obj[key] = row[index];
                    });
                    return obj;
                });

                setTestCases(cases);

                const response = await fetch("http://localhost:5000/testcases/add-multiple", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cases),
                });

                if (response.ok) {
                    showAlert("Test cases uploaded successfully!");
                } else {
                    showAlert("Error uploading test cases.", "error");
                }
            } catch (error) {
                console.error("File processing error:", error);
                showAlert("Failed to process the file. Ensure it's a valid Excel file.", "error");
            } finally {
                setIsLoading(false);
            }
        };

        reader.readAsArrayBuffer(file);
    }, [showAlert]);

    return (
        <Container style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>QA Test Case Management</Typography>

            <Box sx={{ mb: 3 }}>
                <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileUpload}
                    style={{ marginBottom: "10px" }}
                    disabled={isLoading}
                />
            </Box>

            <TextField
                label="Search Test Cases"
                variant="outlined"
                fullWidth
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px" }}
            />

            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : testCases.length > 0 ? (
                <Box display="flex">
                    <Paper sx={{ width: "30%", p: 2, height: "400px", overflowY: "auto" }}>
                        <Typography variant="h6">Test Cases</Typography>
                        <List>
                            {filteredTestCases.map((testCase, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => setSelectedTestCase(testCase)}
                                    sx={{
                                        backgroundColor: selectedTestCase === testCase ? "#ddd" : "#fff",
                                        '&:hover': { backgroundColor: '#f5f5f5' }
                                    }}
                                >
                                    <ListItemText
                                        primary={testCase["Test Case Name"] || `Test Case ${index + 1}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    <Paper sx={{ width: "70%", p: 2, ml: 2 }}>
                        {selectedTestCase ? (
                            <>
                                <Typography variant="h6">Test Case Details</Typography>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {Object.entries(selectedTestCase).map(([key, value]) => (
                                                <TableRow key={key}>
                                                    <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
                                                    <TableCell sx={{ whiteSpace: "pre-line" }}>{value}</TableCell>
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
                </Box>
            ) : (
                <Typography>No test cases available. Upload an Excel file to get started.</Typography>
            )}
        </Container>
    );
};

export default TestCaseManagement; 