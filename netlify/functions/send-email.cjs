const { Resend } = require('resend');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Check for API key inside the handler to prevent top-level crashes
        if (!process.env.RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY environment variable');
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, error: 'Server configuration error: Missing API Key' }),
            };
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const { name, email, message } = JSON.parse(event.body);

        // Basic validation
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'Missing required fields' }),
            };
        }

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
            body: JSON.stringify({ success: false, error: 'Failed to send email: ' + error.message }),
        };
    }
};
