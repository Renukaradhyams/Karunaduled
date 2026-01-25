import React from 'react';

const MapEmbed: React.FC = () => {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.0!2d75.8091002!3d14.5225933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMxJzIxLjMiTiA3NcKwNDgnMzIuOCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Karunadu Bulbs Location - Harihara"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute inset-0 pointer-events-none border border-primary/20 rounded-xl" />
    </div>
  );
};

export default MapEmbed;
