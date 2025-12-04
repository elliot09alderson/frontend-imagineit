import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-black text-gray-300 font-sans">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Cancellation & Refund Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Digital Goods</h2>
                        <p>
                            <strong>ImagineIt Cloud</strong> provides digital services (AI image generation and editing) and digital credits. Due to the nature of digital goods, which can be instantly consumed, we generally do not offer refunds once credits have been purchased and added to your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Refund Eligibility</h2>
                        <p>
                            Refunds may be considered in the following exceptional circumstances:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Technical Error:</strong> If you were charged but credits were not added to your account due to a technical glitch.</li>
                            <li><strong>Duplicate Charge:</strong> If you were accidentally charged twice for the same transaction.</li>
                        </ul>
                        <p className="mt-2">
                            Dissatisfaction with the artistic style or output of the AI generation does not qualify for a refund, as AI generation is experimental and subjective in nature.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Cancellation</h2>
                        <p>
                            Since our service operates on a pay-per-credit basis and not a recurring subscription, there is no subscription to cancel. You are not obligated to make future purchases.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. How to Request a Refund</h2>
                        <p>
                            If you believe you are eligible for a refund based on the criteria above, please contact our support team within 7 days of the transaction.
                        </p>
                        <p className="mt-2">
                            Email: <a href="mailto:support@imagineit.cloud" className="text-art-accent hover:underline">support@imagineit.cloud</a><br/>
                            Subject: Refund Request - [Your Order ID]
                        </p>
                        <p className="mt-2">
                            Please include your registered email address, order ID, and a description of the issue. We will review your request and respond within 3-5 business days.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
