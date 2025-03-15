import React from 'react';

const Install = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Policy Generator Installation Guide</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Follow these steps to set up the application with Stripe payment processing.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Prerequisites</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">Node.js (v14 or later)</li>
            <li className="mb-2">npm or yarn</li>
            <li className="mb-2">Stripe account</li>
          </ul>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Installation Steps</h2>
          <ol className="list-decimal pl-5 text-gray-700">
            <li className="mb-4">
              <p className="font-medium">Clone the repository</p>
              <pre className="bg-gray-100 p-3 mt-2 rounded-md text-sm">
                git clone &lt;repository-url&gt;
                <br />
                cd policy-generator
              </pre>
            </li>
            <li className="mb-4">
              <p className="font-medium">Install dependencies</p>
              <pre className="bg-gray-100 p-3 mt-2 rounded-md text-sm">npm install</pre>
            </li>
            <li className="mb-4">
              <p className="font-medium">Configure environment variables</p>
              <p className="mt-1">Copy the .env.example file to .env and update with your Stripe API keys</p>
              <pre className="bg-gray-100 p-3 mt-2 rounded-md text-sm">
                cp .env.example .env
                <br />
                # Edit .env with your text editor
              </pre>
            </li>
            <li className="mb-4">
              <p className="font-medium">Start the server</p>
              <pre className="bg-gray-100 p-3 mt-2 rounded-md text-sm">npm run dev</pre>
              <p className="mt-1">This will start a development server at http://localhost:3000</p>
            </li>
          </ol>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Stripe Configuration</h2>
          <p className="mb-3">To use real Stripe payments instead of simulation:</p>
          <ol className="list-decimal pl-5 text-gray-700">
            <li className="mb-2">
              Create a Stripe account at{' '}
              <a href="https://stripe.com" className="text-indigo-600 hover:text-indigo-500">
                stripe.com
              </a>
            </li>
            <li className="mb-2">Get your API keys from the Stripe Dashboard</li>
            <li className="mb-2">Update the .env file with your keys</li>
            <li className="mb-2">
              Open js/payments.js and set{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded">USE_REAL_PAYMENT_API = true</code>
            </li>
          </ol>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Testing Payments</h2>
          <p className="mb-3">Use these test card numbers for testing:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">
              <code className="bg-gray-100 px-1 py-0.5 rounded">4242 4242 4242 4242</code> - Successful payment
            </li>
            <li className="mb-2">
              <code className="bg-gray-100 px-1 py-0.5 rounded">4000 0000 0000 0002</code> - Declined payment
            </li>
            <li className="mb-2">Use any future expiration date, any 3-digit CVC, and any 5-digit ZIP code</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export default Install;
