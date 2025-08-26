import React from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import PageHeader from '../components/PageHeader';
import { Star } from 'lucide-react';

const Clients: React.FC = () => {
  const clientLogos = [
    'https://via.placeholder.com/150x60/CBD5E0/4A5568?text=InnovateCorp',
    'https://via.placeholder.com/150x60/A0AEC0/2D3748?text=QuantumLeap',
    'https://via.placeholder.com/150x60/E2E8F0/4A5568?text=FutureTech',
    'https://via.placeholder.com/150x60/CBD5E0/2D3748?text=Synergy Inc.',
    'https://via.placeholder.com/150x60/A0AEC0/4A5568?text=Apex Solutions',
    'https://via.placeholder.com/150x60/E2E8F0/2D3748?text=GlobalNet',
    'https://via.placeholder.com/150x60/CBD5E0/4A5568?text=Visionary Co.',
    'https://via.placeholder.com/150x60/A0AEC0/2D3748?text=Pinnacle',
  ];

  const testimonials = Array.from({ length: 3 }, () => ({
    quote: faker.lorem.paragraph(),
    name: faker.person.fullName(),
    position: faker.person.jobTitle(),
    company: faker.company.name(),
    avatar: faker.image.avatar(),
  }));

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Our Clients & Testimonials"
        subtitle="Building lasting partnerships with industry leaders"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Trusted by Companies Worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <img src={logo} alt={`Client Logo ${index + 1}`} className="max-h-12 filter grayscale hover:grayscale-0 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real stories from our valued partners</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
