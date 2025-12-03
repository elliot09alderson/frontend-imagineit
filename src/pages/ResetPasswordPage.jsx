import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Lock } from 'lucide-react';

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { resetPassword } = useAuth();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await resetPassword(token, values.password);
            setSuccessMessage(res.message || "Password reset successfully!");
            setError('');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message);
            setSuccessMessage('');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
            <SEO title="Reset Password" description="Create a new password." />
            
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-gray-400">Enter your new password below</p>
                </div>

                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                {successMessage && <div className="bg-green-500/20 text-green-200 p-3 rounded-lg mb-4 text-sm">{successMessage}</div>}

                {!successMessage && (
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
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

                                <MagneticButton className="w-full">
                                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50">
                                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </MagneticButton>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
