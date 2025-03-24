import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Search, HelpCircle } from "lucide-react";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  const [location] = useLocation();
  const [title, setTitle] = useState("Dashboard");
  
  useEffect(() => {
    switch (location) {
      case "/":
        setTitle("Dashboard");
        break;
      case "/social-factors":
        setTitle("Social Factors in Knowledge Management");
        break;
      case "/cultural-factors":
        setTitle("Cultural Factors in Knowledge Management");
        break;
      case "/evaluation":
        setTitle("Knowledge Management Evaluation");
        break;
      case "/feedback":
        setTitle("Provide Feedback");
        break;
      default:
        setTitle("KnowledgeFlow");
    }
  }, [location]);
  
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-20 px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm"
          className="mr-2 sm:mr-3 lg:hidden h-8 w-8" 
          onClick={toggleSidebar}
        >
          <Menu className="h-4 sm:h-5 w-4 sm:w-5" />
        </Button>
        <h1 className="text-base sm:text-lg md:text-xl font-semibold truncate max-w-[200px] sm:max-w-[300px] md:max-w-none">{title}</h1>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-3">
        <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 hidden sm:flex">
          <Search className="h-4 sm:h-5 w-4 sm:w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9">
          <Bell className="h-4 sm:h-5 w-4 sm:w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9">
          <HelpCircle className="h-4 sm:h-5 w-4 sm:w-5" />
        </Button>
      </div>
    </header>
  );
}
