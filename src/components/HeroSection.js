import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ title, subtitle, primaryCta, secondaryCta }) => {
  return (
    <div className="relative bg-white overflow-hidden rounded-lg shadow-lg mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{title}</span>
                <span className="block gradient-text mt-3">{subtitle}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Generate comprehensive, customizable AI policies aligned with the AI Adoption & Management Framework (AI-AMF). Build your AI governance foundation in minutes, not months.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to={primaryCta.link} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white gradient-bg hover:opacity-90 md:py-4 md:text-lg md:px-10">
                    {primaryCta.text}
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to={secondaryCta.link} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    {secondaryCta.text}
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="AI Governance"
          className="object-cover h-full lg:w-full opacity-90"
          style={{ mixBlendMode: 'multiply' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20"></div>
      </div>
    </div>
  );
};

export default HeroSection;
