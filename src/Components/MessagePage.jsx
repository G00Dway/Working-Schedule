import React, { useRef, useState } from 'react'
import './style.css'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const MessageAdmins = () => {
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [values, setValues] = useState({
        name: '',
        problem: '',
        report: ''
    });
    const [isChecked, setIsChecked] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleChangeTick = () => {
        setIsChecked(!isChecked);
    };

    const recaptcha = useRef()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!captchaVerified) {
            alert('Please verify the reCAPTCHA!');
            return;
        }

        // Additional validation for required fields
        if (!values.name.trim() || !values.problem.trim() || !values.report.trim()) {
            alert('All fields are required!');
            return;
        }

        if (!isChecked) {
            setError("Please agree with Terms & Conditions!");
            return;
        }

        console.log('Message sent:', values);
        // Clear the form
        setValues({
            name: '',
            problem: '',
            report: ''
        });
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
                });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h2 className='text-center mb-4'>Message Admins</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Email:</label>
                        <input
                            type="email"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className='form-control rounded-0'
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="problem" className='form-label'>Select Problem:</label>
                        <select
                            name="problem"
                            value={values.problem}
                            onChange={handleChange}
                            className='form-control rounded-0'
                            required
                        >
                            <option value="">Select Problem</option>
                            <option value="technical">Technical Issue</option>
                            <option value="account">Account Problem</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="report" className='form-label'>Report:</label>
                        <textarea
                            name="report"
                            value={values.report}
                            onChange={handleChange}
                            className='form-control rounded-0'
                            rows="4"
                            placeholder='Enter Report (Max 400 characters)'
                            maxLength={400}
                            required
                        ></textarea>
                    </div>
                    <div className='mb-3'>
                        <ReCAPTCHA
                            sitekey = "6LeFuJcpAAAAAGefbGGM69rCdb7pXQIonwnohCM6"
                            ref={recaptcha}
                            onChange={handleCaptchaChange}
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Send Message</button>
                    <div className='mb-1'>
                        <input
                            type="checkbox"
                            name="tick"
                            id="tick"
                            className='me-2'
                            checked={isChecked}
                            onChange={handleChangeTick}
                        />
                        <label htmlFor="password">You are Agree with <span className="terms">Terms & Conditions</span></label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MessageAdmins;
