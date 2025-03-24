import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import SocialFactors from "@/pages/social-factors";
import CulturalFactors from "@/pages/cultural-factors";
import Evaluation from "@/pages/evaluation";
import Feedback from "@/pages/feedback";
import CoursesPage from "@/pages/courses";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { Suspense, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CoursesPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/social-factors" component={SocialFactors} />
      <Route path="/cultural-factors" component={CulturalFactors} />
      <Route path="/evaluation" component={Evaluation} />
      <Route path="/feedback" component={Feedback} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isAuthenticated, setUser } = useAuth();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/current", {
          credentials: "include",
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    
    checkAuth();
  }, [setUser]);

  return (
    <>
      {!isAuthenticated ? (
        <AuthModal />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarProvider>
            <Router />
          </SidebarProvider>
        </Suspense>
      )}
      <Toaster />
    </>
  );
}

export default App;
