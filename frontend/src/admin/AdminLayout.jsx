import { useEffect } from 'react';
import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileCode2, Star, LogOut } from 'lucide-react';
import { initLenis, destroyLenis } from '../utils/lenis';

export default function AdminLayout() {
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    // Disable smooth scroll in Admin panel to prevent nested scroll lag
    destroyLenis();
    
    return () => {
      // Re-enable smooth scroll when leaving the Admin panel
      initLenis();
    };
  }, []);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      isActive 
        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 font-medium" 
        : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
    }`;

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col p-4">
        <div className="mb-8 px-4 py-2">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavLink to="/admin" end className={navItemClass}>
            <LayoutDashboard size={20} /> Profile
          </NavLink>
          <NavLink to="/admin/projects" className={navItemClass}>
            <FileCode2 size={20} /> Projects
          </NavLink>
          <NavLink to="/admin/skills" className={navItemClass}>
            <Star size={20} /> Skills
          </NavLink>
          <NavLink to="/admin/experience" className={navItemClass}>
            <Briefcase size={20} /> Experience
          </NavLink>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
