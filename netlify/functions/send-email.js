import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        await resend.emails.send({
            from: 'Contact Form <no-reply@bendypixels.co>',
            to: ['johnbrandews@gmail.com'],
            replyTo: email,
            subject: `New Inquiry from ${name} - bendypixels.co`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>From bendypixels.co contact form</small>
      `,
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: JSON.stringify({ success: true, message: 'Email sent!' }),
        };
    } catch (error) {
        console.error('Resend error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ success: false, error: 'Failed to send email' }),
        };
    }
};
