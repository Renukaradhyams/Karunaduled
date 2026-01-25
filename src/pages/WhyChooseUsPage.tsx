import React from 'react';
import { Shield, Zap, Clock, IndianRupee, Headphones, Truck, Award, Wrench } from 'lucide-react';

const WhyChooseUsPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'BIS Certified Products',
      description: 'All our products meet the Bureau of Indian Standards certification, ensuring safety and quality you can trust.',
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'Our LED products consume up to 80% less energy compared to traditional lighting, helping you save on electricity bills.',
    },
    {
      icon: Clock,
      title: 'Long Lifespan',
      description: 'With up to 50,000 hours of operation, our lights last years without needing replacement.',
    },
    {
      icon: IndianRupee,
      title: 'Competitive Pricing',
      description: 'We offer the best value for money without compromising on quality or performance.',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Our dedicated support team is always ready to help you with product selection and after-sales queries.',
    },
    {
      icon: Truck,
      title: 'Pan-India Delivery',
      description: 'We deliver our products across India with reliable shipping partners.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every product goes through rigorous quality checks before reaching you.',
    },
    {
      icon: Wrench,
      title: 'Easy Installation',
      description: 'Our products are designed for hassle-free installation with standard fittings.',
    },
  ];

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="py-16 bg-glow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Why Choose <span className="text-gradient">Karunadu Bulbs?</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover what sets us apart as your trusted lighting partner
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-glow p-6 rounded-xl animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Trusted by Thousands Across India
            </h2>
            <p className="text-lg text-muted-foreground">
              From homeowners to large contractors, Karunadu Bulbs has been the preferred choice 
              for quality lighting solutions. Our commitment to excellence and customer satisfaction 
              has earned us a reputation for reliability and trust.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Product Range</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-1">BIS Certified</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUsPage;
