const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
    testCaseID: String,
    ModuleName: String,
    testCaseName: String,
    testCaseType: String, // GUI, Positive, or Negative
    testcaseDescription: String,
    Priority: String,
    testSteps: Array,
    testData: String,
    expectedResult: String,
    actualResult: String,
    Testcasestatus: String,
    screenshot: String // You can store URLs or base64 images

}, { collection: "TestCases" });  // 🔹 Ensure this matches your MongoDB collection name


module.exports = mongoose.model("TestCase", testCaseSchema);
