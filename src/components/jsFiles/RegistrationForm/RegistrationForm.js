import { Link } from 'react-router-dom';
import '../../cssFiles/RegistrationForm.css'
import '../../cssFiles/RegistrationFormResponsiveness.css'
import React, { useState } from 'react';
import img from '../../images/bgLogin.png'
import logo from '../../images/logo.png'
import loader from "../../images/loader.gif"

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {

    const [formData, setFormData] = useState({
        displayName: '',
        phoneNumber: '',
        email: '',
        panNumber: '',
        loanType: 'Personal',
        loanAmount: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()  // stop refreshing the page

        setIsLoading(true);
        const displayName = formData.displayName;
        const email = formData.email;
        const password = formData.password;
        const phone = formData.phoneNumber;
        const pan = formData.panNumber;
        const loanType = formData.loanType;
        const amount = formData.loanAmount;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = res.user;

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    uid: user.uid,
                    displayName,
                    email,
                    phone,
                    pan,
                    loanType,
                    amount
                });
                setIsLoading(false);
                navigate("/home")
            }
            else {
                navigate("/register")
                setIsLoading(false);
                window.alert("Invalid Email id. Please enter valid one.")
            }

        } catch (err) {
            console.log(err)
            setErr(true)
        }
    }
    return (
        <>
            {isLoading ? (
                <img className='loader' src={loader} alt='' />
            ) : (
                <div className="registration-form">
                    <Link to='/' className='Home-btn'>&#8592; Home</Link>
                    <form onSubmit={handleSubmit}>
                        <p>
                            Let's get Started
                        </p>
                        <Link to="/login" className="route-to-login login">
                            Sign in
                        </Link>
                        <div className='text2'>Register Now</div>
                        <div className="inputBox">
                            <input type="text" required="required" name="displayName" value={formData.displayName}
                                onChange={handleChange} />
                            <span>Name</span>
                        </div>
                        <div className="inputBox">
                            <input type="number" required="required" name="phoneNumber" value={formData.phoneNumber}
                                onChange={handleChange} />
                            <span>Phone Number</span>
                        </div>
                        <div className="inputBox">
                            <input type="email" required="required" name="email" value={formData.email}
                                onChange={handleChange} />
                            <span>Email Id</span>
                        </div>
                        <div className="inputBox">
                            <input type="text" required="required" name="panNumber" value={formData.panNumber}
                                onChange={handleChange} />
                            <span>Pan Number</span>
                        </div>
                        <div className="inputBox">
                            <select
                                name="loanType"
                                value={formData.loanType}
                                onChange={handleChange}
                            >
                                <option value="Personal">Personal Loan</option>
                                <option value="Home">Home Loan</option>
                                <option value="Auto">Auto Loan</option>
                                <option value="Business">Business Loan</option>
                            </select>
                            <span>Type of Loan Required:</span>
                        </div>
                        <div className="inputBox">
                            <input type="number" required="required" name="loanAmount" value={formData.loanAmount}
                                onChange={handleChange} />
                            <span>₹ Loan Amount</span>
                        </div>
                        <div className="inputBox">
                            <input type="text" required="required" name="password" value={formData.password}
                                onChange={handleChange} />
                            <span>Password</span>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    <div className='right-part'>
                        <img src={img} alt='' />
                        <img src={logo} alt='' />
                        <div>
                            <span>Welcome</span>
                            <span><span className='stand-out-text'>Register</span> to </span>
                            <span>your oneNDF account.</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default RegistrationForm;