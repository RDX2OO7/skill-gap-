import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { NovonexLogo } from '@/components/NovonexLogo';

export function Header() {
  const { demoMode, darkMode, toggleDemoMode, toggleDarkMode } = useApp();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <NovonexLogo className="w-8 h-8" />
            <span className="font-semibold text-lg">NOVONEX</span>
          </Link>

          {/* My Skills Link */}
          <Link
            to="/my-skills"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-medium text-primary"
          >
            <Sparkles className="w-4 h-4" />
            <span>My Skills</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={demoMode ? 'hero' : 'outline'}
            size="sm"
            onClick={toggleDemoMode}
            className="text-xs"
          >
            {demoMode ? 'Demo Active' : 'Demo Mode'}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {!isHome && location.pathname !== '/my-skills' && (
            <Button variant="default" size="sm" asChild>
              <Link to="/">Home</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
