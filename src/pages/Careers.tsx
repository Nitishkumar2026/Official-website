import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { MapPin, Briefcase, Search, Loader2, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import PostJobModal from '../components/PostJobModal';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const Careers: React.FC = () => {
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile } = useAuth();

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
    } else {
      setJobListings(data as Job[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const departments = [...new Set(jobListings.map(j => j.department))];
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filteredJobs = departmentFilter === 'All'
    ? jobListings
    : jobListings.filter(job => job.department === departmentFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Careers at Yubisaki"
        subtitle="Join our team of innovators and build the future of technology"
      />

      <PostJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onJobPosted={fetchJobs} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-xl text-gray-600">Find your next opportunity with us</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
            <div className="relative flex-grow w-full">
              <input type="text" placeholder="Search job titles..." className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <select 
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full md:w-auto"
            >
              <option value="All">All Departments</option>
              {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
            {profile?.role === 'admin' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                <PlusCircle size={20} />
                <span>Post New Job</span>
              </motion.button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {filteredJobs.length > 0 ? filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`p-6 flex flex-col md:flex-row justify-between items-center ${index < filteredJobs.length - 1 ? 'border-b' : ''} hover:bg-gray-50 transition-colors duration-200`}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 hover:underline">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600 mt-2">
                      <span className="flex items-center gap-2"><Briefcase size={16} /> {job.department}</span>
                      <span className="flex items-center gap-2"><MapPin size={16} /> {job.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{job.type}</span>
                    <Link to="/contact">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                        Apply Now
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center p-12 text-gray-500">
                  <p>No job openings found. Please check back later.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
