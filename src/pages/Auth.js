import React, { useState } from 'react';
import '../css/Auth.css'; // Update this CSS file for styling
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import { useWebSocketContext } from '../contexts/WebSocketContext';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const {setIsAuthenticated} = useWebSocketContext();

    const requestOtp = async () => {
        try {
            setError('')
            const response = await fetch('http://localhost:7070/auth/request-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) throw new Error('Failed to send OTP');
            setStep(2); // Move to OTP input
        } catch (err) {
            setError(err.message);
        }
    };

    const validateOtp = async () => {
        try {
            setError('')
            const response = await fetch('http://localhost:7070/auth/validate-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            if (!response.ok) throw new Error('Invalid OTP');
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token); // Store JWT token
            setIsAuthenticated(true); // Call the login handler
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Login to Your Account</h2>
            {error && <p className="error">{error}</p>}
            {step === 1 ? (
                <>
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="requestOtpButton" onClick={requestOtp}>Request OTP</button>
                </>
            ) : (
                <>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button className="validateOtpButton" onClick={validateOtp}>Validate OTP</button>
                </>
            )}
        </div>
    );
};

export default Auth; 