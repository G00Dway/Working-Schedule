import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';
import "./LoadingSpinner.css";
import "./logo.text.style.css"

const Start = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate('/dashboard');
          } else {
            navigate('/employee_detail/' + result.data.id);
          }
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
          <img src="https://cdn-icons-png.flaticon.com/512/4804/4804223.png" alt="Logo" className="logo" />
          {/* <h1> */}
          <div className="p-3 rounded w-25 border loginForm">
            <h2 className="text-center">Signup & Login</h2>
            <div className="d-flex justify-content-between mt-5 mb-2">
              <button type="button" className="btn btn-primary" onClick={() => { navigate('/employee_login') }}>
                Login
              </button>
              <button type="button" className="btn btn-success" onClick={() => { navigate('/employee_signup') }}>
                Signup
              </button>
              <pr>Or</pr>
              <button type="button" className="btn btn-warning" onClick={() => { navigate('/report_problem') }}>
                Message Admins
              </button>
              {/* <button type="button" className="btn btn-success" onClick={() => {navigate('/adminlogin')}}>
                Admin
              </button> */}
            </div>
          </div>
        </div>
  );
};

export default Start;
