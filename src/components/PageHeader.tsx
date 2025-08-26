import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
