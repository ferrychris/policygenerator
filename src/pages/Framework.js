import React from 'react';

const Framework = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Framework Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            AI Adoption & Management Framework (AI-AMF)
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            A comprehensive approach to AI governance and implementation.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="py-5 px-6">
            <div className="prose max-w-none">
              <p>
                The AI Adoption & Management Framework (AI-AMF) is a structured
                approach to implementing AI across an organization. It addresses
                the full lifecycle of AI initiatives, from strategic planning to
                ongoing operations.
              </p>

              <h4 className="text-xl font-semibold mt-6 mb-3 gradient-text">
                The Six Layers of AI Adoption
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h5 className="text-lg font-medium flex items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full gradient-bg text-white mr-2">
                        1
                      </span>
                      Evaluate
                    </h5>
                    <p className="ml-10">
                      Assess organizational readiness, identify opportunities,
                      and align AI initiatives with strategic goals.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-lg font-medium flex items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full gradient-bg text-white mr-2">
                        2
                      </span>
                      Govern
                    </h5>
                    <p className="ml-10">
                      Establish governance structures, ethical guidelines, and
                      compliance protocols.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-lg font-medium flex items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full gradient-bg text-white mr-2">
                        3
                      </span>
                      Innovate
                    </h5>
                    <p className="ml-10">
                      Identify high-impact AI opportunities and create
                      sustainable frameworks for experimentation.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <h5 className="text-lg font-medium flex items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full gradient-bg text-white mr-2">
                        4
                      </span>
                      Secure
                    </h5>
                    <p className="ml-10">
                      Protect AI systems through comprehensive security
                      measures, risk management, and incident response.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-lg font-medium flex items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full gradient-bg text-white mr-2">
                        5
                      </span>
                      Operate
                    </h5>
                    <p className="ml-10">
                      Implement AI solutions with reliable deployment,
                      monitoring, and maintenance processes.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-lg font-medium flex items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full gradient-bg text-white mr-2">
                        6
                      </span>
                      Integrate
                    </h5>
                    <p className="ml-10">
                      Embed AI capabilities into organizational culture,
                      processes, and workflows.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-semibold mt-6 mb-3 gradient-text">
                Framework Principles
              </h4>

              <ul className="space-y-2">
                <li>
                  <strong>Process-Centric Orchestration:</strong> Organizing AI
                  capabilities around business processes rather than isolated
                  technologies.
                </li>
                <li>
                  <strong>Business as Code:</strong> Representing business rules
                  and knowledge in structured, versionable formats.
                </li>
                <li>
                  <strong>Semantic Layer:</strong> Creating an organizational
                  ontology that connects business concepts, data, and AI
                  components.
                </li>
                <li>
                  <strong>Value-Driven Approach:</strong> Prioritizing AI
                  initiatives based on measurable business value.
                </li>
                <li>
                  <strong>Risk-Based Governance:</strong> Applying governance
                  controls proportionate to the level of risk.
                </li>
              </ul>

              <h4 className="text-xl font-semibold mt-6 mb-3 gradient-text">
                Implementation Methodology
              </h4>

              <p>The AI-AMF is designed to be implemented in phases:</p>

              <ol className="space-y-2">
                <li>
                  <strong>Assessment Phase:</strong> Evaluate current state and
                  establish baselines
                </li>
                <li>
                  <strong>Foundation Phase:</strong> Implement core governance
                  structures and policies
                </li>
                <li>
                  <strong>Development Phase:</strong> Build capabilities across
                  the six framework layers
                </li>
                <li>
                  <strong>Maturity Phase:</strong> Refine and optimize AI
                  governance and operations
                </li>
              </ol>

              <p className="mt-4">
                Our AI Policy Generator creates customized policies aligned
                with the AI-AMF, helping organizations implement the framework
                effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Framework;
