import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

const links = [
  { label: "Home", path: "/" },
  { label: "The Furnace", path: "/furnace" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Materials", path: "/materials" },
  { label: "Outputs", path: "/outputs" },
  { label: "Components", path: "/components" },
  { label: "Control System", path: "/control-system" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/85 backdrop-blur-xl border-b border-forest/10 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-emerald2 shadow-md">
            <Leaf className="h-5 w-5 text-mint" />
          </span>
          <span className="font-heading font-bold text-xl tracking-tight text-forest">
            Agri<span className="text-emerald2">Loop</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active ? "text-forest" : "text-charcoal/60 hover:text-forest"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-emerald2"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-forest to-emerald2 px-5 py-2.5 text-sm font-semibold text-cream shadow-lg shadow-forest/20 hover:shadow-xl hover:scale-[1.03] transition-all"
          >
            Explore AgriLoop
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-forest"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-cream/95 backdrop-blur-xl border-b border-forest/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                    location.pathname === l.path ? "bg-mint/30 text-forest" : "text-charcoal/70"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/how-it-works"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest to-emerald2 px-5 py-3 text-sm font-semibold text-cream"
              >
                Explore AgriLoop
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}