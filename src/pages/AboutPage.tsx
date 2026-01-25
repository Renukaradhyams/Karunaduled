import React from 'react';
import { Target, Eye, Shield, Award, Users, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    { icon: Shield, title: 'Quality First', description: 'Every product meets strict BIS standards' },
    { icon: Award, title: 'Trust & Reliability', description: 'Building long-term customer relationships' },
    { icon: Users, title: 'Customer Focus', description: 'Your satisfaction is our priority' },
    { icon: Zap, title: 'Innovation', description: 'Embracing latest LED technologies' },
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="relative py-16 bg-glow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              About <span className="text-gradient">Karunadu Bulbs</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Karunadu Bulbs is a lighting industry focused on manufacturing and supplying reliable, 
              durable, and energy-efficient LED lighting solutions for residential, commercial, and 
              industrial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card-glow p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To provide reliable, affordable, and energy-efficient lighting solutions that enhance 
                everyday life. We envision a future where quality lighting is accessible to every 
                home, office, and commercial space across India.
              </p>
            </div>

            {/* Mission */}
            <div className="card-glow p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To deliver high-quality lighting products while maintaining customer trust, safety 
                standards, and long-term value. We are committed to innovation, sustainability, 
                and exceeding customer expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Karunadu Bulbs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Story
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Founded with a vision to bring quality lighting to every corner of India, Karunadu 
                Bulbs has grown from a small manufacturing unit to a trusted name in the LED 
                lighting industry.
              </p>
              <p>
                Based in Harihara, Karnataka, we understand the unique lighting needs of Indian 
                households and businesses. Our products are designed to withstand local conditions 
                while delivering exceptional performance and energy savings.
              </p>
              <p>
                Every product bearing the Karunadu name is BIS certified, ensuring that you receive 
                lighting solutions that meet the highest safety and quality standards. We take pride 
                in our commitment to customer satisfaction and after-sales support.
              </p>
              <p>
                Whether you're a homeowner looking for everyday lighting, an electrician seeking 
                reliable products for your clients, or a contractor managing a large project, 
                Karunadu Bulbs is your trusted partner for all lighting needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
