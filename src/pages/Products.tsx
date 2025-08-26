import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Download, Star, ArrowRight, CheckCircle } from 'lucide-react';

const Products: React.FC = () => {
  const products = [
    {
      name: 'Smart Analytics Platform',
      description: 'AI-powered business intelligence and analytics solution that transforms raw data into actionable insights.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&h=300&fit=crop&q=80',
      category: 'Analytics',
      features: [
        'Real-time data processing',
        'AI-powered insights',
        'Custom dashboard builder',
        'Advanced visualization tools',
      ],
      pricing: 'Starting at ₹99,999/mo',
      rating: 4.8,
      users: '10K+'
    },
    {
      name: 'Enterprise Management Suite',
      description: 'Comprehensive business management platform that streamlines operations and enhances productivity.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop&q=80',
      category: 'Management',
      features: [
        'Process automation',
        'Team collaboration tools',
        'Resource planning',
        'Workflow optimization',
      ],
      pricing: 'Starting at ₹1,49,999/mo',
      rating: 4.9,
      users: '5K+'
    },
    {
      name: 'Mobile Solutions Framework',
      description: 'Cross-platform mobile application development framework for rapid deployment.',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&h=300&fit=crop&q=80',
      category: 'Development',
      features: [
        'Cross-platform compatibility',
        'Native performance',
        'Cloud integration',
        'Offline functionality',
      ],
      pricing: 'Starting at ₹1,99,999/project',
      rating: 4.7,
      users: '2K+'
    },
    {
      name: 'AI Assistant Pro',
      description: 'Intelligent virtual assistant for customer service and business process automation.',
      image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500&h=300&fit=crop&q=80',
      category: 'AI/ML',
      features: [
        'Natural language processing',
        'Multi-language support',
        'Voice recognition',
        'Smart routing',
      ],
      pricing: 'Starting at ₹79,999/mo',
      rating: 4.6,
      users: '8K+'
    },
    {
      name: 'Cloud Security Suite',
      description: 'Enterprise-grade security solution for cloud infrastructure and data protection.',
      image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&h=300&fit=crop&q=80',
      category: 'Security',
      features: [
        'Advanced threat detection',
        'Real-time monitoring',
        'Compliance management',
        'Data encryption',
      ],
      pricing: 'Starting at ₹2,99,999/mo',
      rating: 4.9,
      users: '3K+'
    },
    {
      name: 'IoT Management Platform',
      description: 'Comprehensive IoT device management and data processing platform.',
      image: 'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=500&h=300&fit=crop&q=80',
      category: 'IoT',
      features: [
        'Device management',
        'Data collection',
        'Remote monitoring',
        'Scalable architecture',
      ],
      pricing: 'Starting at ₹2,49,999/mo',
      rating: 4.5,
      users: '1.5K+'
    },
    {
      name: 'CyberGuard Pro',
      description: 'Advanced cybersecurity suite providing real-time threat intelligence and automated incident response.',
      image: 'https://images.unsplash.com/photo-1585224800235-a851fa3a2157?w=500&h=300&fit=crop&q=80',
      category: 'Security',
      features: [
        'Endpoint protection',
        'Network monitoring',
        'Vulnerability scanning',
        'Automated remediation',
      ],
      pricing: 'Starting at ₹3,49,999/mo',
      rating: 4.9,
      users: '4K+'
    },
    {
      name: 'DevStream CI/CD',
      description: 'A complete DevOps platform to automate your software delivery lifecycle from code to cloud.',
      image: 'https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=500&h=300&fit=crop&q=80',
      category: 'Development',
      features: [
        'CI/CD pipelines',
        'Container orchestration',
        'Infrastructure as code',
        'Automated testing',
      ],
      pricing: 'Starting at ₹1,29,999/mo',
      rating: 4.8,
      users: '6K+'
    },
    {
      name: 'CommerceFlow Engine',
      description: 'A headless e-commerce platform designed for scalability and custom user experiences.',
      image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=500&h=300&fit=crop&q=80',
      category: 'E-commerce',
      features: [
        'Headless architecture',
        'API-first design',
        'Customizable checkout',
        'Multi-channel support',
      ],
      pricing: 'Starting at ₹2,19,999/mo',
      rating: 4.7,
      users: '2.5K+'
    }
  ];

  const categories = ['All', 'Analytics', 'Management', 'Development', 'AI/ML', 'Security', 'IoT', 'E-commerce'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive suite of software solutions designed to transform your business operations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 text-sm ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-900">{product.pricing}</span>
                      <span className="text-sm text-gray-500">{product.users} users</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                          <Play size={16} />
                          <span>Demo</span>
                        </motion.button>
                      </Link>
                      <Link to="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Download size={16} />
                          <span>Trial</span>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Don't see what you're looking for?</h2>
            <p className="text-xl text-gray-300">
              We specialize in custom software development. Let's build the perfect solution for your unique needs.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <span>Request Custom Solution</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
