import React from 'react';
import { faker } from '@faker-js/faker';
import PageHeader from '../components/PageHeader';

const Privacy: React.FC = () => {
  const generateContent = (paragraphs: number) => {
    return Array.from({ length: paragraphs }, () => faker.lorem.paragraph(5)).join('\n\n');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Last updated: 2025-01-01"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose lg:prose-xl max-w-none text-gray-700">
          <h2>1. Introduction</h2>
          <p>{generateContent(2)}</p>

          <h2>2. Information We Collect</h2>
          <p>{generateContent(1)}</p>
          <h3>2.1. Information You Provide</h3>
          <p>{generateContent(2)}</p>
          <h3>2.2. Information We Collect Automatically</h3>
          <p>{generateContent(1)}</p>

          <h2>3. How We Use Your Information</h2>
          <p>{generateContent(3)}</p>

          <h2>4. How We Share Your Information</h2>
          <p>{generateContent(2)}</p>

          <h2>5. Your Rights and Choices</h2>
          <p>{generateContent(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
