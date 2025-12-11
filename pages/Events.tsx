import React from 'react';
import { AlumniEvent } from '../types';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

interface EventsProps {
  events: AlumniEvent[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Events & Reunions</h2>
        <p className="text-slate-500">Upcoming gatherings and webinars.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {events.map((event) => (
            <div key={event.id} className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:bg-slate-50 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-xl flex flex-col items-center justify-center text-indigo-700">
                <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wide">
                     {event.type}
                   </span>
                   {new Date(event.date) < new Date() && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-600 uppercase tracking-wide">Past</span>
                   )}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.attendees} Registered
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                Manage Event <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;