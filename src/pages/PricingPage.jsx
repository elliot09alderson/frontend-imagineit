import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, Zap } from 'lucide-react';

const PricingPage = () => {
    const { user, refreshCredits } = useAuth();
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePurchase = async (amount, credits) => {
        if (!user) {
            alert("Please login to purchase credits");
            return;
        }

        setLoading(true);
        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order
            const orderResponse = await fetch('http://localhost:5001/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ amount, credits })
            });

            if (!orderResponse.ok) throw new Error("Failed to create order");
            const order = await orderResponse.json();

            // 2. Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_TEST_KEY_ID", // Replace with env var if available
                amount: order.amount,
                currency: order.currency,
                name: "Artistic AI Editor",
                description: `${credits} Credits Pack`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        const verifyResponse = await fetch('http://localhost:5001/api/payment/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-auth-token': localStorage.getItem('token')
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                credits: credits
                            })
                        });

                        const verifyData = await verifyResponse.json();
                        if (verifyData.success) {
                            alert("Payment Successful! Credits added.");
                            refreshCredits(); // Refresh user credits in context
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Payment verification failed.");
                    }
                },
                prefill: {
                    name: user.email, // We don't have name in user model, using email
                    email: user.email,
                    contact: ""
                },
                theme: {
                    color: "#D0FD3E"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Purchase Error:", error);
            alert("Something went wrong during purchase.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 bg-black text-white flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                Get More <span className="text-art-accent">Credits</span>
            </h1>
            <p className="text-gray-400 mb-12 text-center max-w-lg">
                Unlock your creativity with our premium credit packs. Generate more stunning AI art today.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                {/* Basic Pack */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-art-accent/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-bold">Starter Pack</h3>
                            <p className="text-gray-400">Perfect for trying it out</p>
                        </div>
                        <div className="bg-zinc-800 p-2 rounded-lg">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">₹99</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-gray-300">
                        <li className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-art-accent" />
                            <span>10 Credits</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-art-accent" />
                            <span>High Quality Downloads</span>
                        </li>
                    </ul>
                    <button 
                        onClick={() => handlePurchase(99, 10)}
                        disabled={loading}
                        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-art-accent hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>

                {/* Pro Pack */}
                <div className="bg-zinc-900/50 border border-art-accent rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-art-accent text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                        BEST VALUE
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-bold">Pro Pack</h3>
                            <p className="text-gray-400">For serious creators</p>
                        </div>
                        <div className="bg-art-accent p-2 rounded-lg">
                            <Zap className="w-6 h-6 text-black" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">₹149</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-gray-300">
                        <li className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-art-accent" />
                            <span>20 Credits</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-art-accent" />
                            <span>High Quality Downloads</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-art-accent" />
                            <span>Priority Support</span>
                        </li>
                    </ul>
                    <button 
                        onClick={() => handlePurchase(149, 20)}
                        disabled={loading}
                        className="w-full py-3 bg-art-accent text-black font-bold rounded-xl hover:bg-white hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
