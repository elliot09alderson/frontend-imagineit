import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { API_URL } from '../../config';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message });
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-black text-gray-300 font-sans">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
                <p className="text-lg text-gray-400 mb-12">
                    Have questions, feedback, or need assistance? We're here to help.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-zinc-900 p-3 rounded-lg text-art-accent">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                                <p className="text-sm text-gray-500 mb-2">For support and general inquiries:</p>
                                <a href="mailto:support@imagineit.cloud" className="text-white hover:text-art-accent transition-colors">support@imagineit.cloud</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-zinc-900 p-3 rounded-lg text-art-accent">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">Office Address</h3>
                                <p className="text-gray-400">
                                    ImagineIt Cloud HQ<br/>
                                    Indira Nagar<br/>
                                    Bangalore, India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-zinc-900 p-3 rounded-lg text-art-accent">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">Phone</h3>
                                <p className="text-gray-400">
                                    +91 87708 00807
                                </p>
                                <p className="text-xs text-gray-500 mt-1">(Mon-Fri, 9am - 6pm IST)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
                        <h3 className="text-white font-bold text-xl mb-6">Send us a message</h3>
                        
                        {status.success && (
                            <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-lg flex items-center gap-2 text-green-400">
                                <CheckCircle size={18} />
                                <span>Message sent successfully!</span>
                            </div>
                        )}

                        {status.error && (
                            <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-center gap-2 text-red-400">
                                <AlertCircle size={18} />
                                <span>{status.error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-art-accent focus:outline-none transition-colors" 
                                    placeholder="Your Name" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-art-accent focus:outline-none transition-colors" 
                                    placeholder="your@email.com" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Message</label>
                                <textarea 
                                    rows="4" 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-art-accent focus:outline-none transition-colors" 
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={status.loading}
                                className="w-full bg-art-accent text-black font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status.loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
