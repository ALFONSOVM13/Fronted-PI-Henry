import { AiFillCheckCircle } from 'react-icons/ai';

export const validateForm = (userData) => {
    let errors = {};
    let isValid = true; // Adding an indicator for validation
  
    // Email field validation
    if (!userData.email) {
        errors.email = 'Email field is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
        errors.email = 'Enter a valid email';
        isValid = false;
    } else if (userData.email.length > 35) {
        errors.email = 'Email cannot exceed 35 characters';
        isValid = false;
    }
  
    // Password field validation
    if (!userData.password) {
        errors.password = 'Password field is required';
        isValid = false;
    } else if (!/(?=.*\d)/.test(userData.password)) {
        errors.password = 'Password must contain at least one number';
        isValid = false;
    } else if (userData.password.length < 6 || userData.password.length > 10) {
        errors.password = 'Password must be between 6 and 10 characters';
        isValid = false;
    }
  
    return { errors, isValid }; // Returning errors and validation state
};

