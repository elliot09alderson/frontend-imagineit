import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Mail, ArrowLeft } from 'lucide-react';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
});

const ForgotPasswordPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { forgotPassword } = useAuth();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await forgotPassword(values.email);
            setSuccessMessage(res.message || "Password reset link sent! Please check your inbox.");
            setError('');
        } catch (err) {
            setError(err.message);
            setSuccessMessage('');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
            <SEO title="Forgot Password" description="Reset your password." />
            
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
                    <p className="text-gray-400">Enter your email to reset your password</p>
                </div>

                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                {successMessage && <div className="bg-green-500/20 text-green-200 p-3 rounded-lg mb-4 text-sm">{successMessage}</div>}

                {!successMessage && (
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <Field
                                            type="email"
                                            name="email"
                                            className={`w-full bg-black border ${errors.email && touched.email ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-art-accent transition-colors`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <MagneticButton className="w-full">
                                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50">
                                        {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
                                    </button>
                                </MagneticButton>
                            </Form>
                        )}
                    </Formik>
                )}

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
