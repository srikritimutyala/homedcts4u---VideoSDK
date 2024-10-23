import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const form = useRef();

    const [toName, setToName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = {
            to_name: toName,
            from_name: userEmail,
            message: message,
        };

        emailjs.send('service_9kw0ksc', 'template_emnz0z3', formData, 'UzhH0rHz25iz1J2zG')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        // Reset form fields
        resetForm();
    };

    // Function to reset form fields
    const resetForm = () => {
        setToName('');
        setUserEmail('');
        setMessage('');
    };

    const titleStyle = {
        fontSize: '2em',
        fontFamily: 'Lilita One, sans-serif',
        marginTop: '50px',
        textAlign: 'center',
        color: "#003566"
    };

    const subtitleStyle = {
        fontFamily: 'Urbanist, sans-serif',
        color: "#7e8f96",
        fontSize: '20px',
        marginTop: '-10px',
        textAlign: 'center',
    };

    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f1f2',
        padding: '10px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        maxWidth: '400px',
        padding: '15px',
        background: '#8ecae6',
        borderRadius: '10px',
    };

    const inputStyle = {
        marginBottom: '15px',
        padding: '8px',
        border: 'none',
        borderRadius: '5px',
        background: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontFamily: 'Urbanist, sans-serif',
    };

    const labelStyle = {
        color: 'white',
        fontFamily: 'Urbanist, sans-serif',
        fontSize: '1rem',
        textAlign: 'center',
    };

    const buttonStyle = {
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#7e8f96',
        color: 'white',
        cursor: 'pointer',
        fontFamily: 'Urbanist, sans-serif',
    };

    return (
        <div style={formContainerStyle}>
            <h1 style={titleStyle}>Contact Us</h1>
            <p style={subtitleStyle}>We would love to work with you!</p>
            <form ref={form} onSubmit={sendEmail} style={formStyle}>
                <h1 style={labelStyle}>Name</h1>
                <input
                    style={inputStyle}
                    type="text"
                    name="to_name"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                />
                <h1 style={labelStyle}>Email</h1>
                <input
                    style={inputStyle}
                    type="email"
                    name="user_email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <h1 style={labelStyle}>Message</h1>
                <textarea
                    style={{ ...inputStyle, height: '100px' }}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input
                    style={buttonStyle}
                    type="submit"
                    value="Send"
                />
            </form>
        </div>
    );
}

export default Contact;
