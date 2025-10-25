import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import PageHeader from '../components/PageHeader';
import { Code, Smartphone, BrainCircuit, Cloud, Briefcase, ArrowRight, Star } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Tailored software solutions designed to meet your unique business requirements, built with scalability and performance in mind.'
    },
    {
      icon: Smartphone,
      title: 'Mobile & Web App Development',
      description: 'Engaging and responsive applications for both mobile and web platforms, ensuring a seamless user experience across all devices.'
    },
    {
      icon: BrainCircuit,
      title: 'AI/ML & IoT Solutions',
      description: 'Harness the power of Artificial Intelligence, Machine Learning, and IoT to automate processes and derive actionable insights from data.'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Robust and secure cloud infrastructure services, including migration, management, and optimization for platforms like AWS, Azure, and GCP.'
    },
    {
      icon: Briefcase,
      title: 'IT Consulting & Support',
      description: 'Expert guidance and strategic advice to optimize your IT infrastructure, along with 24/7 support to ensure business continuity.'
    }
  ];

  const clientLogos = [
    { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' },
    { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Amazon Web Services', url: 'https://i.postimg.cc/9f8MwX6r/Screenshot-2025-09-06-225159.jpg' },
    { name: 'Salesforce', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
    { name: 'Intel', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg' },
    { name: 'IBM', url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Oracle', url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    { name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Airbnb', url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
    { name: 'Uber', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
  ];

  const testimonials = Array.from({ length: 3 }, () => ({
    quote: faker.lorem.paragraph(),
    name: faker.person.fullName(),
    position: faker.person.jobTitle(),
    company: faker.company.name(),
    avatar: faker.image.avatar(),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive technology solutions to drive your business forward"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: services.length * 0.1 }}
                className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-center items-center text-center"
              >
                 <h3 className="text-2xl font-semibold text-blue-900 mb-4">Have a Custom Project?</h3>
                <p className="text-blue-800 leading-relaxed mb-6">We excel at turning unique ideas into powerful software solutions.</p>
                <Link to="/contact">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                        <span>Let's Talk</span>
                        <ArrowRight size={20} />
                    </motion.button>
                </Link>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Trusted by Industry Leaders & Innovators</h2>
          <div
            className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
              {clientLogos.map((logo) => (
                <li key={logo.name}>
                  <img src={logo.url} alt={logo.name} className="max-h-12 w-auto object-contain" />
                </li>
              ))}
            </ul>
             <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
              {clientLogos.map((logo) => (
                <li key={logo.name}>
                  <img src={logo.url} alt={logo.name} className="max-h-12 w-auto object-contain" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
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
                className="bg-white p-8 rounded-xl shadow-lg flex flex-col"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
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

export default Services;
