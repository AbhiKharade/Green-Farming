import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { GlobalSearch } from './GlobalSearch';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.crops'), path: '/crops' },
    { name: t('nav.diseaseGuide'), path: '/disease-guide' },
    { name: t('nav.fertilizerGuide'), path: '/fertilizer-guide' },
    { name: t('nav.schemes'), path: '/schemes' },
    { name: t('nav.tips'), path: '/tips' }
  ];

  return (
    <nav className="bg-primary text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">🌱</span> Green Farming
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link, i) => (
                <Link key={i} to={link.path} className="hover:bg-primary-hover px-3 py-2 rounded-md text-sm font-medium touch-target flex items-center">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <GlobalSearch />
            <button onClick={() => setLang(lang === 'en' ? 'mr' : 'en')} className="p-2 hover:bg-primary-hover rounded-full touch-target" aria-label="Toggle language">
              <Languages className="w-5 h-5" /> <span className="ml-1 text-xs font-bold uppercase">{lang}</span>
            </button>
            <button onClick={toggleTheme} className="p-2 hover:bg-primary-hover rounded-full touch-target" aria-label="Toggle theme">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-primary-hover touch-target" aria-label="Open menu">
               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 text-text-color pb-4 shadow-xl">
          <div className="px-4 pt-4 pb-2">
             <GlobalSearch />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
             <button onClick={() => setLang(lang === 'en' ? 'mr' : 'en')} className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 touch-target">
              <Languages className="w-5 h-5 mr-2" /> 
              {lang === 'en' ? 'मराठी' : 'English'}
            </button>
            <button onClick={toggleTheme} className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 touch-target">
              {theme === 'light' ? <><Moon className="w-5 h-5 mr-2" /> Dark Mode</> : <><Sun className="w-5 h-5 mr-2" /> Light Mode</>}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
