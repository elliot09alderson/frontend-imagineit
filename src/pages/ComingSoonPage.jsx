import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ComingSoonPage = ({ title }) => {
  return (
    <div className="min-h-screen bg-art-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-art-accent blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="z-10 text-center px-4">
        <h1 className="text-6xl md:text-9xl font-serif font-bold mb-6 tracking-tighter">
          {title}
        </h1>
        <div className="w-24 h-1 bg-art-accent mx-auto mb-8"></div>
        <h2 className="text-2xl md:text-4xl font-sans font-light tracking-[0.5em] uppercase text-gray-400 mb-12">
          Coming Soon
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-12 text-lg">
          We are crafting something extraordinary. This feature is currently under development and will be available shortly.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-art-accent hover:text-white transition-colors uppercase tracking-widest text-sm border-b border-art-accent hover:border-white pb-1"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonPage;
