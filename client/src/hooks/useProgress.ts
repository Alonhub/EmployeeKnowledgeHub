import { useState, useEffect, useCallback } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Progress } from "@shared/schema";

export function useProgress() {
  const { isAuthenticated } = useAuth();
  const [moduleProgress, setModuleProgress] = useState<Map<number, number>>(new Map());
  const [overallProgress, setOverallProgress] = useState(0);
  
  // Fetch progress data
  const { data: progressData, isLoading } = useQuery({
    queryKey: ["/api/progress"],
    enabled: isAuthenticated,
  });
  
  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async (data: { moduleId: number; percentComplete: number; completed?: boolean }) => {
      const response = await apiRequest("POST", "/api/progress", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    }
  });
  
  // Calculate module progress and overall progress
  useEffect(() => {
    if (progressData) {
      const newModuleProgress = new Map<number, number>();
      let completedModules = 0;
      const totalModules = 3; // Social factors, Cultural factors, Evaluation
      
      progressData.forEach((progress: Progress) => {
        newModuleProgress.set(progress.moduleId, progress.percentComplete);
        if (progress.completed) {
          completedModules++;
        }
      });
      
      setModuleProgress(newModuleProgress);
      setOverallProgress(Math.round((completedModules / totalModules) * 100));
    }
  }, [progressData]);
  
  // Update module progress
  const updateModuleProgress = useCallback(
    async (moduleId: number, percentComplete: number, completed: boolean = false) => {
      await updateProgressMutation.mutateAsync({
        moduleId,
        percentComplete,
        completed
      });
      
      // Update local state for immediate UI feedback
      setModuleProgress(prev => {
        const newMap = new Map(prev);
        newMap.set(moduleId, percentComplete);
        return newMap;
      });
      
      // If module is completed, update overall progress
      if (completed) {
        let completedCount = 0;
        moduleProgress.forEach((progress, id) => {
          if (id !== moduleId && progress === 100) {
            completedCount++;
          }
        });
        completedCount++; // Add the current completed module
        
        const newOverallProgress = Math.round((completedCount / 3) * 100);
        setOverallProgress(newOverallProgress);
      }
    },
    [moduleProgress, updateProgressMutation]
  );
  
  return {
    moduleProgress,
    overallProgress,
    isLoading,
    updateModuleProgress
  };
}
