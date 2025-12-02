import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-black text-gray-300 font-sans">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Terms and Conditions</h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using <strong>ImagineIt Cloud</strong>, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Intellectual Property</h2>
                        <p>
                            The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of ImagineIt Cloud and its licensors.
                        </p>
                        <p className="mt-2">
                            You retain ownership of the images you upload and generate. However, by using the Service, you grant us a license to use, reproduce, and display your content for the purpose of providing and improving the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. User Accounts</h2>
                        <p>
                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Purchases and Credits</h2>
                        <p>
                            We offer credits for purchase that allow you to generate or edit images. All purchases are final and non-refundable, except as required by law or our Refund Policy. Credits have no monetary value outside of our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Prohibited Uses</h2>
                        <p>
                            You may not use the Service to generate content that is illegal, offensive, defamatory, or infringes on the rights of others. We reserve the right to ban users who violate this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
                        <p>
                            In no event shall ImagineIt Cloud, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">7. Changes</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at: <a href="mailto:support@imagineit.cloud" className="text-art-accent hover:underline">support@imagineit.cloud</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
