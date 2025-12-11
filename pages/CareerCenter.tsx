import React, { useState } from 'react';
import { JobPosting } from '../types';
import { Briefcase, MapPin, Clock, Plus, Trash2, X } from 'lucide-react';

interface CareerCenterProps {
  jobs: JobPosting[];
  onAddJob: (job: JobPosting) => void;
  onDeleteJob: (id: string) => void;
}

const CareerCenter: React.FC<CareerCenterProps> = ({ jobs, onAddJob, onDeleteJob }) => {
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState<Partial<JobPosting>>({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title && newJob.company) {
      onAddJob({
        id: crypto.randomUUID(),
        title: newJob.title!,
        company: newJob.company!,
        location: newJob.location || 'Remote',
        type: newJob.type as any,
        description: newJob.description || '',
        postedDate: new Date().toLocaleDateString()
      });
      setShowForm(false);
      setNewJob({ title: '', company: '', location: '', type: 'Full-time', description: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Career Center</h2>
          <p className="text-sm text-slate-600 font-medium">Manage job opportunities.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 shadow-sm font-medium"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Post New Job'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-indigo-100 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-bold text-slate-800 mb-4 text-lg">New Opportunity</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              placeholder="Job Title (e.g. Software Engineer)" 
              className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400" 
              value={newJob.title}
              onChange={e => setNewJob({...newJob, title: e.target.value})}
              required
            />
            <input 
              placeholder="Company Name" 
              className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
              value={newJob.company}
              onChange={e => setNewJob({...newJob, company: e.target.value})}
              required
            />
            <input 
              placeholder="Location" 
              className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
              value={newJob.location}
              onChange={e => setNewJob({...newJob, location: e.target.value})}
            />
            <div className="relative">
                <select 
                className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white appearance-none text-slate-900"
                value={newJob.type}
                onChange={e => setNewJob({...newJob, type: e.target.value as any})}
                >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Contract</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-600">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <textarea 
              placeholder="Job Description..." 
              className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none md:col-span-2 min-h-[100px] text-slate-900 placeholder:text-slate-400"
              rows={3}
              value={newJob.description}
              onChange={e => setNewJob({...newJob, description: e.target.value})}
            />
            <div className="md:col-span-2 flex flex-col md:flex-row justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="order-2 md:order-1 px-4 py-3 md:py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button type="submit" className="order-1 md:order-2 bg-indigo-600 text-white px-6 py-3 md:py-2 rounded-lg font-medium shadow-md active:scale-95 transition-transform">Publish Job</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                job.type === 'Remote' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
              }`}>
                {job.type}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{job.title}</h3>
            <p className="text-slate-700 font-medium mb-4">{job.company}</p>
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5 border-l border-slate-300 pl-3 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {job.postedDate}
              </div>
            </div>

            <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow leading-relaxed">
              {job.description}
            </p>

            <button className="w-full py-2.5 border border-indigo-200 text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-bold active:scale-95">
              View Details
            </button>

            <button 
              onClick={() => onDeleteJob(job.id)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 md:opacity-0 group-hover:opacity-100 transition-all"
              title="Delete Job"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        
        {jobs.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
            <Briefcase className="w-16 h-16 mb-4 text-slate-300" />
            <p className="font-medium text-lg text-slate-700">No active job postings.</p>
            <p className="text-sm">Be the first to post an opportunity!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerCenter;