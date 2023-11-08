import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';
const ErrorPage = () => {
  return (
    <div className="background-img">
      <div className="space"></div>
      <div className="wrapper">
        <div className="img-wrapper">
          <span>44</span>
        </div>
        <p>The page you are trying to search has been moved to another universe.</p>
        <Link to="/home">
          <button type="button">GET ME HOME</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
