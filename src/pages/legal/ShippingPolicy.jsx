import React from 'react';

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-black text-gray-300 font-sans">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Shipping and Delivery Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Nature of Service</h2>
                        <p>
                            <strong>ImagineIt Cloud</strong> is a digital platform providing AI-powered image generation and editing services. We do not sell or ship physical products.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Delivery of Services</h2>
                        <p>
                            Upon successful payment and purchase of credits:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Instant Access:</strong> Credits are instantly credited to your account wallet.</li>
                            <li><strong>Digital Output:</strong> All generated or edited images are available for download immediately after processing is complete.</li>
                            <li><strong>No Physical Shipping:</strong> Since there are no physical goods, there are no shipping fees, shipping addresses, or delivery times associated with our services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Issues with Delivery</h2>
                        <p>
                            If you have purchased credits but they are not reflecting in your account, please contact our support team immediately.
                        </p>
                        <p className="mt-2">
                            Email: <a href="mailto:support@imagineit.cloud" className="text-art-accent hover:underline">support@imagineit.cloud</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
