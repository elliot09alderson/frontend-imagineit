import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-black text-gray-300 font-sans">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                        <p>
                            Welcome to <strong>ImagineIt Cloud</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and protect your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Personal Information:</strong> When you register, we collect your email address and basic profile information.</li>
                            <li><strong>Usage Data:</strong> We collect data on how you interact with our services, including images uploaded and generated.</li>
                            <li><strong>Payment Information:</strong> We do not store your credit card details. All payment transactions are processed through our third-party payment processor, Razorpay.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Provide and maintain our Service.</li>
                            <li>Process your transactions and manage your credits.</li>
                            <li>Improve our AI models and user experience.</li>
                            <li>Communicate with you about updates and offers.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Services</h2>
                        <p>
                            We may use third-party services (such as Google Analytics, Razorpay, Cloudinary) that collect, monitor, and analyze this type of information in order to increase our Service's functionality. These third-party service providers have their own privacy policies addressing how they use such information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@imagineit.cloud" className="text-art-accent hover:underline">support@imagineit.cloud</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
