import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Email and password are required.');
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('Logged in:', { email });

            localStorage.setItem('userId', user.uid);

            navigate('/studentlist');
        } catch (err) {
            console.error('Login failed:', err.message);

            console.log(`Error code: ${err.code}, Error message: ${err.message}`);

            switch (err.code) {
                case 'auth/wrong-password':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'auth/user-not-found':
                    setError('No user found with this email.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email format.');
                    break;
                case 'auth/network-request-failed':
                    setError('Network error. Please check your connection.');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many unsuccessful attempts. Please try again later.');
                    break;
                default:
                    setError('Failed to log in. Please try again.');
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="left-side">
                <div className="logo">
                    <img src="https://learning-management-syst-6bfa4.web.app/static/media/jplogo.de47c5a316ceff8d5569.jpg" alt="Logo" />
                </div>
                <h1>Welcome to Learning <br /> Management System</h1>
                <img height={300} src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR67t2vqZmw9FLZX9zPm2wPg8j6fJpPjjNMRaMc7iBZW4QFXaG3" alt="Background" className="background-image" />
            </div>

            <div className="right-side">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading || !email || !password}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p>or</p>
                <p className="signup-link" onClick={() => navigate('/signup')}>Sign Up</p>
            </div>
        </div>
    );
};

export default Login;
