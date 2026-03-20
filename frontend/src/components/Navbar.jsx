import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, Clock, FileText, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/home/capsules', label: 'Capsules', icon: LayoutGrid },
    { path: '/home/timeline', label: 'Timeline', icon: Clock },
    { path: '/home/summary', label: 'AI Summary', icon: FileText },
    { path: '/home/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    // Basic logout logic
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/home">MemoryVault</Link>
        </div>
        <div className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Exact match for Home, prefix match for others
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
