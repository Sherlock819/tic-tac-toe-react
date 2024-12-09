import React, { useState, useEffect } from 'react';
import { useWebSocketContext } from '../contexts/WebSocketContext';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons
import Loading from '../components/Loading'; // Import Loading component
import '../css/Auth.css'; // Update this CSS file for styling

const UserProfile = () => {
    const { userProfile, loading, updateUserProfile, message} = useWebSocketContext();
    const [formData, setFormData] = useState({});
    const [updatedFields, setUpdatedFields] = useState({}); // Track updated fields
    const [validationErrors, setValidationErrors] = useState({}); // Track validation errors
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (userProfile) setFormData(userProfile);
    }, [userProfile]);

    useEffect(() => {
        // Check if all fields are valid
        const isValid = Object.values(formData).every(value => String(value).trim()) &&
                        Object.values(validationErrors).every(error => !error);
        setIsFormValid(isValid);
    }, [formData, validationErrors]);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value || !value.trim()) {
                    error = 'This field is required';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'mobile':
                const mobileRegex = /^[0-9]{10}$/; // Example for 10-digit mobile numbers
                if (!value || !mobileRegex.test(value)) {
                    error = 'Invalid mobile number';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setFormData(prev => ({ ...prev, [name]: value })); // Update form data
        setUpdatedFields(prev => ({ ...prev, [name]: true })); // Mark field as updated
        setValidationErrors(prev => ({ ...prev, [name]: error })); // Set error on change
    };

    const handleSubmit = async (e) => {
        // setSuccessMessage({success: 'Profile updated successfully!', error:''}); // Set success message
        e.preventDefault(); // Prevent default form submission
        console.log("Submitting form data:", formData);
        try {
            await updateUserProfile(formData); // Use the service function
            console.log("Profile updated successfully");
            // setSuccessMessage({success: 'Profile updated successfully!', error:''}); // Set success message
            setUpdatedFields({}); // Reset updated fields after successful save
            setValidationErrors({}); // Clear validation errors on success
        } catch (error) {
            console.log("Error updating profile:", error.message);
            // Assuming error.response.data contains field-specific errors
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data);
            }
        }
    };

    if (loading) return <Loading />; // Show loading screen

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            {message.success && <p className="success-message fade-in">{message.success}</p>} {/* Success message */}
            {message.error && <p className="error fade-in">{message.error}</p>} {/* Error message */}
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name" className={`${updatedFields.firstName ? 'updated' : ''} ${validationErrors.firstName ? 'error' : ''}`} />
                    {validationErrors.firstName && <span className="error-message">{validationErrors.firstName}</span>}
                </div>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Last Name" className={`${updatedFields.lastName ? 'updated' : ''} ${validationErrors.lastName ? 'error' : ''}`} />
                    {validationErrors.lastName && <span className="error-message">{validationErrors.lastName}</span>}
                </div>
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className={`${updatedFields.email ? 'updated' : ''} ${validationErrors.email ? 'error' : ''}`} />
                    {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
                </div>
                <div className="input-group">
                    <FaPhone className="input-icon" />
                    <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleChange} placeholder="Mobile" className={`${updatedFields.mobile ? 'updated' : ''} ${validationErrors.mobile ? 'error' : ''}`} />
                    {validationErrors.mobile && <span className="error-message">{validationErrors.mobile}</span>}
                </div>
                <button 
                    type="submit" 
                    disabled={!isFormValid} 
                    className={`updateButton ${!isFormValid ? 'disabled' : ''}`}
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UserProfile; 