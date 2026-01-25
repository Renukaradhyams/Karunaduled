import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import storeFront from '@/assets/store-front.jpg';

const FeaturedProducts: React.FC = () => {
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Featured Collection</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Popular <span className="text-gradient">Products</span>
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary group">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Store Image */}
          <div className="relative rounded-2xl overflow-hidden group animate-fade-in">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
              <img
                src={storeFront}
                alt="Karunadu Bulbs Store"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Visit Our Store
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Experience our complete range of lighting solutions at our showroom in Harihara
              </p>
              <Link to="/contact">
                <Button className="gap-2 glow-primary-sm">
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to="/products"
                className="group card-glow rounded-xl overflow-hidden animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-primary">
                      {product.wattageOptions[0]}W - {product.wattageOptions[product.wattageOptions.length - 1]}W
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
