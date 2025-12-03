import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

const otpSchema = Yup.object().shape({
    otp: Yup.string()
        .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
        .required('OTP is required')
});

const LoginPage = () => {
    const [error, setError] = useState('');
    const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
    const [email, setEmail] = useState('');
    const { login, verifyOtp, resendOtp } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            await login(values.email, values.password);
            setEmail(values.email);
            setStep(2);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleVerifyOtp = async (values, { setSubmitting }) => {
        try {
            await verifyOtp(email, values.otp);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };
    
    const handleResendOtp = async () => {
        try {
            await resendOtp(email);
            alert('OTP resent successfully');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-art-black text-white flex items-center justify-center px-4">
            <SEO 
                title="Login" 
                description="Login to your account to access your saved art and credits."
                keywords="login, sign in, account access"
            />
            <div className="max-w-md w-full bg-white/5 p-8 rounded-3xl border border-white/10 fade-up">
                <h2 className="text-3xl font-serif mb-6 text-center">
                    {step === 1 ? 'Welcome Back' : 'Enter OTP'}
                </h2>
                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={loginSchema}
                                onSubmit={handleLogin}
                            >
                                {({ errors, touched, isSubmitting }) => (
                                    <Form className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                                            <Field 
                                                type="email" 
                                                name="email"
                                                className={`w-full bg-black/50 border rounded-xl p-4 text-white focus:border-art-accent outline-none ${errors.email && touched.email ? 'border-red-500' : 'border-white/20'}`}
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Password</label>
                                            <Field 
                                                type="password" 
                                                name="password"
                                                className={`w-full bg-black/50 border rounded-xl p-4 text-white focus:border-art-accent outline-none ${errors.password && touched.password ? 'border-red-500' : 'border-white/20'}`}
                                            />
                                            <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                                        </div>
                                        <MagneticButton className="w-full">
                                            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50">
                                                {isSubmitting ? 'Sending OTP...' : 'Log In'}
                                            </button>
                                        </MagneticButton>
                                    </Form>
                                )}
                            </Formik>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <p className="text-gray-400 text-center mb-6">
                                We sent a verification code to {email}
                            </p>
                            <Formik
                                initialValues={{ otp: '' }}
                                validationSchema={otpSchema}
                                onSubmit={handleVerifyOtp}
                            >
                                {({ errors, touched, isSubmitting }) => (
                                    <Form className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">OTP Code</label>
                                            <Field 
                                                type="text" 
                                                name="otp"
                                                maxLength={6}
                                                className={`w-full bg-black/50 border rounded-xl p-4 text-white text-center text-2xl tracking-widest focus:border-art-accent outline-none ${errors.otp && touched.otp ? 'border-red-500' : 'border-white/20'}`}
                                                placeholder="• • • • • •"
                                            />
                                            <ErrorMessage name="otp" component="div" className="text-red-400 text-sm mt-1 text-center" />
                                        </div>
                                        <MagneticButton className="w-full">
                                            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50">
                                                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                                            </button>
                                        </MagneticButton>
                                        <button 
                                            type="button" 
                                            onClick={handleResendOtp}
                                            className="w-full text-sm text-art-accent hover:underline transition-colors mb-2 mt-4"
                                        >
                                            Resend OTP
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setStep(1)}
                                            className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            Back to Login
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </motion.div>
                    )}
                </AnimatePresence>

                {step === 1 && (
                    <p className="mt-6 text-center text-gray-400">
                        Don't have an account? <Link to="/signup" className="text-art-accent hover:underline">Sign Up</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
