import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [isChecked, setIsChecked] = useState(true);
    const handleChangeTick = () => {
        setIsChecked(!isChecked);
    };
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        // Additional validation
        if (!values.email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!values.password.trim()) {
            setError("Please enter your password.");
            return;
        }

        if (!isChecked) {
            setError("Please agree with Terms & Conditions!");
            return;
        }

        if (values.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (values.password.length > 25) {
            setError("Password must be between 8 and 25 characters long.");
            return;
        }

        // If all validations pass, clear any previous errors
        setError("");

        // Make the login request
        axios.post('http://localhost:3000/employee/employee_login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true);
                    navigate('/employee_detail/' + result.data.id);
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2 className='text-center'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Enter Email'
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter Password'
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input
                            type="checkbox"
                            name="tick"
                            id="tick"
                            className='me-2'
                            checked={isChecked}
                            onChange={handleChangeTick}
                        />
                        <label htmlFor="password">You agree with <span className="terms">Terms & Conditions</span></label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmployeeLogin
