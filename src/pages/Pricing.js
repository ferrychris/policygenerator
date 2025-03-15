import React from 'react';

const Pricing = () => {
  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 900,
      description: 'Essential policies for organizations starting with AI.',
      features: [
        '3 core policy templates',
        'Simple customization options',
        'Organization name & branding',
        'PDF & Word document formats',
        '14 days of email support',
      ],
    },
    {
      id: 'professional',
      name: 'Professional Package',
      price: 1500,
      description: 'Perfect for organizations actively implementing AI governance.',
      features: [
        '8 essential policy templates',
        'All Basic policies, plus 5 more',
        'Standard customization options',
        'Organization name & branding',
        'PDF & Word document formats',
        '30 days of email support',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Suite',
      price: 5000,
      description: 'Complete solution for organizations with comprehensive AI governance needs.',
      features: [
        'Full suite of 19 policy templates',
        'All Professional policies, plus 11 more',
        'Advanced customization options',
        'Industry-specific adaptations',
        '2 hours of consultation',
        '90 days of support',
        'One round of revisions',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Pricing Plans</h1>
      <p className="text-lg text-gray-600 mb-8">
        Choose the plan that fits your organization's AI governance needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
            <p className="text-gray-600 mt-2">{plan.description}</p>
            <p className="text-4xl font-extrabold text-gray-900 mt-4">${plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-6 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
              onClick={() => alert(`Selected plan: ${plan.name}`)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
