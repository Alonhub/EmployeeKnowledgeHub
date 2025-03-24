import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { 
  HomeIcon, 
  Users, 
  Globe, 
  ClipboardCheck, 
  MessageSquare,
  Sun,
  Moon,
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { moduleProgress, overallProgress } = useProgress();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };
  
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const userInitials = user && user.fullName 
    ? getInitials(user.fullName) 
    : user?.username.substring(0, 2).toUpperCase();

  return (
    <>
      {/* Mobile toggle button (removed since it's handled by Header) */}
    
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 transform border-r border-gray-200 dark:border-gray-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 bg-white dark:bg-gray-800`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-semibold">KnowledgeFlow</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8" onClick={toggleSidebar}>
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}
        </div>
        
        {/* User profile */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
              <AvatarFallback className="text-xs sm:text-sm">{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm sm:text-base truncate max-w-[130px] sm:max-w-[180px]">{user?.fullName || user?.username}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate max-w-[130px] sm:max-w-[180px]">{user?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Progress */}
        <div className="px-3 sm:px-4 pt-2 sm:pt-4">
          <div className="flex flex-col mb-3 sm:mb-4">
            <div className="flex justify-between items-center mb-1 sm:mb-2">
              <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Overall Progress</span>
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2 sm:h-2.5" />
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="px-2 pt-1 sm:pt-2 pb-2 sm:pb-4 space-y-1">
          <div 
            className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md w-full text-left cursor-pointer ${
              location === "/" 
                ? "bg-gray-100 dark:bg-gray-700 text-primary dark:text-white" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => {
              navigate("/");
              closeSidebarOnMobile();
            }}
          >
            <HomeIcon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Dashboard</span>
          </div>
          
          <div 
            className={`flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-md w-full text-left cursor-pointer ${
              location === "/social-factors" 
                ? "bg-gray-100 dark:bg-gray-700 text-primary dark:text-white" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => {
              navigate("/social-factors");
              closeSidebarOnMobile();
            }}
          >
            <div className="flex items-center">
              <Users className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Social Factors</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs">{moduleProgress?.get(1) || 0}%</span>
              {moduleProgress?.get(1) === 100 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          <div 
            className={`flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-md w-full text-left cursor-pointer ${
              location === "/cultural-factors" 
                ? "bg-gray-100 dark:bg-gray-700 text-primary dark:text-white" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => {
              navigate("/cultural-factors");
              closeSidebarOnMobile();
            }}
          >
            <div className="flex items-center">
              <Globe className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Cultural Factors</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs">{moduleProgress?.get(2) || 0}%</span>
              {moduleProgress?.get(2) === 100 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          <div 
            className={`flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-md w-full text-left cursor-pointer ${
              location === "/evaluation" 
                ? "bg-gray-100 dark:bg-gray-700 text-primary dark:text-white" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => {
              navigate("/evaluation");
              closeSidebarOnMobile();
            }}
          >
            <div className="flex items-center">
              <ClipboardCheck className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Evaluation</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs">{moduleProgress?.get(3) || 0}%</span>
              {moduleProgress?.get(3) === 100 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          <div
            className={`flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md w-full text-left cursor-pointer ${
              location === "/feedback" 
                ? "bg-gray-100 dark:bg-gray-700 text-primary dark:text-white" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => {
              navigate("/feedback");
              closeSidebarOnMobile();
            }}
          >
            <MessageSquare className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Feedback</span>
          </div>
        </nav>
        
        {/* Footer */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-600 text-xs sm:text-sm py-1 h-7 sm:h-8" 
              onClick={logout}
            >
              <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
