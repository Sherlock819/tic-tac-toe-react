import React, { useState, useEffect } from 'react';
import { useWebSocketContext } from '../contexts/WebSocketContext';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons
import Loading from '../components/Loading'; // Import Loading component
import '../css/Auth.css'; // Update this CSS file for styling

const UserProfile = () => {
    const { userProfile, loading, updateUserProfile, message} = useWebSocketContext();
    const [formData, setFormData] = useState({});
    const [updatedFields, setUpdatedFields] = useState({}); // Track updated fields

    useEffect(() => {
        if (userProfile) setFormData(userProfile);
    }, [userProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Update form data
        setUpdatedFields(prev => ({ ...prev, [name]: true })); // Mark field as updated
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
        } catch (error) {
            console.log("Error updating profile:", error.message);
            // setSuccessMessage({success:'', error: error.message}); // Set error message
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
                    <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name" className={updatedFields.firstName ? 'updated' : ''} />
                </div>
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Last Name" className={updatedFields.lastName ? 'updated' : ''} />
                </div>
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className={updatedFields.email ? 'updated' : ''} />
                </div>
                <div className="input-group">
                    <FaPhone className="input-icon" />
                    <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleChange} placeholder="Mobile" className={updatedFields.mobile ? 'updated' : ''} />
                </div>
                <button className = "updateButton" type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile; 