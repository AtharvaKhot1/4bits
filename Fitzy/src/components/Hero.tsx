import React from 'react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 relative bg-FITZY-dark">
      <div className="FITZY-container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            FITZY Exercise Classes
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            The most professional and comprehensive free fitness course! Learn how to exercise using the correct technique.
          </p>
          <div className="flex justify-center">
            <a
              href="#daily-tracker"
              className="btn-primary px-8 py-3 text-lg"
            >
              Start Tracking
            </a>
          </div>
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-FITZY-dark/90 to-transparent z-0" />
    </section>
  );
};

export default Hero;
