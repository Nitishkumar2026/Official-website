import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import PageHeader from '../components/PageHeader';
import { Search, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = Array.from({ length: 9 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(6),
    category: faker.commerce.department(),
    excerpt: faker.lorem.paragraph(2),
    author: faker.person.fullName(),
    date: faker.date.past().toLocaleDateString(),
    image: `https://picsum.photos/seed/${faker.string.uuid()}/400/250`,
  }));

  const categories = [...new Set(posts.map(p => p.category))];
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Blog & Insights"
        subtitle="Stay updated with the latest in technology, industry trends, and company news"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <p className="text-sm text-blue-600 font-semibold mb-2">{post.category}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 h-14">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{post.author} • {post.date}</p>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <a href="#" className="font-semibold text-blue-600 group-hover:text-blue-800 transition-colors duration-200 flex items-center">
                      Read More <ArrowRight size={16} className="ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Search</h3>
              <div className="relative">
                <input type="text" placeholder="Search articles..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}><a href="#" className="text-gray-600 hover:text-blue-600">{cat}</a></li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
              <ul className="space-y-4">
                {recentPosts.map(post => (
                  <li key={post.id}>
                    <a href="#" className="font-semibold text-gray-800 hover:text-blue-600 block">{post.title}</a>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;
