import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

type ProgressOverviewProps = {
  progress: number;
};

export default function ProgressOverview({ progress }: ProgressOverviewProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Progress Overview</h3>
          <span className="text-3xl font-bold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3 mb-3" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Keep going! Complete all modules to finish the course.
        </p>
      </CardContent>
    </Card>
  );
}
