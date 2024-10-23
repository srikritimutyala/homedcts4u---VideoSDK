// Login.js
import React from 'react';
import './Login.css'; // Import CSS file for styling

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
      <img src="/images/logo.png" alt="Login Image" style={{width: "200px", height: "auto",marginTop:"-90px"}} />

        {/* Add your login form content here */}
       
        <div className="login-button">
          <button style={{marginTop:"30px",fontFamily: 'Lilita One, sans-serif', color:"#f0f1f2"}}>Continue with Google</button>
        </div>

        {/* Add your login form inputs, buttons, etc. */}
      </div>
      <div className="login-image">
        {/* Add your image here */}
        <img src="/images/loginImg.jpg" alt="Login Image" style={{width: "450px", height: "auto"}} />

      </div>
    </div>
  );
};

export default Login;
