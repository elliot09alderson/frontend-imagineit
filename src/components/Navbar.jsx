import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) => `text-2xl font-bold transition-colors ${isActive(path) ? 'text-art-accent' : 'text-white hover:text-art-accent/70'}`;

  const desktopLinkClass = (path) => `hover:opacity-50 transition-opacity ${isActive(path) ? 'text-art-accent opacity-100 font-bold' : 'text-white'}`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-6 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter hidden md:block">
          imagineit.cloud
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-sans text-sm uppercase tracking-widest items-center">
          <Link to="/" className={desktopLinkClass('/')}>Home</Link>
          <Link to="/product" className={desktopLinkClass('/product')}>Product</Link>
          <Link to="/corporate" className={desktopLinkClass('/corporate')}>Corporate</Link>
          <Link to="/pricing" className={desktopLinkClass('/pricing')}>Pricing</Link>
          <Link to="/community" className={desktopLinkClass('/community')}>Community</Link>
          {isAuthenticated ? (
              <>
                  {user?.role === 'admin' && (
                      <Link to="/admin" className={desktopLinkClass('/admin')}>Styles</Link>
                  )}
                  <Link to="/lite-edit" className={desktopLinkClass('/lite-edit')}>Go Lite</Link>
                  <Link to="/edit" className={desktopLinkClass('/edit')}>Create</Link>
                  <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors">Logout</button>
              </>
          ) : (
              <Link to="/login" className={desktopLinkClass('/login')}>Login</Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={toggleMenu} className="md:hidden z-50 relative">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-10 font-sans uppercase tracking-widest items-center">
            <Link to="/" onClick={toggleMenu} className={linkClass('/')}>Home</Link>
            <Link to="/product" onClick={toggleMenu} className={linkClass('/product')}>Product</Link>
            <Link to="/corporate" onClick={toggleMenu} className={linkClass('/corporate')}>Corporate</Link>
            <Link to="/pricing" onClick={toggleMenu} className={linkClass('/pricing')}>Pricing</Link>
            <Link to="/community" onClick={toggleMenu} className={linkClass('/community')}>Community</Link>
            {isAuthenticated ? (
                <>
                    {user?.role === 'admin' && (
                        <Link to="/admin" onClick={toggleMenu} className={linkClass('/admin')}>Styles</Link>
                    )}
                    <Link to="/lite-edit" onClick={toggleMenu} className={linkClass('/lite-edit')}>Go Lite</Link>
                    <Link to="/edit" onClick={toggleMenu} className={linkClass('/edit')}>Create</Link>
                    <button onClick={() => { logout(); toggleMenu(); }} className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors mt-4">Logout</button>
                </>
            ) : (
                <Link to="/login" onClick={toggleMenu} className={linkClass('/login')}>Login</Link>
            )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
