const express = require("express");
const TestCase = require("../models/TestCase");

const router = express.Router();

// ✅ Create a new test case
router.post("/add", async (req, res) => {
    try {
        const newTestCase = new TestCase(req.body);
        await newTestCase.save();
        res.status(201).json({ message: "Test case added successfully!" });
    } catch (error) {
        console.error("Error adding test case:", error);
        res.status(500).json({ error: "Failed to add test case" });
    }
});

// ✅ Get all test cases
router.get("/all", async (req, res) => {
    try {
        const testCases = await TestCase.find();
        res.json(testCases);
    } catch (error) {
        console.error("Error fetching test cases:", error);
        res.status(500).json({ error: "Failed to fetch test cases" });
    }
});

// ✅ Get a specific test case by ID
router.get("/:id", async (req, res) => {
    try {
        const testCase = await TestCase.findById(req.params.id);
        if (!testCase) {
            return res.status(404).json({ error: "Test case not found" });
        }
        res.json(testCase);
    } catch (error) {
        console.error("Error fetching test case by ID:", error);
        res.status(500).json({ error: "Failed to retrieve test case" });
    }
});

// ✅ Add multiple test cases from Excel
router.post("/add-multiple", async (req, res) => {
    try {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ error: "Invalid data format. Expected an array." });
        }
        await TestCase.insertMany(req.body);
        res.status(201).json({ message: "Test cases added successfully" });
    } catch (error) {
        console.error("Error adding multiple test cases:", error);
        res.status(500).json({ error: "Failed to add multiple test cases" });
    }
});

module.exports = router;
