export const fetchUserProfile = async (jwtToken) => {
    try {
        const response = await fetch('http://localhost:7070/api/users/getUserProfile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching user profile');
    }
};

export const updateUserRecord = async (jwtToken, userProfile) => {
    try {
        const response = await fetch('http://localhost:7070/api/users/updateUserProfile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        });

        if (!response.ok) {
            // Attempt to read the response body even if the response is not OK
            const errorData = await response.json(); // Parse the error response
            throw new Error(errorData.message || 'Failed to update user profile'); // Use the message from the response
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'An error occurred while updating user profile');
    }
};

export const checkAuthentication = async (jwtToken) => {
    const response = await fetch('http://localhost:7070/auth/isAuthenticated', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Authentication check failed');
    }

    return await response.json();
}; 