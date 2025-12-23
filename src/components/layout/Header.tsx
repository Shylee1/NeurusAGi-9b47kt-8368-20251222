import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../lib/authService';
import { toast } from 'sonner';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, isAdmin } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/news', label: 'News' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/investors', label: 'Investors' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="https://cdn-ai.onspace.ai/onspace/files/9ShpkhYni95AhHPoX9TQEr/IMG_3600.jpeg" 
              alt="NeurusAGi Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl sm:text-2xl font-bold gradient-text">
              NeurusAGi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive(link.to)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="btn-secondary text-sm"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="btn-ghost text-sm flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{profile?.username || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-strong border-t border-primary/20">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium transition-colors duration-300 ${
                  isActive(link.to)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-primary/20 space-y-3">
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block btn-secondary text-center text-sm"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-ghost text-center text-sm"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-ghost text-center text-sm text-destructive"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-ghost text-center text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-primary text-center text-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
