    // Example in a React component
    import React, { useState } from 'react';

    function ContactForm() {
        const [email, setEmail] = useState('');
        const [message, setMessage] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('http://localhost:5000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ to: email, subject: 'Contact Form Submission', text: message }),
                });
                const data = await response.text();
                alert(data);
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Failed to send email.');
            }
        };

        return (
            
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message"></textarea>
                <button type="submit">Send Email</button>
            </form>
        );
    }

    export default ContactForm;