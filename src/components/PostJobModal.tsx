import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobPosted: () => void;
}

const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose, onJobPosted }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('jobs').insert([formData]);
      if (error) throw error;
      toast.success('Job posted successfully!');
      onJobPosted();
      onClose();
      setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to post job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-900">Post a New Job Opening</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input type="text" id="title" value={formData.title} onChange={handleChange} required className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" id="department" value={formData.department} onChange={handleChange} required className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" id="location" value={formData.location} onChange={handleChange} required className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select id="type" value={formData.type} onChange={handleChange} className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea id="description" rows={6} value={formData.description} onChange={handleChange} required className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <div className="pt-2 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 flex justify-center items-center bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {loading ? 'Posting...' : 'Post Job'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostJobModal;
