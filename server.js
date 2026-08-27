const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

app.post("/api/states", async (req, res) => {
    try {
        const { states } = req.body;

        if (!states) {
            return res.status(400).json({
                success: false,
                message: "No states were provided."
            });
        }

        console.log("States received:", states);

        const { data, error } = await resend.emails.send({
            from: "States Form <admin@streamflowconnect.app>",
            to: [process.env.TO_EMAIL],
            subject: "Nigerian States Submission",
            html: `
                <h2>Nigerian States Submission</h2>
                <p>${escapeHtml(states)}</p>
            `
        });

        if (error) {
            console.error("Resend error:", error);

            return res.status(500).json({
                success: false,
                message: "Email could not be sent."
            });
        }

        console.log("Email sent:", data);

        res.json({
            success: true,
            message: "States sent successfully."
        });

    } catch (error) {
        console.error("Server error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
});

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;