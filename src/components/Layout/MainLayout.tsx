import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Mail, Image, Settings, Printer, Inbox, Grid, PenTool as Tool, Instagram, Facebook, Database, Palette, Calculator, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGymDetails } from '../../hooks/useSupabase';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { path: '/emails/approval-hub', icon: Inbox, label: 'Email Approval Hub' },
  { path: '/media', icon: Image, label: 'Media' },
  { path: '/media/gallery', icon: Grid, label: 'Gallery View' },
  { path: '/print-tasks', icon: Printer, label: 'Print Tasks' }
];

export function MainLayout() {
  const { isAdmin } = useAuth();
  const { gyms, loading } = useGymDetails();
  const [selectedGym, setSelectedGym] = useState('');
  const [currentGym, setCurrentGym] = useState<any>(null);

  useEffect(() => {
    if (selectedGym && gyms) {
      setCurrentGym(gyms.find(gym => gym.gym_name === selectedGym));
    }
  }, [selectedGym, gyms]);

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <div className="flex flex-col w-full">
        <div className="bg-[#cec4c1] p-4 flex flex-col items-center">
          <nav className="flex gap-6 justify-center">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-[#b48f8f] shadow-md transform scale-102'
                      : 'bg-white/90 text-[#8f93a0] hover:bg-white hover:text-[#b48f8f]'
                  }`
                }
              >
                <Icon size={16} />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-72 bg-[#b48f8f] p-4">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Tool size={20} />
              <h2 className="text-lg font-medium">Toolkit</h2>
            </div>
            <select 
              value={selectedGym}
              onChange={(e) => setSelectedGym(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border mb-6 bg-white/90 hover:bg-white transition-colors" 
              style={{ borderColor: "#cec4c1" }}
            >
              <option value="">Select a gym</option>
              {gyms?.map(gym => (
                <option key={gym.id} value={gym.gym_name}>{gym.gym_name}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href={currentGym?.instagram_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`bg-white/90 hover:bg-white p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all ${!currentGym?.instagram_url ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="sparkle"></div>
                  <Instagram size={24} className="text-[#8b8585]" />
                </div>
                <span className="text-sm text-[#8b8585]">Instagram</span>
              </a>
              <a 
                href={currentGym?.facebook_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`bg-white/90 hover:bg-white p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all ${!currentGym?.facebook_url ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="sparkle"></div>
                  <Facebook size={24} className="text-[#8b8585]" />
                </div>
                <span className="text-sm text-[#8b8585]">Facebook</span>
              </a>
              <a 
                href={currentGym?.sharepoint_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`bg-white/90 hover:bg-white p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all ${!currentGym?.sharepoint_url ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="sparkle"></div>
                  <Database size={24} className="text-[#8b8585]" />
                </div>
                <span className="text-sm text-[#8b8585]">Sharepoint</span>
              </a>
              <a href="#" className="bg-white/90 hover:bg-white p-4 rounded-lg flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all">
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="sparkle"></div>
                  <Palette size={24} className="text-[#8b8585]" />
                </div>
                <span className="text-sm text-[#8b8585]">Canva</span>
              </a>
              <div className="bg-white/90 hover:bg-white p-4 rounded-lg flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="sparkle"></div>
                  <Calculator size={24} className="text-[#8b8585]" />
                </div>
                <span className="text-sm text-[#8b8585]">Tuition Estimator</span>
                <span className="text-xs text-[#8f93a0]">COMING SOON</span>
              </div>
              <div className="bg-white/90 hover:bg-white p-4 rounded-lg flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="sparkle"></div>
                  <Tool size={24} className="text-[#8b8585]" />
                </div>
                <span className="text-sm text-[#8b8585]">Submit your tool idea</span>
                <span className="text-xs text-[#8f93a0]">COMING SOON</span>
              </div>
            </div>
            {loading && (
              <div className="text-center mt-4 text-white/80">
                Loading gym details...
              </div>
            )}
            {isAdmin() && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `mt-auto fixed bottom-4 left-4 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-[#b48f8f] shadow-md'
                      : 'bg-white/90 text-[#8f93a0] hover:bg-white hover:text-[#b48f8f]'
                  }`
                }
              >
                <Settings size={16} />
                <span className="font-medium">Admin</span>
                <ChevronRight size={16} />
              </NavLink>
            )}
          </div>
          <main className="flex-1 p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}