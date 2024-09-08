import React, { useState } from 'react';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className='body1'>
        <div className={`container1 ${isSignUp ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGooglePlusG} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="button">Sign Up</button>
                </form>
            </div>
            <div className="form-container1 sign-in1">
                <form>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGooglePlusG} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                    </div>
                    <span>or use your email account</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forget Your Password?</a>
                    <button type="button">Sign In</button>
                </form>
            </div>
            <div className="toggle-container1">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of the site features</p>
                        <button className="hidden" onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of the site features</p>
                        <button className="hidden" onClick={toggleForm}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;