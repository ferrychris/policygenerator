import React, { useState } from 'react';

const Generator = () => {
  const [policyType, setPolicyType] = useState('');
  const [customizations, setCustomizations] = useState({});
  const [generatedPolicy, setGeneratedPolicy] = useState('');

  const policyOptions = [
    'Data Privacy Policy',
    'AI Ethics Policy',
    'Incident Response Policy',
    'Model Governance Policy',
    'Bias Mitigation Policy',
  ];

  const handlePolicyTypeChange = (event) => {
    setPolicyType(event.target.value);
  };

  const handleCustomizationChange = (event) => {
    const { name, value } = event.target;
    setCustomizations((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePolicy = () => {
    if (!policyType) {
      alert('Please select a policy type.');
      return;
    }

    const policyTemplate = `Generated ${policyType} with the following customizations:\\n${JSON.stringify(
      customizations,
      null,
      2
    )}`;
    setGeneratedPolicy(policyTemplate);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Policy Generator</h1>
      <p className="text-lg text-gray-600 mb-8">
        Create a customized policy aligned with the AI Adoption & Management Framework (AI-AMF).
      </p>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-4">
          <label htmlFor="policyType" className="block text-sm font-medium text-gray-700">
            Select Policy Type
          </label>
          <select
            id="policyType"
            value={policyType}
            onChange={handlePolicyTypeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">-- Select a Policy Type --</option>
            {policyOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="customization" className="block text-sm font-medium text-gray-700">
            Customizations
          </label>
          <textarea
            id="customization"
            name="customization"
            rows="4"
            value={customizations.customization || ''}
            onChange={handleCustomizationChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter customizations (e.g., specific regulations, organizational details)"
          ></textarea>
        </div>
        <button
          onClick={generatePolicy}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
        >
          Generate Policy
        </button>
      </div>
      {generatedPolicy && (
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Policy</h2>
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">{generatedPolicy}</pre>
        </div>
      )}
    </div>
  );
};

export default Generator;
