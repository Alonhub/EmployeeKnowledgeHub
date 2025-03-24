import { Card, CardContent } from "@/components/ui/card";

export default function CourseOverview() {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Course Overview</h3>
        <p className="mb-4">
          Welcome to the Knowledge Management Learning Platform! This course explores the 
          social and cultural factors that influence knowledge management behaviors in organizations.
        </p>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Key Topics:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Social factors influencing knowledge sharing</li>
            <li>Cultural dimensions of knowledge management</li>
            <li>Practical strategies for implementing knowledge management</li>
            <li>Measuring and evaluating knowledge management effectiveness</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Course Structure:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Social Factors in Knowledge Management</li>
            <li>Cultural Factors in Knowledge Management</li>
            <li>Final Evaluation</li>
            <li>Feedback and Certification</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
