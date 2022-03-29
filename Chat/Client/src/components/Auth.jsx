import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import siginImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',          // User default values
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })   // Function that changes one particular field from the form
    };

    const switchMode = () => {
        setIsSignup((previsSignup) => !previsSignup);  // Changes the current state of the user 
    }

    const handleSubmit = async (e) => {  // Function that create the user according to the values in the form
        e.preventDefault();

        const { fullName, username, password, phoneNumber, avatarURL } = form;

        const URL = "http://localhost:4000/auth";

        const { data: { token, userID, hashedPassword } } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
            username, password, fullName, phoneNumber, avatarURL
        });

        cookies.set("token", token);
        cookies.set("username", username);
        cookies.set("fullName", fullName);
        cookies.set("userID", userID);

        if(isSignup){
            cookies.set("phoneNumber", phoneNumber);
            cookies.set("avatarURL", avatarURL);
            cookies.set("hashedPassword", hashedPassword);
        }

        window.location.reload();

        
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_in'>
                                <label htmlFor='fullName'>Full Name</label>
                                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                            </div>
                        )} 
                        
                            <div className='auth__form-container_fields-content_in'>
                                <label htmlFor='username'>Username</label>
                                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                            </div>
                         {isSignup && (
                            <div className='auth__form-container_fields-content_in'>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                            </div>
                        )} 
                        {isSignup && (
                            <div className='auth__form-container_fields-content_in'>
                                <label htmlFor='AvatarURL'>Avatar URL</label>
                                <input type="text" name="avatarurl" placeholder="Avatar" onChange={handleChange} required />
                            </div>
                        )} 
                        <div className='auth__form-container_fields-content_in'>
                                <label htmlFor='Password'>Password</label>
                                <input type="text" name="password" placeholder="Password" onChange={handleChange} required />
                            </div>
                         {isSignup && (
                            <div className='auth__form-container_fields-content_in'>
                                <label htmlFor='Confirm Password'>Confirm Password</label>
                                <input type="text" name="confirmpassword" placeholder="Confirm Password" onChange={handleChange} required />
                            </div>
                        )}     
                       <div className='auth__form-container_fields-content_input'>
                           <button>{isSignup ? "Sign up" : "Sign in"}</button>
                           </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>{ isSignup ? "Already have an account?" : "Don´t have an account?" }
                         <span onClick={switchMode}>
                             { isSignup ? "Sign Up" : "Sign In" }
                         </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={siginImage} alt="Image"/>
            </div>
        </div>
    )
}

export default Auth;