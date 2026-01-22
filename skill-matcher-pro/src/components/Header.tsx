import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Sparkles, LogOut, User as UserIcon } from 'lucide-react';
import { NovonexLogo } from '@/components/NovonexLogo';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function Header() {
  const { demoMode, darkMode, toggleDemoMode, toggleDarkMode, user } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/' || location.pathname === '/landing';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={user ? "/landing" : "/"} className="flex items-center gap-2">
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

          {user && location.pathname !== '/landing' && (
            <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/10">
              <Link to="/landing">Home</Link>
            </Button>
          )}

          {!isHome && location.pathname !== '/my-skills' && (
            <Button variant="default" size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                    <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
