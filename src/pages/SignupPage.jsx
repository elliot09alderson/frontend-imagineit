import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Lock, Phone } from 'lucide-react';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    contact: Yup.string()
        .optional()
});

const SignupPage = () => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await signup(values.email, values.password, values.name, values.contact);
            setSuccessMessage(res.message || "Verification email sent! Please check your inbox.");
            setError('');
        } catch (err) {
            setError(err.message);
            setSuccessMessage('');
        } finally {
            setSubmitting(false);
        }
    };

    if (successMessage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
                <SEO title="Sign Up" description="Create your account to start editing images." />
                <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-xl relative z-10 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-green-400">Success!</h2>
                    <p className="text-gray-300 mb-6">{successMessage}</p>
                    <Link to="/login" className="text-art-accent hover:underline">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
            <SEO title="Sign Up" description="Create your account to start editing images." />
            
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the creative revolution</p>
                </div>

                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '', contact: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <Field
                                        type="text"
                                        name="name"
                                        className={`w-full bg-black border ${errors.name && touched.name ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-art-accent transition-colors`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

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

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Contact (Optional)</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <Field
                                        type="text"
                                        name="contact"
                                        className={`w-full bg-black border ${errors.contact && touched.contact ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-art-accent transition-colors`}
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                                <ErrorMessage name="contact" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <Field
                                        type="password"
                                        name="password"
                                        className={`w-full bg-black border ${errors.password && touched.password ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-art-accent transition-colors`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className={`w-full bg-black border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-zinc-700'} rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-art-accent transition-colors`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="mt-6 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-art-accent hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
