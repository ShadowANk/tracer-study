import React, { useState } from 'react';
import { Alumni, EmploymentStatus } from '../types';
import { Search, Download, Trash2, Building2, Calendar, DollarSign, BookOpen } from 'lucide-react';

interface AlumniListProps {
  data: Alumni[];
  onDelete: (id: string) => void;
}

const AlumniList: React.FC<AlumniListProps> = ({ data, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentId.includes(searchTerm)
  );

  const downloadCSV = () => {
    const headers = ['ID,Name,Grad Year,Status,Company,Title,Salary,Relevance,Feedback'];
    const rows = filteredData.map(d => 
      `${d.studentId},"${d.fullName}",${d.graduationYear},${d.status},"${d.companyName || ''}","${d.jobTitle || ''}",${d.salary || 0},${d.relevance},"${d.feedback || ''}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "alumni_tracer_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block border ${
        status === EmploymentStatus.Employed ? 'bg-green-100 text-green-800 border-green-200' :
        status === EmploymentStatus.Unemployed ? 'bg-red-100 text-red-800 border-red-200' :
        status === EmploymentStatus.Seeking ? 'bg-amber-100 text-amber-800 border-amber-200' :
        'bg-blue-100 text-blue-800 border-blue-200'
    }`}>
        {status}
    </span>
  );

  return (
    <div className="space-y-4">
        {/* Header Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-xl font-bold text-slate-800">Alumni Database</h2>
                <p className="text-xs text-slate-600 font-medium">Manage and track alumni entries.</p>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
                    <input
                    type="text"
                    placeholder="Search name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 w-full text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <button 
                    onClick={downloadCSV}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition-colors active:scale-95"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">CSV</span>
                </button>
            </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-3">
            {filteredData.length === 0 ? (
                <div className="text-center py-8 text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
                    No alumni found.
                </div>
            ) : (
                filteredData.map((alumni) => (
                    <div key={alumni.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-900">{alumni.fullName}</h3>
                                <p className="text-xs text-slate-600 font-mono font-medium">ID: {alumni.studentId}</p>
                            </div>
                            <StatusBadge status={alumni.status} />
                        </div>
                        
                        <div className="space-y-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                <span className="font-medium">Class of {alumni.graduationYear}</span>
                            </div>
                            {alumni.companyName && (
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                                    <span className="font-bold text-slate-900">{alumni.jobTitle}</span>
                                    <span className="text-slate-500">at</span>
                                    <span className="font-medium">{alumni.companyName}</span>
                                </div>
                            )}
                             {alumni.salary && (
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                                    <span className="font-medium text-green-700">${alumni.salary.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-2 border-t border-slate-100">
                             <button 
                                onClick={() => onDelete(alumni.id)}
                                className="flex items-center gap-1 text-xs font-bold text-red-600 px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove Entry
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 font-bold">Student</th>
                    <th className="px-6 py-3 font-bold">Status</th>
                    <th className="px-6 py-3 font-bold">Job Title / Company</th>
                    <th className="px-6 py-3 font-bold">Grad Year</th>
                    <th className="px-6 py-3 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm font-medium">
                                No alumni found matching your criteria.
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((alumni) => (
                        <tr key={alumni.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{alumni.fullName}</div>
                            <div className="text-xs text-slate-600 font-mono">{alumni.studentId}</div>
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={alumni.status} />
                            </td>
                            <td className="px-6 py-4">
                            {alumni.status === EmploymentStatus.Unemployed ? (
                                <span className="text-slate-400">-</span>
                            ) : (
                                <>
                                <div className="text-sm font-medium text-slate-900">{alumni.jobTitle}</div>
                                <div className="text-xs text-slate-600">{alumni.companyName}</div>
                                </>
                            )}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                            {alumni.graduationYear}
                            </td>
                            <td className="px-6 py-4 text-right">
                            <button 
                                onClick={() => onDelete(alumni.id)}
                                className="text-slate-400 hover:text-red-600 transition-colors p-1"
                                title="Delete record"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
                </table>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-600 font-medium">
                Showing {filteredData.length} records
            </div>
        </div>
    </div>
  );
};

export default AlumniList;