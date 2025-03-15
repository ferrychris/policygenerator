import React from 'react';

const ImplementationPhases = ({ phases }) => {
  return (
    <ol className="space-y-2">
      {phases.map((phase, index) => (
        <li key={index}>
          <strong>{phase.title}:</strong> {phase.description}
        </li>
      ))}
    </ol>
  );
};

export default ImplementationPhases;
