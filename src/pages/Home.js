import React from 'react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden rounded-lg shadow-lg mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">WhitegloveAI Policy Generator</span>
                  <span className="block gradient-text mt-3">Enterprise AI Governance Platform</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Generate comprehensive, customizable AI policies aligned with the AI Adoption & Management Framework (AI-AMF). Build your AI governance foundation in minutes, not months.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/pricing"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white gradient-bg hover:opacity-90 md:py-4 md:text-lg md:px-10"
                    >
                      Generate Your Policies
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="/templates"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      View Templates
                    </a>
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

      {/* Features Section */}
      <div className="py-12 bg-white rounded-lg shadow-lg mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for AI governance
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides a comprehensive solution for creating, managing, and implementing AI policies across your organization.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customizable Policy Templates</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  18+ pre-built policy templates aligned with industry standards and the AI-AMF framework, easily customizable to your organization's needs.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white">
                    <i className="fas fa-sitemap"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Process-Centric Orchestration</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Build a semantic layer for your organization with our ontology generator, representing your data and processes in a business-centric way.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white">
                    <i className="fas fa-code"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Business as Code</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Transform business documents into structured knowledge bases with markdown formats, making your policies machine-readable and versionable.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white">
                    <i className="fas fa-tasks"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Compliance Tracking</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Monitor policy implementation and compliance across your organization with dashboards and reporting tools.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
