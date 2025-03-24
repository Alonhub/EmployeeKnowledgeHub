import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import CourseOverview from "@/components/dashboard/CourseOverview";
import ModuleProgress from "@/components/dashboard/ModuleProgress";
import ResourcesList from "@/components/dashboard/ResourcesList";
import { useProgress } from "@/hooks/useProgress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resourcesData, updatesData } from "@/lib/data";
import { Book, Award } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { moduleProgress, overallProgress, isLoading } = useProgress();
  const [, setLocation] = useLocation();
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Progress Overview Card */}
        <ProgressOverview progress={overallProgress} />
        
        {/* Current Learning Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
                <Book className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Current Learning</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Continue where you left off</p>
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={() => {
                // Direct to the appropriate module based on progress
                const nextModule = getNextModuleToComplete(moduleProgress);
                setLocation(nextModule);
              }}
            >
              Continue Learning
            </Button>
          </CardContent>
        </Card>
        
        {/* Certification Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
                <Award className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Certification</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Complete all modules to earn your certificate</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{overallProgress}% Complete</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {calculateCompletedModules(moduleProgress)}/3 Modules
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CourseOverview />
          <ModuleProgress moduleProgress={moduleProgress} />
        </div>

        <div>
          <ResourcesList />

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
              <div className="space-y-4">
                {updatesData.map((update, index) => (
                  <div 
                    key={index} 
                    className={`pb-3 ${
                      index < updatesData.length - 1 ? "border-b dark:border-gray-700" : ""
                    }`}
                  >
                    <p className="font-medium">{update.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{update.timeAgo}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

// Helper function to determine the next module to complete
function getNextModuleToComplete(moduleProgress: Map<number, number>): string {
  // If social factors is not started or not completed
  if (!moduleProgress.has(1) || moduleProgress.get(1)! < 100) {
    return "/social-factors";
  }
  
  // If cultural factors is not started or not completed
  if (!moduleProgress.has(2) || moduleProgress.get(2)! < 100) {
    return "/cultural-factors";
  }
  
  // If evaluation is not started or not completed
  if (!moduleProgress.has(3) || moduleProgress.get(3)! < 100) {
    return "/evaluation";
  }
  
  // If all modules are complete, suggest feedback
  return "/feedback";
}

// Helper function to calculate completed modules
function calculateCompletedModules(moduleProgress: Map<number, number>): number {
  let completed = 0;
  
  // Check each module (1, 2, 3)
  [1, 2, 3].forEach(moduleId => {
    if (moduleProgress.has(moduleId) && moduleProgress.get(moduleId) === 100) {
      completed++;
    }
  });
  
  return completed;
}
