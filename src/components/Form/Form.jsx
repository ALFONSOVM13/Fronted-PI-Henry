import React, { useState } from 'react';
import { validateForm } from './validation';
import './Form.css';
import { AiFillMail, AiFillLock, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const Form = ({ login, setUserEmail }) => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });

    const { errors, isValid } = validateForm(userData);
    setErrors(errors);
    setIsEmailValid(errors.email === undefined);
    setIsPasswordValid(errors.password === undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateForm(userData);
    setErrors(errors);
    setIsEmailValid(errors.email === undefined);
    setIsPasswordValid(errors.password === undefined);

    if (isValid) {
      login(userData);
      setUserEmail(userData.email);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="space"></div>
        <div className="wraper">
          <div className="title"><span>Welcome!</span></div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user">
                <AiFillMail />
                
              </i>
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={isEmailValid ? 'valid' : ''}
              />
              <div className="icon-container">
                {isEmailValid ? (
                  <AiFillCheckCircle className="check-icon" />
                ) : (
                  errors.email && <AiFillCloseCircle className="check-icon error" />
                )}
              </div>
            </div>
            <div className="row">
              <i className="fas fa-lock">
                <AiFillLock />
              </i>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={userData.password}
                onChange={handleChange}
                className={isPasswordValid ? 'valid' : ''}
              />
              <div className="icon-container">
                {isPasswordValid ? (
                  <AiFillCheckCircle className="check-icon" />
                ) : (
                  errors.password && <AiFillCloseCircle className="check-icon error" />
                )}

              </div>
            </div>
            <div className="pass">
              <NavLink to="#">Forgot password?</NavLink>
            </div>
            <div className="row button">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <NavLink to="#">Signup now</NavLink>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
            {errors.email && <p className="error-message">{errors.email}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;

