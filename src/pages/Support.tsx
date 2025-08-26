import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';
import PageHeader from '../components/PageHeader';
import { ChevronDown, Book, MessageSquare, Search } from 'lucide-react';

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Support: React.FC = () => {
  const faqs = Array.from({ length: 5 }, () => ({
    question: faker.lorem.sentence().replace('.', '?'),
    answer: faker.lorem.paragraph(3),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Support Center"
        subtitle="Find answers to your questions and get the help you need."
      />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-12">
            <input type="text" placeholder="Search for help..." className="w-full pl-12 pr-4 py-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Book className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Product Documentation</h3>
              <p className="text-gray-600">Browse detailed guides and tutorials.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <MessageSquare className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Submit a Ticket</h3>
              <p className="text-gray-600">Contact our support team directly.</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
