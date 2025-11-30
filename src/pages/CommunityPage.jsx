import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { motion } from 'framer-motion';

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

  const images = [
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
                key={img.id} 
                className={`relative overflow-hidden aspect-[3/4] ${index % 2 === 0 ? 'mt-0' : 'mt-20'}`}
                data-scroll
                data-scroll-speed={index % 2 === 0 ? "1" : "2"}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <img 
                        src={img.src} 
                        alt={img.category} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xl font-serif">{img.category}</h3>
                        <p className="text-sm text-gray-300">@artist_{img.id}</p>
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
