import React, { useState } from 'react';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/testcases/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Test case added successfully');
                // Reset form after successful submission
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
                alert('Failed to add test case');
            }
        } catch (error) {
            console.error('Error adding test case:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="testCaseID" placeholder="Test Case ID" value={formData.testCaseID} onChange={handleChange} required />
            <input name="ModuleName" placeholder="Module Name" value={formData.ModuleName} onChange={handleChange} required />
            <input name="testCaseName" placeholder="Test Case Name" value={formData.testCaseName} onChange={handleChange} required />
            <input name="testCaseType" placeholder="Type (GUI, Positive, Negative)" value={formData.testCaseType} onChange={handleChange} required />
            <textarea name="testcaseDescription" placeholder="Description" value={formData.testcaseDescription} onChange={handleChange} required />
            <input name="Priority" placeholder="Priority (High, Medium, Low)" value={formData.Priority} onChange={handleChange} required />
            <textarea name="testSteps" placeholder="Test Steps" value={formData.testSteps} onChange={handleChange} required />
            <textarea name="testData" placeholder="Test Data" value={formData.testData} onChange={handleChange} required />
            <textarea name="expectedResult" placeholder="Expected Result" value={formData.expectedResult} onChange={handleChange} required />
            <textarea name="actualResult" placeholder="Actual Result" value={formData.actualResult} onChange={handleChange} required />
            <input name="Testcasestatus" placeholder="Test Case Status (Pass/Fail)" value={formData.Testcasestatus} onChange={handleChange} required />
            <input name="screenshot" placeholder="Screenshot URL" value={formData.screenshot} onChange={handleChange} />
            <button type="submit">Add Test Case</button>
        </form>
    );
};

export default AddTestCase;
