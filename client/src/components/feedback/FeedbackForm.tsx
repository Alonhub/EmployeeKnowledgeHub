import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

const improvementOptions = [
  { id: "content", label: "Course Content" },
  { id: "examples", label: "Real-world Examples" },
  { id: "interface", label: "User Interface" },
  { id: "assessment", label: "Assessment Questions" },
  { id: "resources", label: "Additional Resources" },
  { id: "other", label: "Other" }
];

export default function FeedbackForm() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [improvements, setImprovements] = useState<string[]>([]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const handleImprovementChange = (id: string, checked: boolean) => {
    if (checked) {
      setImprovements(prev => [...prev, id]);
    } else {
      setImprovements(prev => prev.filter(item => item !== id));
    }
  };
  
  const submitFeedback = async () => {
    try {
      await apiRequest("POST", "/api/feedback", {
        rating,
        improvements,
        feedbackText
      });
      
      setFeedbackSubmitted(true);
      
      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-6">Your Feedback Matters</h2>
        
        {!feedbackSubmitted ? (
          <>
            <p className="mb-6">
              Your insights help us improve this course for future learners. Please take a moment to share your experience.
            </p>
            
            <div className="mb-6">
              <Label className="block mb-2 font-medium">How would you rate your overall experience?</Label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= rating ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <Label className="block mb-2 font-medium">What aspects of the course would you like to see improved?</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {improvementOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`flex items-center space-x-2 p-3 border rounded-lg ${
                      improvements.includes(option.id)
                        ? "border-primary bg-primary/5"
                        : ""
                    }`}
                  >
                    <Checkbox 
                      id={`improvement-${option.id}`}
                      checked={improvements.includes(option.id)}
                      onCheckedChange={(checked) => 
                        handleImprovementChange(option.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`improvement-${option.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <Label className="block mb-2 font-medium" htmlFor="feedback">
                Please share any additional feedback or suggestions:
              </Label>
              <Textarea 
                id="feedback"
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Your thoughts on how we can improve the course..."
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={submitFeedback}
                disabled={rating === 0}
              >
                Submit Feedback
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank You For Your Feedback!</h3>
            <p className="mb-6">
              Your insights will help us improve this learning experience for future participants.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => setLocation("/")}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
