import { Link, useNavigate } from 'react-router-dom';
import '../../cssFiles/RegistrationForm.css'
import '../../cssFiles/RegistrationFormResponsiveness.css'
import React, { useState } from 'react';
import img from '../../images/bgLogin.png'
import logo from '../../images/logo.png'
import loader from "../../images/loader.gif"



import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';
const LoginForm = () => {


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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    // };

    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()  // stop refreshing the page
        setIsLoading(true);
        const email = formData.email;
        const password = formData.password;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "Users", user.uid));
            if (userDoc.exists()) {
                navigate("/home");
                setIsLoading(false);
            }
            else {
                console.log(err)
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
                    <form onSubmit={handleSubmit} className='form-login'>
                        <p>
                            Let's get Started
                        </p>
                        <Link to="/register" className="route-to-login login">
                            Sign up
                        </Link>
                        <div className='text2'>Login Now</div>
                        <div className="inputBox inputBox-login" >
                            <input type="text" required="required" name="displayName" value={formData.displayName}
                                onChange={handleChange} />
                            <span>Name</span>
                        </div>
                        <div className="inputBox inputBox-login">
                            <input type="number" required="required" name="phoneNumber" value={formData.phoneNumber}
                                onChange={handleChange} />
                            <span>Phone Number</span>
                        </div>
                        <div className="inputBox inputBox-login">
                            <input type="email" required="required" name="email" value={formData.email}
                                onChange={handleChange} />
                            <span>Email Id</span>
                        </div>
                        <div className="password inputBox">
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
                            <span>Welcome back!</span>
                            <span><span className='stand-out-text'>Login</span> to </span>
                            <span>your oneNDF account.</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default LoginForm;