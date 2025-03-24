import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
};

const evaluationQuestions: Question[] = [
  {
    id: 1,
    text: "Which of the following is a key social factor in knowledge management?",
    options: [
      { id: "a", text: "Trust and relationships between employees" },
      { id: "b", text: "Technology infrastructure" },
      { id: "c", text: "Physical office layout" },
      { id: "d", text: "Annual budget allocation" }
    ],
    correctAnswer: "a"
  },
  {
    id: 2,
    text: "What type of organizational culture is most conducive to knowledge sharing?",
    options: [
      { id: "a", text: "Highly hierarchical culture" },
      { id: "b", text: "Individualistic achievement culture" },
      { id: "c", text: "Collaborative and open culture" },
      { id: "d", text: "Risk-averse culture" }
    ],
    correctAnswer: "c"
  },
  {
    id: 3,
    text: "Which of the following is a primary function of Communities of Practice?",
    options: [
      { id: "a", text: "To enforce management directives" },
      { id: "b", text: "To facilitate knowledge sharing among practitioners" },
      { id: "c", text: "To reduce the need for formal training" },
      { id: "d", text: "To replace traditional management structures" }
    ],
    correctAnswer: "b"
  },
  {
    id: 4,
    text: "In Hofstede's cultural dimensions, which dimension most directly affects hierarchical knowledge flows?",
    options: [
      { id: "a", text: "Masculinity/Femininity" },
      { id: "b", text: "Uncertainty Avoidance" },
      { id: "c", text: "Indulgence/Restraint" },
      { id: "d", text: "Power Distance" }
    ],
    correctAnswer: "d"
  },
  {
    id: 5,
    text: "Which leadership approach is most effective for cultivating a knowledge-sharing culture?",
    options: [
      { id: "a", text: "Transformational leadership" },
      { id: "b", text: "Autocratic leadership" },
      { id: "c", text: "Laissez-faire leadership" },
      { id: "d", text: "Transactional leadership" }
    ],
    correctAnswer: "a"
  }
];

export default function Evaluation() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { updateModuleProgress } = useProgress();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const totalQuestions = evaluationQuestions.length;
  
  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };
  
  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const submitQuiz = async () => {
    // Calculate score
    let correctAnswers = 0;
    evaluationQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers;
    setScore(finalScore);
    setSubmitted(true);
    
    try {
      // Save evaluation results
      await apiRequest("POST", "/api/evaluation", {
        score: finalScore,
        totalQuestions,
        completed: true
      });
      
      // Update module progress
      await updateModuleProgress(3, 100, true);
      
      toast({
        title: "Evaluation Completed",
        description: `You scored ${finalScore} out of ${totalQuestions}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save evaluation results",
        variant: "destructive",
      });
    }
  };
  
  const findAreasToFocus = () => {
    return evaluationQuestions
      .filter(q => answers[q.id] !== q.correctAnswer)
      .map(q => {
        switch (q.id) {
          case 1: return "Understanding social factors in knowledge management";
          case 2: return "Organizational culture's impact on knowledge sharing";
          case 3: return "Communities of practice implementation";
          case 4: return "Cultural dimensions in global organizations";
          case 5: return "Leadership's role in knowledge management";
          default: return "";
        }
      })
      .filter(Boolean);
  };
  
  const currentQuestionData = evaluationQuestions.find(q => q.id === currentQuestion);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Knowledge Management Evaluation</h2>
          {!submitted && (
            <div className="flex items-center">
              <span className="mr-2">{`Question ${currentQuestion} of ${totalQuestions}`}</span>
              <Progress value={(currentQuestion / totalQuestions) * 100} className="w-24 h-2.5" />
            </div>
          )}
        </div>
        
        {!submitted ? (
          <>
            {currentQuestionData && (
              <div>
                <h3 className="text-lg font-medium mb-3">{currentQuestionData.text}</h3>
                <RadioGroup 
                  value={answers[currentQuestion] || ""} 
                  onValueChange={handleAnswer}
                  className="space-y-2"
                >
                  {currentQuestionData.options.map(option => (
                    <div 
                      key={option.id}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer ${
                        answers[currentQuestion] === option.id 
                          ? "border-primary bg-primary/5" 
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={`option-${option.id}`} className="mr-2" />
                      <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={prevQuestion} 
                disabled={currentQuestion === 1}
              >
                Previous
              </Button>
              <div>
                {currentQuestion < totalQuestions ? (
                  <Button onClick={nextQuestion}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={submitQuiz} 
                    className="bg-green-500 hover:bg-green-600"
                    disabled={Object.keys(answers).length < totalQuestions}
                  >
                    Submit Evaluation
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <span className="text-3xl font-bold text-primary">{`${score}/${totalQuestions}`}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {score >= 4 ? "Excellent Work!" : score >= 3 ? "Good Job!" : "Keep Learning!"}
              </h3>
              <p className="mb-4">
                {score >= 4 
                  ? "You have a strong understanding of knowledge management concepts."
                  : score >= 3 
                  ? "You have a good grasp of the key concepts, but there's room for improvement."
                  : "You might want to review the course materials again to strengthen your understanding."}
              </p>
            </div>
            
            <div className="p-4 border rounded-lg mb-6 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
              <h4 className="font-medium mb-2">Areas to Focus On:</h4>
              <ul className="list-disc list-inside space-y-1">
                {findAreasToFocus().length > 0 ? (
                  findAreasToFocus().map((area, index) => (
                    <li key={index}>{area}</li>
                  ))
                ) : (
                  <li>Great work! You've mastered all the key concepts.</li>
                )}
              </ul>
            </div>
            
            <div className="flex justify-center">
              <Button onClick={() => setLocation("/feedback")}>
                Continue to Feedback
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
