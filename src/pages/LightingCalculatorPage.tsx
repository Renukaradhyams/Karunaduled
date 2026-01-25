import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Lightbulb, Zap, IndianRupee } from 'lucide-react';
import LightingCalculator from '@/components/calculator/LightingCalculator';
import ScrollReveal from '@/components/animations/ScrollReveal';

const LightingCalculatorPage: React.FC = () => {
  const benefits = [
    { icon: Lightbulb, title: 'Perfect Lighting', description: 'Get the ideal brightness for any room' },
    { icon: Zap, title: 'Energy Efficient', description: 'Calculate savings vs incandescent bulbs' },
    { icon: IndianRupee, title: 'Cost Savings', description: 'See your monthly & yearly savings' },
    { icon: Calculator, title: 'Accurate Results', description: 'Based on industry lighting standards' },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-glow/5" />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center"
            >
              <Calculator className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Lighting <span className="text-gradient">Calculator</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find out exactly how many LED bulbs you need for perfect lighting in any room. 
              Save energy and money with our smart calculator.
            </p>
          </ScrollReveal>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-card/50 border border-border text-center"
              >
                <benefit.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto p-6 md:p-10 rounded-2xl bg-card border border-border shadow-xl"
          >
            <LightingCalculator />
          </motion.div>

          {/* Info Section */}
          <ScrollReveal className="mt-16 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                How We Calculate Your Lighting Needs
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  We use industry-standard lux levels for each room type (e.g., 300 lux for kitchens, 150 lux for bedrooms)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Ceiling height is factored in - taller ceilings require more light output
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Energy savings are calculated comparing LED vs traditional 60W incandescent bulbs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Cost estimates assume 6 hours of daily usage at ₹8/kWh electricity rate
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default LightingCalculatorPage;
