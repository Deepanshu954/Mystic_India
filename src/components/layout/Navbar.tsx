import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../theme/ThemeToggle';
import useMobile from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';

type BaseNavItem = {
  name: string;
  path: string;
};

type NavItemWithIcon = BaseNavItem & {
  icon: React.FC<{ className?: string }>;
};

type NavItem = BaseNavItem | NavItemWithIcon;

const hasIcon = (item: NavItem): item is NavItemWithIcon => {
  return 'icon' in item;
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getNavItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      { name: 'States', path: '/states' },
      { name: 'Cuisine', path: '/cuisine' },
      { name: 'Culture', path: '/culture' },
    ];
    
    if (isAuthenticated) {
      return [...baseItems, { name: 'Profile', path: '/profile', icon: User }];
    } else {
      return [...baseItems, { name: 'Login', path: '/login' }];
    }
  };

  const navItems = getNavItems();

  return (
    <header
      className={`fixed top-4 left-0 right-0 flex justify-center items-center z-40 transition-all duration-700 ease-out rounded-full shadow-lg backdrop-blur-md border border-white/30 dark:border-white/30 ${
        isScrolled || !isHome
          ? 'py-2.5 bg-white/60 dark:bg-black/60 md:w-[50%] mx-auto'
          : 'py-4 bg-transparent md:w-[90%] mx-auto'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="z-10">
          <Logo className="h-10 w-auto" />
        </Link>

        {!isMobile && (
          <div className="flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`nav-item transition-colors duration-500 ease-in-out ${
                    location.pathname === item.path ? 'text-spice-500 font-semibold' : 'hover:text-spice-400'
                  } ${hasIcon(item) ? 'flex items-center' : ''}`}
                >
                  {hasIcon(item) && <item.icon className="mr-1 h-4 w-4" />}
                  {item.name}
                </Link>
              </div>
            ))}

            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        )}

        {isMobile && (
          <div className="flex items-center">
            <ThemeToggle />
            <button
              className="ml-2 p-2 text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </nav>

      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-6 py-8 flex flex-col items-center">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`py-3 text-lg font-medium hover:text-spice-500 transition-colors flex items-center ${
                    location.pathname === item.path ? 'text-spice-500' : 'text-foreground'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {hasIcon(item) && <item.icon className="mr-2 h-5 w-5" />}
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
