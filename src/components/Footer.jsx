import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-zinc-900 text-gray-400 py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="text-2xl font-serif font-bold text-white tracking-tighter mb-4 block">
                        imagineit.cloud
                    </Link>
                    <p className="text-sm text-gray-500">
                        Unleash your creativity with AI-powered image editing and generation.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Product</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/edit" className="hover:text-art-accent transition-colors">Create</Link></li>
                        <li><Link to="/pricing" className="hover:text-art-accent transition-colors">Pricing</Link></li>
                        <li><Link to="/community" className="hover:text-art-accent transition-colors">Community</Link></li>
                        <li><Link to="/corporate" className="hover:text-art-accent transition-colors">Corporate</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/privacy" className="hover:text-art-accent transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-art-accent transition-colors">Terms & Conditions</Link></li>
                        <li><Link to="/refund" className="hover:text-art-accent transition-colors">Refund Policy</Link></li>
                        <li><Link to="/contact" className="hover:text-art-accent transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Social / Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Connect</h3>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="hover:text-art-accent transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-art-accent transition-colors"><Instagram size={20} /></a>
                        <a href="https://www.linkedin.com/in/pratik-verma-1a0970192/" target="_blank" rel="noopener noreferrer" className="hover:text-art-accent transition-colors"><Linkedin size={20} /></a>
                    </div>
                    <a href="mailto:support@imagineit.cloud" className="flex items-center gap-2 text-sm hover:text-art-accent transition-colors">
                        <Mail size={16} /> support@imagineit.cloud
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-gray-600">
                <p>&copy; {currentYear} ImagineIt Cloud. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
