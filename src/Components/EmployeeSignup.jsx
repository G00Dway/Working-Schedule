import React, { useRef, useState, useEffect } from 'react'
import './style.css'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom'

const EmployeeSignup = () => {
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [securityValues, setSecurityValues] = useState({
        securityQuestion: '',
        securityAnswer: ''
    })
    const [values, setValues] = useState({
        email: '',
        securityQuestionValue: '',
        password: '',
        confirmPassword: '',
        security: ''
    })

    useEffect(() => {
        setValues({
            ...values,
            securityQuestionValue: securityValues.securityQuestion,
            security: securityValues.securityAnswer
        });
    }, [securityValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSecurityValues({ ...securityValues, [name]: value });
    };

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const recaptcha = useRef()

    const handleSubmit = (event) => {
        event.preventDefault();

        // Password validation
        if (values.password.length < 8 || values.password.length > 25) {
            setError("Password must be between 8 and 25 characters long.");
            return;
        }

        // Password matching validation
        if (values.password !== values.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Required field validation
        for (const key in values) {
            if (values[key] === '') {
                setError("All fields are required.");
                return;
            }
        }

        if (captchaVerified === true) {
            if (!isChecked) {
                setError("Please agree with Terms & Conditions!");
                return;
            } else {
                console.log(values);
                handleCaptchaChange();
                axios.post('http://localhost:3000/employee/employee_signup', values)
                    .then(result => {
                        if (result.data.signupStatus) {
                            localStorage.setItem("valid", true);
                            navigate('/employee_detail/' + result.data.id);
                        } else {
                            setError(result.data.Error);
                        }
                    })
                    .catch(err => console.log(err));
            }
        } else {
            handleCaptchaChange();
        }
    };

    const [isChecked, setIsChecked] = useState(true);
    const handleChangeTick = () => {
        setIsChecked(!isChecked);
    };

    const handleCaptchaChange = () => {
        const SITE_SECRET = "6LeFuJcpAAAAACt1iJc2ISLHaWrVL8UkjhSNgOd6";
        const captchaValue = recaptcha.current.getValue();
        if (!captchaValue) {
            alert('Please verify the reCAPTCHA!');
        } else {
            setCaptchaVerified(true);
            fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`, {
                method: 'POST',
                body: JSON.stringify({
                    captchaValue
                }),
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log('reCAPTCHA verified');
                }
            })
            .catch(error => {
                console.error('Error verifying reCAPTCHA:', error);
                // setCaptchaVerified(false);
            });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2 className='text-center'>Signup</h2>
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
                            required
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
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirmPassword"><strong>Confirm Password:</strong></label>
                        <input
                            type="password"
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            value={values.confirmPassword}
                            onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="securityQuestion"><strong>Security Question:</strong></label>
                        <select
                            name="securityQuestion"
                            value={securityValues.securityQuestion}
                            onChange={handleChange}
                            className='form-control rounded-0'
                            required
                        >
                            <option value="">Select a Security Question</option>
                            <option value="friendName">What is your best friend's name?</option>
                            <option value="petName">What is your pet's name?</option>
                            <option value="programmingName">What is your most liked programming language?</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="securityAnswer"><strong>Security Answer:</strong></label>
                        <input
                            type="text"
                            name='securityAnswer'
                            placeholder='Enter Security Answer'
                            value={securityValues.securityAnswer}
                            onChange={handleChange}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <ReCAPTCHA
                            sitekey="6LeFuJcpAAAAAGefbGGM69rCdb7pXQIonwnohCM6"
                            ref={recaptcha}
                            onChange={handleCaptchaChange}
                            required
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Signup</button>
                    <div className='mb-1'>
                        <input
                            type="checkbox"
                            name="tick"
                            id="tick"
                            className='me-2'
                            checked={isChecked}
                            onChange={handleChangeTick}
                            required
                        />
                        <label htmlFor="password">You agree with <span className="terms">Terms & Conditions</span></label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeSignup
