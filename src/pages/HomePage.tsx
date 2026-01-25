import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Clock, IndianRupee, Building2, CheckCircle2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBulb from '@/assets/hero-bulb.jpg';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import ProductRecommendations from '@/components/home/ProductRecommendations';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { staggerItemVariants } from '@/components/animations/StaggerContainer';
import SmartSearch from '@/components/search/SmartSearch';

const HomePage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const highlights = [
    { icon: Shield, title: 'BIS Certified', description: 'All products meet Indian quality standards' },
    { icon: Zap, title: 'Energy Efficient', description: 'Save up to 80% on electricity bills' },
    { icon: Clock, title: 'Long Life', description: 'Up to 50,000 hours of illumination' },
    { icon: IndianRupee, title: 'Affordable Pricing', description: 'Best value for quality lighting' },
    { icon: Building2, title: 'Versatile Use', description: 'For Home, Office & Commercial spaces' },
  ];

  const stats = [
    { value: '50K+', label: 'Hours Life' },
    { value: '80%', label: 'Energy Saved' },
    { value: '2 Yr', label: 'Warranty' },
    { value: '1000+', label: 'Happy Customers' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        
        {/* Rotating Light Beam */}
        <div className="absolute inset-0 light-beam opacity-30" />
        
        {/* Glow Effects */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] pointer-events-none"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-glow/5 blur-[80px] pointer-events-none"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Shield className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary">BIS Certified Products</span>
                </motion.div>
                
                <motion.h1 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="text-foreground">Illuminate Your World with</span>{' '}
                  <span className="text-gradient glow-text">Karunadu Bulbs</span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-muted-foreground max-w-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Quality Lighting Solutions for homes, offices, and commercial spaces. 
                  Energy-efficient, durable, and designed for Indian conditions.
                </motion.p>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full max-w-md flex items-center gap-3 px-5 py-4 rounded-xl bg-card/80 border border-border hover:border-primary/50 transition-all group"
                >
                  <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">Search for LED bulbs, lights...</span>
                  <kbd className="ml-auto px-2 py-1 rounded bg-secondary text-xs text-muted-foreground hidden sm:inline">Ctrl+K</kbd>
                </button>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link to="/products">
                  <Button size="lg" className="gap-2 glow-primary-sm group btn-ripple">
                    Explore Products
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10 gap-2 group transition-all duration-300">
                    Request Quote
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div 
                className="grid grid-cols-4 gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <p className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary group-hover:scale-110 transition-transform">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div 
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative group">
                {/* Glowing Ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/40 via-amber-glow/30 to-primary/20 blur-3xl scale-125"
                  animate={{ 
                    scale: [1.2, 1.3, 1.2],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Main Image */}
                <motion.div 
                  className="relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src={heroBulb}
                    alt="Karunadu LED Bulb glowing with warm light"
                    className="relative w-full max-w-md rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Floating Badge */}
                  <motion.div 
                    className="absolute -bottom-4 -right-4 md:-right-8 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium text-foreground">Made in India</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 relative bg-glow">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient">Karunadu Bulbs?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide high-quality LED lighting solutions that combine durability, efficiency, and affordability.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                className="card-glow p-6 rounded-xl text-center group cursor-pointer"
                variants={staggerItemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div 
                  className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Why Choose Us Section */}
      <WhyChooseSection />

      {/* AI Recommendations */}
      <ProductRecommendations />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute inset-0 light-beam opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Ready to Light Up Your Space?
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse our complete catalog and select the perfect lighting solutions for your needs. 
              No commitment required – just explore and enquire!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products">
                <Button size="lg" className="gap-2 glow-primary group btn-ripple">
                  Browse Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Smart Search Modal */}
      <SmartSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default HomePage;
