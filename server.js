import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.VITE_RESEND_API_KEY);

app.post('/api/send', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // Use default domain for testing
            to: 'johnbrandews@gmail.com',
            subject: `New Portfolio Message from ${name}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
