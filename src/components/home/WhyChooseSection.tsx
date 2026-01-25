import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Clock, 
  IndianRupee, 
  Headphones, 
  Truck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { staggerItemVariants } from '@/components/animations/StaggerContainer';
import whyChooseBg from '@/assets/backgrounds/why-choose-bg.jpg';

const features = [
  {
    icon: Shield,
    title: 'BIS Certified',
    description: 'All products meet Bureau of Indian Standards',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Zap,
    title: 'Energy Efficient',
    description: 'Save up to 80% on electricity bills',
    color: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    icon: Clock,
    title: '50,000+ Hours',
    description: 'Long-lasting performance guaranteed',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: IndianRupee,
    title: 'Best Value',
    description: 'Competitive pricing without compromise',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated assistance for all queries',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    description: 'Fast shipping across the country',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={whyChooseBg} 
          alt="" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      
      {/* Additional Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-glow/5 blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-glow text-sm font-medium text-primary mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Why Choose Us
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The <span className="text-gradient">Karunadu Advantage</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground">
              We combine quality, efficiency, and value to deliver lighting solutions 
              that exceed expectations every time.
            </p>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              variants={staggerItemVariants}
            >
              <motion.div
                className="relative h-full p-6 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/30"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Card Glow Effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal className="text-center mt-12" delay={0.5}>
          <Link to="/why-choose-us">
            <Button size="lg" className="gap-2 group glow-primary-sm">
              Explore All Benefits
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyChooseSection;
