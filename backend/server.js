const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const TestCase = require("./models/TestCase"); // Ensure the path is correct
const testCaseRoutes = require("./routes/TestCases");

const app = express(); // ✅ Initialize app before using it

app.use(cors());
app.use(express.json());

// ✅ Move this line after initializing app
app.use("/testcases", testCaseRoutes);

// ✅ MongoDB Connection
mongoose.connect("mongodb://localhost:27017/QA_TESTCASES", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
