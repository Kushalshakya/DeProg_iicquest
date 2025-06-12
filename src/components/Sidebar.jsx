import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Video, 
  Calendar, 
  User, 
  X,
  Bell,
  Settings
} from 'lucide-react';
import supabase from '../supabaseClient';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Job Listings', href: '/JobListings', icon: Briefcase },
  { name: 'Video Conference', href: '/VideoConference', icon: Video },
  { name: 'Meetings', href: '/Meetings', icon: Calendar },
  { name: 'Profile', href: '/Profile', icon: User },
];

function Sidebar({ onClose }) {
  const location = useLocation();
  const [profile, setProfile] = useState({ fullname: '', email: '' });

  useEffect(() => {
    let isMounted = true;
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const email = session.user.email;
        const userId = session.user.id;
        const { data, error } = await supabase
          .from('profiles')
          .select('fullname')
          .eq('id', userId)
          .single();
        if (isMounted) {
          setProfile({
            fullname: data?.fullname || '',
            email: email || '',
          });
        }
      }
    }
    fetchProfile();

    // Optional: Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => {
      isMounted = false;
      if (listener && typeof listener.subscription?.unsubscribe === 'function') {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full border-r-2 border-b-2">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-gray-900">SkillYatra</h1>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              style={{borderColor: "transparent"}}
            >
              <item.icon className="flex-shrink-0 w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{profile.fullname || "User"}</p>
            <p className="text-xs text-gray-500 truncate">{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;