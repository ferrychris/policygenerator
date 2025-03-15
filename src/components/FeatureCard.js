import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white">
          <i className={`fas ${icon}`}></i>
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">{description}</dd>
    </div>
  );
};

export default FeatureCard;
