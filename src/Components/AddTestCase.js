import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Snackbar
} from '@mui/material';

const AddTestCase = () => {
    const [formData, setFormData] = useState({
        testCaseID: '',
        ModuleName: '',
        testCaseName: '',
        testCaseType: '',
        testcaseDescription: '',
        Priority: '',
        testSteps: '',
        testData: '',
        expectedResult: '',
        actualResult: '',
        Testcasestatus: '',
        screenshot: '',
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'testCaseID',
            'ModuleName',
            'testCaseName',
            'testCaseType',
            'testcaseDescription',
            'Priority',
            'testSteps',
            'testData',
            'expectedResult',
            'actualResult',
            'Testcasestatus'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/testcases/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowSuccess(true);
                // Reset form
                setFormData({
                    testCaseID: '',
                    ModuleName: '',
                    testCaseName: '',
                    testCaseType: '',
                    testcaseDescription: '',
                    Priority: '',
                    testSteps: '',
                    testData: '',
                    expectedResult: '',
                    actualResult: '',
                    Testcasestatus: '',
                    screenshot: '',
                });
            } else {
                setShowError(true);
            }
        } catch (error) {
            console.error('Error adding test case:', error);
            setShowError(true);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Add New Test Case
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Test Case ID"
                                name="testCaseID"
                                value={formData.testCaseID}
                                onChange={handleChange}
                                error={!!errors.testCaseID}
                                helperText={errors.testCaseID}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Module Name"
                                name="ModuleName"
                                value={formData.ModuleName}
                                onChange={handleChange}
                                error={!!errors.ModuleName}
                                helperText={errors.ModuleName}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Test Case Name"
                                name="testCaseName"
                                value={formData.testCaseName}
                                onChange={handleChange}
                                error={!!errors.testCaseName}
                                helperText={errors.testCaseName}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required error={!!errors.testCaseType}>
                                <InputLabel>Test Case Type</InputLabel>
                                <Select
                                    name="testCaseType"
                                    value={formData.testCaseType}
                                    onChange={handleChange}
                                    label="Test Case Type"
                                >
                                    <MenuItem value="GUI">GUI</MenuItem>
                                    <MenuItem value="Positive">Positive</MenuItem>
                                    <MenuItem value="Negative">Negative</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required error={!!errors.Priority}>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    name="Priority"
                                    value={formData.Priority}
                                    onChange={handleChange}
                                    label="Priority"
                                >
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Description"
                                name="testcaseDescription"
                                value={formData.testcaseDescription}
                                onChange={handleChange}
                                error={!!errors.testcaseDescription}
                                helperText={errors.testcaseDescription}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Test Steps"
                                name="testSteps"
                                value={formData.testSteps}
                                onChange={handleChange}
                                error={!!errors.testSteps}
                                helperText={errors.testSteps}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Test Data"
                                name="testData"
                                value={formData.testData}
                                onChange={handleChange}
                                error={!!errors.testData}
                                helperText={errors.testData}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Expected Result"
                                name="expectedResult"
                                value={formData.expectedResult}
                                onChange={handleChange}
                                error={!!errors.expectedResult}
                                helperText={errors.expectedResult}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Actual Result"
                                name="actualResult"
                                value={formData.actualResult}
                                onChange={handleChange}
                                error={!!errors.actualResult}
                                helperText={errors.actualResult}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required error={!!errors.Testcasestatus}>
                                <InputLabel>Test Case Status</InputLabel>
                                <Select
                                    name="Testcasestatus"
                                    value={formData.Testcasestatus}
                                    onChange={handleChange}
                                    label="Test Case Status"
                                >
                                    <MenuItem value="Pass">Pass</MenuItem>
                                    <MenuItem value="Fail">Fail</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Screenshot URL"
                                name="screenshot"
                                value={formData.screenshot}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                Add Test Case
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    Test case added successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={() => setShowError(false)}
            >
                <Alert severity="error" onClose={() => setShowError(false)}>
                    Failed to add test case. Please try again.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddTestCase;
