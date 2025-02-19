require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/scenario", async (req, res) => {
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Generate a survival scenario with two distinct choices, separated by '|'" }
            ],
            max_tokens: 100
        }, {
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Error communicating with OpenAI API." });
    }
});

app.get("/api/version", (req, res) => {
    res.json({ version: "1.0.1" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
