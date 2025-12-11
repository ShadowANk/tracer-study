import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SurveyForm from './pages/SurveyForm';
import AlumniList from './pages/AlumniList';
import CareerCenter from './pages/CareerCenter';
import Events from './pages/Events';
import Login from './pages/Login';
import { Alumni, EmploymentStatus, JobRelevance, JobPosting, AlumniEvent } from './types';
import { Menu } from 'lucide-react';

// Dummy data for initial load
const DUMMY_ALUMNI: Alumni[] = [
  {
    id: '1',
    fullName: 'Alice Johnson',
    studentId: '2019001',
    graduationYear: 2023,
    email: 'alice@test.com',
    status: EmploymentStatus.Employed,
    companyName: 'TechSolutions Inc.',
    jobTitle: 'Frontend Developer',
    salary: 4500,
    relevance: JobRelevance.VeryRelated,
    feedback: 'The React courses were very helpful, but we needed more backend exposure.',
    submissionDate: new Date().toISOString()
  },
  {
    id: '2',
    fullName: 'Bob Smith',
    studentId: '2019002',
    graduationYear: 2023,
    email: 'bob@test.com',
    status: EmploymentStatus.Seeking,
    submissionDate: new Date().toISOString()
  },
  {
    id: '3',
    fullName: 'Charlie Davis',
    studentId: '2018045',
    graduationYear: 2022,
    email: 'charlie@test.com',
    status: EmploymentStatus.Employed,
    companyName: 'DataCorp',
    jobTitle: 'Data Analyst',
    salary: 5200,
    relevance: JobRelevance.Related,
    feedback: 'Statistics module was crucial for my current role.',
    submissionDate: new Date().toISOString()
  },
  {
    id: '4',
    fullName: 'Dana Lee',
    studentId: '2020112',
    graduationYear: 2024,
    email: 'dana@test.com',
    status: EmploymentStatus.FurtherStudy,
    feedback: 'Pursuing Masters in AI.',
    submissionDate: new Date().toISOString()
  },
  {
    id: '5',
    fullName: 'Ethan Hunt',
    studentId: '2019099',
    graduationYear: 2023,
    email: 'ethan@test.com',
    status: EmploymentStatus.SelfEmployed,
    companyName: 'Hunt Designs',
    jobTitle: 'Freelance Designer',
    salary: 3000,
    relevance: JobRelevance.SomewhatRelated,
    feedback: 'I wish there was more focus on entrepreneurship.',
    submissionDate: new Date().toISOString()
  }
];

const DUMMY_JOBS: JobPosting[] = [
  {
    id: '1',
    title: 'Junior Software Engineer',
    company: 'Innovate Tech',
    location: 'Jakarta, ID',
    type: 'Full-time',
    postedDate: '2023-10-15',
    description: 'Looking for fresh graduates with React skills.'
  },
  {
    id: '2',
    title: 'Digital Marketing Specialist',
    company: 'Creative Agency',
    location: 'Remote',
    type: 'Remote',
    postedDate: '2023-10-18',
    description: 'Manage social media campaigns for top brands.'
  }
];

const DUMMY_EVENTS: AlumniEvent[] = [
  {
    id: '1',
    title: 'Annual Grand Reunion 2024',
    date: '2024-12-15T18:00:00',
    location: 'University Grand Hall',
    type: 'Reunion',
    attendees: 150
  },
  {
    id: '2',
    title: 'Career Talk: Navigating Tech Industry',
    date: '2023-11-20T14:00:00',
    location: 'Zoom Webinar',
    type: 'Webinar',
    attendees: 45
  }
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [events, setEvents] = useState<AlumniEvent[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check auth and load data
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsAuthenticated(true);

    const savedAlumni = localStorage.getItem('alumniData');
    const savedJobs = localStorage.getItem('jobsData');
    const savedEvents = localStorage.getItem('eventsData');

    setAlumniData(savedAlumni ? JSON.parse(savedAlumni) : DUMMY_ALUMNI);
    setJobs(savedJobs ? JSON.parse(savedJobs) : DUMMY_JOBS);
    setEvents(savedEvents ? JSON.parse(savedEvents) : DUMMY_EVENTS);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('alumniData', JSON.stringify(alumniData));
  }, [alumniData]);

  useEffect(() => {
    localStorage.setItem('jobsData', JSON.stringify(jobs));
  }, [jobs]);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const handleAddAlumni = (data: Omit<Alumni, 'id' | 'submissionDate'>) => {
    const newAlumni: Alumni = {
      ...data,
      id: crypto.randomUUID(),
      submissionDate: new Date().toISOString()
    };
    setAlumniData(prev => [newAlumni, ...prev]);
    setCurrentView('list');
  };

  const handleDeleteAlumni = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setAlumniData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddJob = (job: JobPosting) => {
    setJobs(prev => [job, ...prev]);
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Delete this job posting?')) {
      setJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard data={alumniData} />;
      case 'list':
        return <AlumniList data={alumniData} onDelete={handleDeleteAlumni} />;
      case 'survey':
        return <SurveyForm onSubmit={handleAddAlumni} />;
      case 'jobs':
        return <CareerCenter jobs={jobs} onAddJob={handleAddJob} onDeleteJob={handleDeleteJob} />;
      case 'events':
        return <Events events={events} />;
      default:
        return <Dashboard data={alumniData} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 md:hidden bg-slate-900 shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <Sidebar 
            currentView={currentView} 
            setCurrentView={(view) => { setCurrentView(view); setIsSidebarOpen(false); }} 
            isMobile={true}
            onClose={() => setIsSidebarOpen(false)}
            onLogout={handleLogout}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed h-full z-10">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 w-full">
        {/* Mobile Sticky Header */}
        <div className="md:hidden bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-lg active:scale-95 transition-transform">
                <Menu className="w-6 h-6" />
             </button>
             <h1 className="text-lg font-bold text-slate-800 capitalize">{currentView === 'list' ? 'Alumni Data' : currentView}</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-200">
             ADM
          </div>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-20 md:pb-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;