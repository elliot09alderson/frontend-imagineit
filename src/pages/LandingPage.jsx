import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import { Camera, Aperture, Focus } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../config';
import SEO from '../components/SEO';
import { apiFetch } from '../utils/api';

gsap.registerPlugin(ScrollTrigger);

const sampleImages = [
  { id: 1, src: "/sample/An androgynous face with closed eyes and windblown….jpeg", category: "PORTRAIT" },
  { id: 2, src: "/sample/Black and White Close-Up Portrait of an Asian Woman_ Timeless Elegance.jpeg", category: "B&W" },
  { id: 3, src: "/sample/The Secret to an Unforgettable Acting Portfolio_ Maximise Your Auditions with Powerful Expression - Studio TingTing.jpeg", category: "STUDIO" },
  { id: 4, src: "/sample/Ultra-realistic portrait of a young woman with….jpeg", category: "REALISM" },
  { id: 5, src: "/sample/_ (1).jpeg", category: "FASHION" },
  { id: 6, src: "/sample/_ (2).jpeg", category: "EDITORIAL" },
  { id: 7, src: "/sample/_ (3).jpeg", category: "ARTISTIC" },
  { id: 8, src: "/sample/_ (4).jpeg", category: "CONCEPT" },
  { id: 9, src: "/sample/_.jpeg", category: "STYLE" },
  { id: 10, src: "/sample/self photography.jpeg", category: "SELFIE" },
  { id: 11, src: "/sample/🌅 Современная мода_ устойчивый стиль на закате….jpeg", category: "MODERN" }
];

const LandingPage = () => {
  // ... (refs)
  const [displayedImages, setDisplayedImages] = useState(sampleImages.slice(0, 6));
  
  // Form States
  const [proposal, setProposal] = useState({ name: '', email: '', idea: '' });
  const [subscriberContact, setSubscriberContact] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    if (!proposal.name || !proposal.email || !proposal.idea) {
        alert("Please fill in all fields.");
        return;
    }
    setLoading(true);
    try {
        const res = await apiFetch(`${API_URL}/forms/proposal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proposal)
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.msg);
            setProposal({ name: '', email: '', idea: '' });
        } else {
            alert(data.msg);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!subscriberContact) {
        alert("Please enter an email or phone number.");
        return;
    }
    try {
        const res = await apiFetch(`${API_URL}/forms/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contact: subscriberContact })
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.msg);
            setSubscriberContact('');
        } else {
            alert(data.msg);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedImages(prev => {
        // Shuffle the array
        const shuffled = [...prev].sort(() => Math.random() - 0.5);
        return shuffled;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ... (rest of component)



  useEffect(() => {
    // Hero Animation (Masking)
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-mask", 
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(100% at 50% 50%)", duration: 2, ease: "power4.inOut" }
    )
    .fromTo(".hero-text",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      "-=1"
    );

    // Camera Elements Animation
    gsap.to(".camera-bracket", {
      scale: 1.1,
      opacity: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Fade Up Animations
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    });

    // Horizontal Scroll for Reviews
    const reviewsContainer = document.querySelector(".reviews-container");
    if (reviewsContainer) {
      gsap.to(reviewsContainer, {
        x: () => -(reviewsContainer.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: ".reviews-section",
          start: "top top",
          end: () => "+=" + reviewsContainer.scrollWidth,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });
    }

    // Update scroll on image load (just refresh ScrollTrigger)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', () => ScrollTrigger.refresh());
      }
    });

    // Business Section Animation
    const businessSection = document.querySelector('.business-section');
    if (businessSection) {
      gsap.fromTo(businessSection,
        { 
          y: 100,
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: businessSection,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-art-black min-h-screen text-white">
      <SEO 
        title="Home" 
        description="Redefine reality with our AI-powered image editor. Create stunning visuals with ease."
        keywords="nano banana image edit, nano banana, nano banana pro, gemini image edit, ai image edit, AI image editor, photo editing, creative tools, online editor"
      />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image with Mask */}
        <div className="absolute inset-0 z-0 hero-mask bg-white">
            <img 
                src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=2070&auto=format&fit=crop" 
                alt="Artistic Background" 
                className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
            />
        </div>

        {/* Camera UI Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none p-10 flex flex-col justify-between">
            <div className="flex justify-between">
                <Focus className="w-8 h-8 text-white camera-bracket" />
                <Focus className="w-8 h-8 text-white camera-bracket transform rotate-90" />
            </div>
            <div className="flex justify-between">
                <Focus className="w-8 h-8 text-white camera-bracket transform -rotate-90" />
                <Focus className="w-8 h-8 text-white camera-bracket transform rotate-180" />
            </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center mix-blend-difference">
          <h1 className="hero-text text-9xl font-serif font-bold tracking-tighter mb-4">
            REDEFINE
          </h1>
          <h1 className="hero-text text-9xl font-serif font-bold tracking-tighter italic text-transparent stroke-white stroke-2" style={{ WebkitTextStroke: '2px white' }}>
            REALITY
          </h1>
          <p className="hero-text mt-8 text-xl font-sans tracking-widest uppercase">
            AI-Powered Image Manipulation & Editing Services
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen py-20 px-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 fade-up">
                <h2 className="text-6xl font-serif">Precision Tools</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Our AI Image Editing Services understand the context of your image, allowing for seamless edits that look completely natural. 
                    We provide:
                </p>
                <ul className="list-disc list-inside text-gray-400 text-lg leading-relaxed">
                    <li>AI Image Editing & Generation</li>
                    <li>Pose Detection & Style Transfer</li>
                    <li>Background Removal & Replacement</li>
                    <li>Professional Photo Retouching</li>
                </ul>
                <div className="flex gap-4">
                    <div className="p-4 border border-white/20 rounded-full">
                        <Camera size={24} />
                    </div>
                    <div className="p-4 border border-white/20 rounded-full">
                        <Aperture size={24} />
                    </div>
                </div>
            </div>
            <div className="relative h-[600px] w-full overflow-hidden fade-up">
                <img 
                    src="/precision_tool.jpg" 
                    alt="Feature" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
      </section>

      {/* Flagship Feature: Pose Detection */}
      <section className="min-h-screen py-20 px-10 relative bg-art-gray">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-up">
                <h2 className="text-5xl md:text-7xl font-serif mb-6">Pose Detection Magic</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Upload your image and let our ML model analyze the pose to suggest outstanding artistic styles.
                </p>
            </div>
            
            <div className="relative h-[80vh] w-full border border-white/10 rounded-2xl overflow-hidden fade-up">
                <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative border-r border-white/10 group">
                        <img 
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                            alt="Original" 
                            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="border-2 border-art-accent/50 w-3/4 h-3/4 rounded-lg relative">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-art-accent"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-art-accent"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-art-accent"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-art-accent"></div>
                                <span className="absolute top-4 left-4 bg-art-accent text-black text-xs font-bold px-2 py-1">DETECTING POSE...</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img 
                            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop" 
                            alt="Generated" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-10 right-10 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
                            <h4 className="text-art-accent font-bold mb-2">STYLE MATCHED</h4>
                            <p className="text-sm text-gray-300">Cyberpunk Aesthetic</p>
                            <p className="text-sm text-gray-300">Confidence: 98%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
                { title: "Cost Effective", desc: "Premium quality at a fraction of the studio cost.", icon: "💎" },
                { title: "Lightning Fast", desc: "Get studio-grade results in seconds, not days.", icon: "⚡" },
                { title: "Top Quality", desc: "High-resolution output suitable for print and digital.", icon: "✨" }
            ].map((item, i) => (
                <div key={i} className="p-10 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors duration-300 fade-up">
                    <div className="text-4xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                </div>
            ))}
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-white/10 fade-up">
                <h3 className="text-3xl font-serif mb-4">Personal Branding</h3>
                <p className="text-gray-400">Elevate your social media presence with consistent, high-end aesthetics.</p>
            </div>
            <div className="p-10 bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl border border-white/10 fade-up">
                <h3 className="text-3xl font-serif mb-4">Product Photoshoot</h3>
                <p className="text-gray-400">Turn simple product shots into commercial masterpieces without a studio.</p>
            </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-32 px-10 relative bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto">
            <div className="fade-up group relative">
                <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-10 relative z-10 text-white mix-blend-difference cursor-default tracking-tight" data-text="PRECISION ARCHITECTURE">
                    PRECISION ARCHITECTURE
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl relative z-10 font-sans font-light">
                    Our system bypasses traditional generation methods by leveraging <span className="text-white font-medium">ML KIT</span> for high-fidelity <span className="text-white font-medium">Posture Analysis</span> and <span className="text-white font-medium">Pose Detection</span>. 
                    This enables <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-bold">exact numerical matching</span> of skeletal vectors, eliminating the variance of LLM textual interpretation. 
                    We utilize <span className="text-white font-medium">Pre-Generated Data</span> for rigorous <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-bold">Quality Control</span>, ensuring every pixel is synthesized with deterministic accuracy.
                </p>
                
                {/* Subtle Glow Effect Overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-3xl"></div>
            </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-32 px-10 relative bg-black text-center border-t border-white/10">
        <h2 className="text-sm font-sans tracking-[0.5em] text-gray-500 mb-10 uppercase fade-up">Powered By</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-40 opacity-80 fade-up">
            <div className="text-center group cursor-default">
                <h3 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-600 group-hover:scale-110 group-hover:skew-x-6 transition-all duration-1000 ease-out">ML KIT</h3>
                <p className="mt-4 text-gray-500 tracking-widest group-hover:text-emerald-400 transition-colors">NUMERICAL POSE ANALYSIS</p>
            </div>
            <div className="w-32 h-px md:w-px md:h-32 bg-white/20"></div>
            <div className="text-center group cursor-default">
                <h3 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-600 group-hover:scale-110 group-hover:-skew-x-6 transition-all duration-1000 ease-out">PRE-GEN</h3>
                <p className="mt-4 text-gray-500 tracking-widest group-hover:text-violet-400 transition-colors">QUALITY CONTROLLED DATA</p>
            </div>
        </div>
      </section>

       {/* Showcase Section */}
       <section className="min-h-screen py-20 px-10 relative bg-art-gray">
            <h2 className="text-8xl font-serif text-center mb-20 fade-up">CREATE</h2>
            
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
                <AnimatePresence>
                    {displayedImages.map((image) => (
                        <motion.div 
                            layout
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="aspect-[3/4] overflow-hidden relative group rounded-xl cursor-pointer"
                        >
                            <img 
                                src={image.src} 
                                alt={image.category}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                <span className="text-art-accent font-sans tracking-widest text-sm mb-2">{image.category}</span>
                                <span className="text-white font-serif text-2xl">View Sample</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
       </section>

       {/* Reviews Section (Horizontal Scroll) */}
       <section className="reviews-section py-20 bg-white text-black overflow-hidden relative">
            <div className="mb-20 px-10 fade-up">
                <h2 className="text-6xl font-serif">Voices of Art</h2>
            </div>
            
            {/* Vignette Effect */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="reviews-container flex gap-10 px-10 w-fit">
                {[
                    {
                        name: "Elena R.",
                        role: "Digital Illustrator",
                        text: "The pose detection is absolutely game-changing. It understood exactly what I wanted to achieve with my portrait and the style transfer was flawless."
                    },
                    {
                        name: "Marcus T.",
                        role: "Concept Artist",
                        text: "I use this for rapid prototyping. The ML KIT integration gives me precise control over the skeletal structure, which is unheard of in other tools."
                    },
                    {
                        name: "Sarah L.",
                        role: "Social Media Manager",
                        text: "My engagement skyrocketed after I started using the cyberpunk aesthetic for my product shots. The quality is consistently studio-grade."
                    },
                    {
                        name: "David K.",
                        role: "Indie Game Dev",
                        text: "The pre-generated data ensures that I don't get weird artifacts. It's reliable enough to use for in-game assets directly."
                    },
                    {
                        name: "Jessica M.",
                        role: "Fashion Designer",
                        text: "Being able to visualize my designs on different poses instantly has saved me weeks of work. The lighting adaptation is surreal."
                    }
                ].map((review, i) => (
                    <div key={i} className="w-[400px] md:w-[600px] flex-shrink-0 p-10 bg-gray-100 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">
                                {review.name[0]}
                            </div>
                            <div>
                                <h4 className="font-bold">{review.name}</h4>
                                <p className="text-sm text-gray-500">{review.role}</p>
                            </div>
                        </div>
                        <p className="text-xl font-serif leading-relaxed">
                            "{review.text}"
                        </p>
                    </div>
                ))}
            </div>
       </section>

       {/* Business Idea & Newsletter */}
       <section className="min-h-screen flex flex-col items-center justify-center py-20 px-10 relative">
            
            {/* Morphing Business Form */}
            <div className="w-full max-w-2xl mb-32 business-section">
                <div className="bg-gradient-to-r from-art-gray to-black p-1 rounded-2xl">
                    <div className="bg-black p-10 rounded-xl text-center group hover:bg-art-gray/50 transition-colors duration-500">
                        <h2 className="text-4xl font-serif mb-6">Have a Business Idea?</h2>
                        <p className="text-gray-400 mb-8">Let's collaborate to build the next big thing in AI art.</p>
                        <form onSubmit={handleProposalSubmit} className="space-y-4 text-left hidden group-hover:block transition-all duration-500">
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                value={proposal.name}
                                onChange={(e) => setProposal({...proposal, name: e.target.value})}
                                className="w-full bg-transparent border-b border-white/20 p-4 focus:border-white outline-none transition-colors" 
                            />
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                value={proposal.email}
                                onChange={(e) => setProposal({...proposal, email: e.target.value})}
                                className="w-full bg-transparent border-b border-white/20 p-4 focus:border-white outline-none transition-colors" 
                            />
                            <textarea 
                                placeholder="Tell us about your idea..." 
                                value={proposal.idea}
                                onChange={(e) => setProposal({...proposal, idea: e.target.value})}
                                className="w-full bg-transparent border-b border-white/20 p-4 focus:border-white outline-none transition-colors h-32"
                            ></textarea>
                            <button disabled={loading} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                {loading ? 'Submitting...' : 'Submit Proposal'}
                            </button>
                        </form>
                        <button className="px-8 py-3 border border-white rounded-full group-hover:hidden">Start Collaboration</button>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div className="text-center max-w-xl mx-auto fade-up">
                <h2 className="text-3xl font-serif mb-6">Stay Inspired</h2>
                <p className="text-gray-400 mb-8">Join our newsletter for weekly art tips and feature updates.</p>
                <div className="flex gap-4 border-b border-white/20 pb-2 focus-within:border-white transition-colors">
                    <input 
                        type="text" 
                        placeholder="Email or Phone Number" 
                        value={subscriberContact}
                        onChange={(e) => setSubscriberContact(e.target.value)}
                        className="bg-transparent w-full outline-none text-lg" 
                    />
                    <button onClick={handleSubscribe} className="text-sm uppercase tracking-widest hover:text-gray-300">Subscribe</button>
                </div>
            </div>

       </section>

       <footer className="py-20 px-10 border-t border-white/10 bg-black relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
                <div>
                    <h2 className="text-8xl font-serif mb-10 leading-[0.8]">
                        LET'S <br/>
                        <span className="italic text-gray-500">CREATE</span>
                    </h2>
                    <div className="flex gap-4">
                        {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
                            <MagneticButton key={social} className="group">
                                <a href="#" className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300 block">
                                    {social}
                                </a>
                            </MagneticButton>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-end items-start md:items-end">
                    <p className="text-xl text-gray-400 max-w-sm text-left md:text-right mb-10">
                        Experience the future of image editing. Join our community of creators today.
                    </p>
                    <MagneticButton>
                        <button className="w-32 h-32 bg-art-accent rounded-full text-black font-bold text-lg hover:scale-110 transition-transform duration-300">
                            Get App
                        </button>
                    </MagneticButton>
                </div>
            </div>
            
            <div className="flex justify-between items-end text-sm text-gray-600 uppercase tracking-widest">
                <p>© 2025 imagineit.cloud Image Editor</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
            
            {/* Big Text Background */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-10">
                <h1 className="text-[15vw] font-bold leading-none whitespace-nowrap text-center translate-y-1/3">
                    imagineit.cloud
                </h1>
            </div>
       </footer>

    </div>
  );
};

export default LandingPage;
