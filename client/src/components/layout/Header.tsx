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
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-20 px-4 py-3 flex items-center justify-between shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="mr-3 lg:hidden" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
