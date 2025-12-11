import React, { useState } from 'react';
import { Alumni, EmploymentStatus, JobRelevance } from '../types';
import { Save } from 'lucide-react';

interface SurveyFormProps {
  onSubmit: (data: Omit<Alumni, 'id' | 'submissionDate'>) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    graduationYear: new Date().getFullYear(),
    email: '',
    status: EmploymentStatus.Employed,
    companyName: '',
    jobTitle: '',
    salary: 0,
    relevance: JobRelevance.Related,
    feedback: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset essential fields
    setFormData(prev => ({
      ...prev,
      fullName: '',
      studentId: '',
      email: '',
      companyName: '',
      jobTitle: '',
      salary: 0,
      feedback: ''
    }));
    alert("Tracer data submitted successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'graduationYear' || name === 'salary' ? Number(value) : value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-slate-800">New Tracer Entry</h2>
          <p className="text-slate-600 mt-1 font-medium">Manually enter alumni data sourced from email or phone surveys.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Student ID</label>
              <input
                type="text"
                name="studentId"
                required
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                placeholder="2020001"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                required
                min="1990"
                max="2030"
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Employment Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Current Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                  >
                    {Object.values(EmploymentStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {formData.status !== EmploymentStatus.Unemployed && formData.status !== EmploymentStatus.FurtherStudy && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Monthly Salary (USD)</label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Relevance to Major</label>
                      <select
                        name="relevance"
                        value={formData.relevance}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                      >
                         {Object.values(JobRelevance).map(rel => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Curriculum Feedback</label>
                  <textarea
                    name="feedback"
                    rows={4}
                    value={formData.feedback}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                    placeholder="How did the university prepare you? What skills were missing?"
                  />
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-5 h-5" />
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;