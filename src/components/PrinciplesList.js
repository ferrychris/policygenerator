import React from 'react';

const PrinciplesList = ({ principles }) => {
  return (
    <ul className="space-y-2">
      {principles.map((principle, index) => (
        <li key={index}>
          <strong>{principle.title}:</strong> {principle.description}
        </li>
      ))}
    </ul>
  );
};

export default PrinciplesList;
