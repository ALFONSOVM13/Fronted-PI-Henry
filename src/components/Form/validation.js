import { AiFillCheckCircle } from 'react-icons/ai';

export const validateForm = (userData) => {
    let errors = {};
    let isValid = true; // Agregar un indicador para la validación
  
    // Validación del campo de correo electrónico
    if (!userData.email) {
      errors.email = 'El campo de correo electrónico es obligatorio';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Ingresa un correo electrónico válido';
      isValid = false;
    } else if (userData.email.length > 35) {
      errors.email = 'El correo electrónico no puede tener más de 35 caracteres';
      isValid = false;
    }
  
    // Validación del campo de contraseña
    if (!userData.password) {
      errors.password = 'El campo de contraseña es obligatorio';
      isValid = false;
    } else if (!/(?=.*\d)/.test(userData.password)) {
      errors.password = 'La contraseña debe contener al menos un número';
      isValid = false;
    } else if (userData.password.length < 6 || userData.password.length > 10) {
      errors.password = 'La contraseña debe tener entre 6 y 10 caracteres';
      isValid = false;
    }
  
    return { errors, isValid }; // Retornar los errores y el estado de la validación
};
