import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MagneticButton from '../components/MagneticButton';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-art-black text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white/5 p-8 rounded-3xl border border-white/10 fade-up">
                <h2 className="text-3xl font-serif mb-6 text-center">Create Account</h2>
                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white focus:border-art-accent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white focus:border-art-accent outline-none"
                            required
                        />
                    </div>
                    <MagneticButton>
                        <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            Sign Up
                        </button>
                    </MagneticButton>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-art-accent hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
