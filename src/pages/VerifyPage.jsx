import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const VerifyPage = () => {
    const { token } = useParams();
    const { verifyEmail } = useAuth();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await verifyEmail(token);
                setStatus('success');
                setMessage(res.message || 'Email verified successfully!');
            } catch (err) {
                setStatus('error');
                setMessage(err.message || 'Verification failed. The link may be invalid or expired.');
            }
        };

        if (token) {
            verify();
        }
    }, [token, verifyEmail]);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <SEO title="Verify Email" description="Verify your email address." />
            <div className="max-w-md w-full bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 text-center backdrop-blur-xl">
                <div className="flex justify-center mb-6">
                    {status === 'verifying' && <Loader className="w-16 h-16 text-blue-500 animate-spin" />}
                    {status === 'success' && <CheckCircle className="w-16 h-16 text-green-500" />}
                    {status === 'error' && <XCircle className="w-16 h-16 text-red-500" />}
                </div>
                
                <h2 className="text-2xl font-bold mb-4">
                    {status === 'verifying' && 'Verifying...'}
                    {status === 'success' && 'Verified!'}
                    {status === 'error' && 'Verification Failed'}
                </h2>
                
                <p className="text-gray-400 mb-8">{message}</p>

                {status !== 'verifying' && (
                    <Link 
                        to="/login" 
                        className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Go to Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default VerifyPage;
