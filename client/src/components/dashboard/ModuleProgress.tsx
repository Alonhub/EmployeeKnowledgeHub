import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, ClipboardCheck } from "lucide-react";

type ModuleProgressProps = {
  moduleProgress: Map<number, number>;
};

export default function ModuleProgress({ moduleProgress }: ModuleProgressProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Module Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-3">
              <Users className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Social Factors</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{moduleProgress.get(1) || 0}%</span>
              </div>
              <Progress value={moduleProgress.get(1) || 0} className="h-2" />
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3">
              <Globe className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Cultural Factors</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{moduleProgress.get(2) || 0}%</span>
              </div>
              <Progress value={moduleProgress.get(2) || 0} className="h-2" indicatorColor="bg-purple-500" />
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
              <ClipboardCheck className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Evaluation</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{moduleProgress.get(3) || 0}%</span>
              </div>
              <Progress value={moduleProgress.get(3) || 0} className="h-2" indicatorColor="bg-green-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
