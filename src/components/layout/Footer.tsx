import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapEmbed from './MapEmbed';
import karunaduLogo from '@/assets/karunadu-logo.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/lighting-calculator', label: 'Lighting Calculator' },
    { path: '/wishlist', label: 'My Wishlist' },
    { path: '/why-choose-us', label: 'Why Choose Us' },
    { path: '/contact', label: 'Contact' },
  ];

  // Handle navigation with scroll to top
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <img 
                src={karunaduLogo} 
                alt="Karunadu LED" 
                className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-110"
              />
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">Karunadu LED</h3>
                <p className="text-xs text-muted-foreground">Quality Lighting Solutions</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for reliable, durable, and energy-efficient LED lighting solutions across Karnataka.
            </p>
            <div className="flex gap-2">
              <a href="https://wa.me/919986293448" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="gap-2 group">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a 
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavigation(link.path, e)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center gap-1 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:9986293448"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:animate-pulse" />
                <div>
                  <span className="block">9986293448</span>
                  <span className="text-xs text-muted-foreground/70">Primary</span>
                </div>
              </a>
              <a
                href="tel:8073685049"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:animate-pulse" />
                <div>
                  <span className="block">8073685049</span>
                  <span className="text-xs text-muted-foreground/70">Alternate</span>
                </div>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>
                  #2, 2nd Main Road, 2nd Block, Pampasagara Compound near, Vijayanagar Layout<br />
                  Harihara – 577601
                </span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Find Us</h4>
            <MapEmbed />
            <a 
              href="https://www.google.com/maps/search/?api=1&query=14.5225933,75.8091002"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="w-full gap-2 border-primary/30 hover:border-primary">
                <MapPin className="w-4 h-4" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Karunadu Bulbs. All rights reserved.</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                BIS Certified
              </span>
              <span>•</span>
              <span>Energy Efficient</span>
              <span>•</span>
              <span>Made in India 🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
