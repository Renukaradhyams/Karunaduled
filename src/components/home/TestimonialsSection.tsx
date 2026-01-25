import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import testimonialsBg from '@/assets/backgrounds/testimonials-bg.jpg';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Home Owner',
    location: 'Harihara',
    rating: 5,
    text: 'Excellent quality LED bulbs! Been using Karunadu Bulbs for over 2 years now. The energy savings are remarkable and the warm light creates a perfect ambiance at home.',
    avatar: 'RK',
  },
  {
    id: 2,
    name: 'Priya Electricals',
    role: 'Electrician & Contractor',
    location: 'Davangere',
    rating: 5,
    text: 'As an electrician, I recommend Karunadu Bulbs to all my clients. The BIS certification gives confidence, and their products never fail. Great warranty support too!',
    avatar: 'PE',
  },
  {
    id: 3,
    name: 'Sri Lakshmi Traders',
    role: 'Business Owner',
    location: 'Bhadravathi',
    rating: 5,
    text: 'We use their commercial panel lights and flood lights in our warehouse. Bright, efficient, and very durable. The bulk pricing is also very competitive.',
    avatar: 'SL',
  },
  {
    id: 4,
    name: 'Mohammed Ashraf',
    role: 'Shop Owner',
    location: 'Shimoga',
    rating: 4,
    text: 'Good quality products at affordable prices. My shop is now fully equipped with Karunadu tube lights and downlights. Very satisfied with the purchase.',
    avatar: 'MA',
  },
  {
    id: 5,
    name: 'Suresh Builders',
    role: 'Construction Contractor',
    location: 'Haveri',
    rating: 5,
    text: 'For all our residential projects, we exclusively use Karunadu Bulbs. Reliable, consistent quality, and great after-sales service. Highly recommended!',
    avatar: 'SB',
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={testimonialsBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by homeowners, businesses, and electricians across Karnataka
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative card-glow rounded-2xl p-8 md:p-12 transition-all duration-500"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <Quote className="w-12 h-12 text-primary/20" />
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-in" key={currentTestimonial.id}>
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 transition-all duration-300 ${
                      i < currentTestimonial.rating
                        ? 'text-primary fill-primary'
                        : 'text-muted-foreground'
                    }`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-lg">
                  {currentTestimonial.avatar}
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:-mx-16">
              <Button
                variant="outline"
                size="icon"
                className="pointer-events-auto rounded-full border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 shadow-lg"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="pointer-events-auto rounded-full border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 shadow-lg"
                onClick={goToNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8 shadow-lg shadow-primary/50'
                    : 'bg-muted hover:bg-muted-foreground'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
