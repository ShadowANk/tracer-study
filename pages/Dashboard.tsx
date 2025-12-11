import React, { useState } from 'react';
import { Alumni, EmploymentStatus, JobRelevance, AIAnalysisResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import StatsCard from '../components/StatsCard';
import { Users, Briefcase, TrendingUp, DollarSign, Sparkles, Brain } from 'lucide-react';
import { analyzeTracerData } from '../services/geminiService';

interface DashboardProps {
  data: Alumni[];
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // --- Statistics Calculations ---
  const totalAlumni = data.length;
  const employedCount = data.filter(d => d.status === EmploymentStatus.Employed || d.status === EmploymentStatus.SelfEmployed).length;
  const employmentRate = totalAlumni > 0 ? Math.round((employedCount / totalAlumni) * 100) : 0;
  
  const avgSalary = data.reduce((acc, curr) => acc + (curr.salary || 0), 0) / (data.filter(d => d.salary).length || 1);

  // --- Chart Data Preparation ---
  const statusCounts = data.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));

  const relevanceCounts = data.reduce((acc, curr) => {
    const key = curr.relevance || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(relevanceCounts).map(key => ({
    name: key,
    count: relevanceCounts[key]
  }));

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    const result = await analyzeTracerData(data);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Overview Dashboard</h2>
          <p className="text-sm md:text-base text-slate-600 font-medium">Real-time insights from alumni tracer data.</p>
        </div>
        <button
          onClick={handleAiAnalysis}
          disabled={loadingAi || data.length === 0}
          className="w-full md:w-auto flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 md:py-2.5 rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 font-medium"
        >
          {loadingAi ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loadingAi ? 'Analyzing Data...' : 'Generate AI Report'}
        </button>
      </div>

      {/* Stats Grid - Optimized for Mobile (2 cols) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatsCard 
          title="Total Alumni" 
          value={totalAlumni} 
          icon={<Users className="w-5 h-5 md:w-6 md:h-6" />} 
          trend="+12% YOY"
        />
        <StatsCard 
          title="Employed" 
          value={`${employmentRate}%`} 
          icon={<Briefcase className="w-5 h-5 md:w-6 md:h-6" />} 
          trend="High Rate"
        />
        <StatsCard 
          title="Avg. Salary" 
          value={`$${Math.round(avgSalary).toLocaleString()}`} 
          icon={<DollarSign className="w-5 h-5 md:w-6 md:h-6" />} 
        />
        <StatsCard 
          title="Response" 
          value="84%" 
          icon={<TrendingUp className="w-5 h-5 md:w-6 md:h-6" />} 
        />
      </div>

      {/* AI Report Section */}
      {aiAnalysis && (
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-gradient-to-r from-indigo-50 to-white p-6 border-b border-indigo-100">
             <div className="flex items-center gap-2 mb-2">
                <Brain className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-indigo-900">Gemini AI Executive Report</h3>
             </div>
             <p className="text-slate-700 text-sm md:text-base leading-relaxed">{aiAnalysis.summary}</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Recommendations
                </h4>
                <ul className="space-y-3">
                    {aiAnalysis.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border-l-4 border-green-500 shadow-sm">
                            {rec}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                 <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Market Insights
                </h4>
                <div className="mb-6 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-xs font-bold text-amber-800 uppercase mb-1">Critical Gaps</p>
                    <p className="text-sm text-slate-800">{aiAnalysis.curriculumGaps}</p>
                </div>
                <div>
                     <p className="text-xs font-bold text-slate-500 uppercase mb-2">Trending Skills</p>
                     <div className="flex flex-wrap gap-2">
                        {aiAnalysis.trendingSkills.map((skill, i) => (
                            <span key={i} className="px-3 py-1.5 bg-indigo-100 text-indigo-800 text-xs rounded-full font-bold border border-indigo-200">
                                {skill}
                            </span>
                        ))}
                     </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-4">Employment Status</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{color: '#1e293b', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{paddingTop: '20px'}} formatter={(value) => <span className="text-slate-600">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-4">Job Relevance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{top: 0, right: 0, left: -20, bottom: 0}}>
                <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} interval={0} height={50} angle={-15} textAnchor="end" />
                <YAxis tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{color: '#1e293b', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;