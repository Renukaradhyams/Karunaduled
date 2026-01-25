import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { staggerItemVariants } from '@/components/animations/StaggerContainer';
import storeFront from '@/assets/store-front.jpg';
import aboutBg from '@/assets/backgrounds/about-bg.jpg';

const AboutSection: React.FC = () => {
  const values = [
    { icon: Target, title: 'Our Mission', description: 'Deliver high-quality lighting products while maintaining customer trust and safety standards.' },
    { icon: Eye, title: 'Our Vision', description: 'To provide reliable, affordable lighting solutions that enhance everyday life across India.' },
    { icon: Award, title: 'Quality First', description: 'Every product undergoes rigorous testing and is BIS certified for your safety.' },
    { icon: Users, title: 'Customer Focus', description: 'Building long-term relationships through excellent service and support.' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={aboutBg} 
          alt="" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/98 to-background/90" />
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left">
            <div className="relative">
              <motion.div
                className="relative rounded-2xl overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={storeFront}
                  alt="Karunadu Bulbs Store"
                  className="w-full aspect-[4/3] object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Floating Stats Card */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-card/90 backdrop-blur-sm border border-border"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-heading font-bold text-primary">5+</p>
                      <p className="text-xs text-muted-foreground">Years</p>
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-primary">10K+</p>
                      <p className="text-xs text-muted-foreground">Customers</p>
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-primary">50+</p>
                      <p className="text-xs text-muted-foreground">Products</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 rounded-3xl blur-2xl -z-10 opacity-50" />
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <div className="space-y-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-glow text-sm font-medium text-primary">
                About Karunadu LED
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Lighting India's Future, <span className="text-gradient">One Bulb at a Time</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Karunadu LED is a dedicated lighting industry focused on manufacturing and supplying 
                reliable, durable, and energy-efficient LED lighting solutions for residential, 
                commercial, and industrial needs. Based in Karnataka, we've been illuminating 
                homes and businesses across India.
              </p>
            </ScrollReveal>

            {/* Values Grid */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all group"
                  variants={staggerItemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">{value.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.4}>
              <Link to="/about">
                <Button size="lg" variant="outline" className="gap-2 group border-primary/30 hover:border-primary hover:bg-primary/10">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
