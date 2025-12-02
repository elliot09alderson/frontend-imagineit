import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const CommunityPage = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
    });

    // Update scroll on image load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        scroll.update();
      } else {
        img.addEventListener('load', () => scroll.update());
      }
    });

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => scroll.update());
    resizeObserver.observe(scrollRef.current);

    return () => {
      if (scroll) scroll.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  const [images, setImages] = React.useState([]);

  useEffect(() => {
    fetch(`${API_URL}/user/community`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                setImages(data);
            } else {
                console.error("Expected array but got:", data);
                setImages([]);
            }
            // Update scroll after data load
            setTimeout(() => {
                if (scrollRef.current) {
                    // Force a resize event or re-init if needed, but usually Locomotive Scroll needs a kick
                    window.dispatchEvent(new Event('resize'));
                }
            }, 500);
        })
        .catch(err => console.error("Failed to fetch community posts", err));
  }, []);

  return (
    <div data-scroll-container ref={scrollRef} className="bg-art-black min-h-screen text-white pt-24 px-4 md:px-10">
      
      <div className="mb-20 text-center" data-scroll-section>
        <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-9xl font-serif font-bold mb-6"
        >
            COMMUNITY
        </motion.h1>
        <p className="text-xl text-gray-400 font-sans tracking-widest uppercase">
            Explore creations by artists worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20" data-scroll-section>
        {images.map((img, index) => (
            <div 
                key={img._id} 
                className={`relative overflow-hidden aspect-[3/4] ${index % 2 === 0 ? 'mt-0' : 'mt-20'} group rounded-xl`}
                data-scroll
                data-scroll-speed={index % 2 === 0 ? "1" : "2"}
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                >
                    {/* Original / Uploaded Image (Visible on Hover) */}
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <img 
                            src={img.original_image_url} 
                            alt="Original" 
                            className="w-full h-full object-cover grayscale brightness-90"
                        />
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-white/20">
                            ORIGINAL
                        </div>
                    </div>

                    {/* Generated Image (Default Visible) */}
                    <div className="absolute inset-0 z-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                        <img 
                            src={img.generated_image_url} 
                            alt={img.style_prompt} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-art-accent/80 text-black backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                            GENERATED
                        </div>
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent w-full opacity-100 transition-opacity duration-300">
                        <h3 className="text-xl font-serif line-clamp-1">{img.style_prompt || "Artistic Creation"}</h3>
                        <p className="text-sm text-gray-300">@artist_{img.user?.toString().slice(-4)}</p>
                    </div>
                </motion.div>
            </div>
        ))}
      </div>

      <section className="py-20 text-center" data-scroll-section>
        <h2 className="text-4xl font-serif mb-8">Join the Movement</h2>
        <button className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm">
            Upload Your Art
        </button>
      </section>

    </div>
  );
};

export default CommunityPage;
