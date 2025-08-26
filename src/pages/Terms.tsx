import React from 'react';
import { faker } from '@faker-js/faker';
import PageHeader from '../components/PageHeader';

const Terms: React.FC = () => {
  const generateContent = (paragraphs: number) => {
    return Array.from({ length: paragraphs }, () => faker.lorem.paragraph(5)).join('\n\n');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose lg:prose-xl max-w-none text-gray-700">
          <h2>1. Agreement to Terms</h2>
          <p>{generateContent(2)}</p>

          <h2>2. Intellectual Property Rights</h2>
          <p>{generateContent(2)}</p>

          <h2>3. User Representations</h2>
          <p>{generateContent(1)}</p>

          <h2>4. Prohibited Activities</h2>
          <p>{generateContent(3)}</p>

          <h2>5. Term and Termination</h2>
          <p>{generateContent(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
