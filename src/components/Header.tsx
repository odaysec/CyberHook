import React from 'react';
import { Shield, Zap, Github, Globe, Book, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'docs') => void;
  currentPage?: 'home' | 'docs';
  theme?: Theme;
  onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  currentPage = 'home',
  theme = 'dark',
  onThemeToggle
}) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              <Zap className="w-4 h-4 text-cyan-500 dark:text-cyan-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                CyberHook
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Discord Webhook Manager</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation */}
            {onNavigate && (
              <nav className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => onNavigate('home')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'home'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-600/20 dark:text-purple-300'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => onNavigate('docs')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'docs'
                      ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-600/20 dark:text-cyan-300'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <Book className="w-4 h-4" />
                  <span>Docs</span>
                </button>
              </nav>
            )}
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <span>Secure • Fast • Reliable</span>
            </div>
            
            {/* Theme Toggle */}
            {onThemeToggle && (
              <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            )}
            
            <a
              href="https://github.com/odaysec/CyberHook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};