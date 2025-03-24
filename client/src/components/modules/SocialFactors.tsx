import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleSection from "./ModuleSection";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function SocialFactors() {
  const [currentSection, setCurrentSection] = useState("introduction");
  const { updateModuleProgress } = useProgress();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const completeSection = async (section: string) => {
    // Update progress based on section
    let percentComplete = 0;
    
    switch (section) {
      case "introduction":
        percentComplete = 25;
        break;
      case "trust":
        percentComplete = 50;
        break;
      case "motivation":
        percentComplete = 75;
        break;
      case "communities":
        percentComplete = 100;
        break;
    }
    
    try {
      await updateModuleProgress(1, percentComplete, percentComplete === 100);
      
      toast({
        title: "Progress Updated",
        description: "Your progress has been saved successfully",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };
  
  const navigateToNextModule = () => {
    setLocation("/cultural-factors");
  };
  
  return (
    <div>
      <div className="mb-6">
        <Tabs 
          value={currentSection} 
          onValueChange={(value) => setCurrentSection(value)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="trust">Trust & Relationships</TabsTrigger>
            <TabsTrigger value="motivation">Motivation Factors</TabsTrigger>
            <TabsTrigger value="communities">Communities of Practice</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Introduction Section */}
      <ModuleSection
        title="Introduction to Social Factors in Knowledge Management"
        isActive={currentSection === "introduction"}
        hasPrevious={false}
        hasNext={true}
        nextSection={() => {
          setCurrentSection("trust");
          completeSection("introduction");
        }}
        nextSectionText="Next: Trust & Relationships"
        externalLinks={[
          {
            url: "https://www.researchgate.net/publication/220363013_Social_Capital_Knowledge_Sharing_and_Organizational_Performance",
            text: "View References"
          }
        ]}
      >
        <p className="mb-4">
          Social factors play a crucial role in shaping knowledge management behaviors within organizations. 
          These factors influence how individuals share, acquire, and apply knowledge in their daily work.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Key Social Factors:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Trust and relationships between employees</li>
            <li>Motivational factors for knowledge sharing</li>
            <li>Communities of practice and social networks</li>
            <li>Leadership and management support</li>
            <li>Recognition and reward systems</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Research Insights:</h3>
          <p className="mb-3">
            According to research by Davenport and Prusak (1998), social factors often determine the success or failure of knowledge 
            management initiatives more than technological factors.
          </p>
          <p>
            A study by Wang and Noe (2010) found that interpersonal trust, organizational culture, and management 
            support were among the most significant predictors of knowledge sharing behavior.
          </p>
        </div>
      </ModuleSection>
      
      {/* Trust Section */}
      <ModuleSection
        title="Trust and Relationships in Knowledge Management"
        isActive={currentSection === "trust"}
        hasPrevious={true}
        hasNext={true}
        previousSection={() => setCurrentSection("introduction")}
        nextSection={() => {
          setCurrentSection("motivation");
          completeSection("trust");
        }}
        nextSectionText="Next: Motivation Factors"
      >
        <div className="mb-4">
          <div className="w-full h-48 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-blue-500 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Team collaboration and trust are foundational for knowledge sharing
          </p>
        </div>
        <p className="mb-4">
          Trust is a fundamental enabler of knowledge sharing in organizations. When employees trust each other,
          they are more willing to share valuable knowledge and expertise.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Types of Trust in Knowledge Management:</h3>
          <ul className="space-y-3">
            <li className="flex">
              <span className="font-medium mr-2">1. Competence-based trust:</span>
              <span>Trust in colleagues' expertise and abilities</span>
            </li>
            <li className="flex">
              <span className="font-medium mr-2">2. Benevolence-based trust:</span>
              <span>Trust that others will act in your best interest</span>
            </li>
            <li className="flex">
              <span className="font-medium mr-2">3. Integrity-based trust:</span>
              <span>Trust in others' honesty and ethical principles</span>
            </li>
          </ul>
        </div>
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Research Highlight:</h3>
          <p>
            "In organizations where trust levels are high, knowledge sharing is 50% more effective than in low-trust environments."
            - Levin et al. (2004), Trust and Knowledge Sharing: A Critical Combination
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Building Trust for Knowledge Management:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Promote transparency in communication</li>
            <li>Create opportunities for informal social interaction</li>
            <li>Recognize and reward knowledge sharing behaviors</li>
            <li>Lead by example - managers should actively share knowledge</li>
            <li>Establish fair processes for knowledge contribution and recognition</li>
          </ul>
        </div>
      </ModuleSection>
      
      {/* Motivation Section */}
      <ModuleSection
        title="Motivation Factors for Knowledge Sharing"
        isActive={currentSection === "motivation"}
        hasPrevious={true}
        hasNext={true}
        previousSection={() => setCurrentSection("trust")}
        nextSection={() => {
          setCurrentSection("communities");
          completeSection("motivation");
        }}
        nextSectionText="Next: Communities of Practice"
      >
        <p className="mb-4">
          Understanding what motivates employees to share knowledge is crucial for developing effective 
          knowledge management practices. Motivation factors can be both intrinsic and extrinsic.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Intrinsic Motivators</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal satisfaction in helping others</li>
              <li>Interest in the subject matter</li>
              <li>Desire to enhance reputation and expertise</li>
              <li>Enjoyment in the process of teaching/sharing</li>
              <li>Commitment to organizational goals</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Extrinsic Motivators</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Recognition and awards</li>
              <li>Financial incentives and bonuses</li>
              <li>Career advancement opportunities</li>
              <li>Reciprocity expectation</li>
              <li>Management support and encouragement</li>
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Motivational Barriers to Knowledge Sharing:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Fear of losing competitive advantage ("knowledge is power")</li>
            <li>Lack of time and resources</li>
            <li>Uncertainty about the value of one's knowledge</li>
            <li>Fear of criticism or negative evaluation</li>
            <li>Organizational politics and lack of trust</li>
          </ul>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">Case Study: IBM's Knowledge Management Program</h3>
          <p className="mb-2">
            IBM implemented a comprehensive knowledge management system that balanced intrinsic and extrinsic motivators:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Recognition through "knowledge champions" program</li>
            <li>Integration of knowledge sharing into performance reviews</li>
            <li>Creating communities of practice around key topics</li>
            <li>Showcasing business impact of knowledge sharing</li>
          </ul>
          <p className="mt-2">
            The program resulted in a 30% increase in knowledge sharing activities and significant cost savings.
          </p>
        </div>
      </ModuleSection>
      
      {/* Communities Section */}
      <ModuleSection
        title="Communities of Practice in Knowledge Management"
        isActive={currentSection === "communities"}
        hasPrevious={true}
        hasNext={true}
        previousSection={() => setCurrentSection("motivation")}
        nextSection={() => {
          completeSection("communities");
          navigateToNextModule();
        }}
        nextSectionText="Next Module: Cultural Factors"
      >
        <p className="mb-4">
          Communities of Practice (CoPs) are groups of people who share a concern or passion for something 
          they do and learn how to do it better through regular interaction.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Key Elements of Communities of Practice:</h3>
          <ul className="space-y-3">
            <li className="flex">
              <span className="font-medium mr-2">1. Domain:</span>
              <span>The shared area of interest and competence that brings the community together</span>
            </li>
            <li className="flex">
              <span className="font-medium mr-2">2. Community:</span>
              <span>The relationships and interactions that enable learning and knowledge sharing</span>
            </li>
            <li className="flex">
              <span className="font-medium mr-2">3. Practice:</span>
              <span>The shared repertoire of resources, experiences, tools, and approaches</span>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Benefits of Communities of Practice:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Facilitate rapid problem-solving and innovation</li>
            <li>Reduce learning curves for new employees</li>
            <li>Prevent "reinventing the wheel" across the organization</li>
            <li>Create channels for disseminating best practices</li>
            <li>Develop professional skills and expertise</li>
            <li>Increase employee engagement and satisfaction</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Physical Communities</h3>
            <p className="mb-2">Traditional in-person communities:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Regular meetings and workshops</li>
              <li>Lunch and learn sessions</li>
              <li>Conferences and seminars</li>
              <li>Cross-functional project teams</li>
              <li>Mentoring relationships</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2">Virtual Communities</h3>
            <p className="mb-2">Digital and online communities:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Online forums and discussion groups</li>
              <li>Knowledge repositories and wikis</li>
              <li>Virtual collaboration platforms</li>
              <li>Webinars and virtual learning sessions</li>
              <li>Social media and enterprise social networks</li>
            </ul>
          </div>
        </div>
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Success Factors for Communities of Practice:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Leadership support and resource allocation</li>
            <li>Clear purpose and measurable objectives</li>
            <li>Active facilitation and coordination</li>
            <li>Balance between structure and flexibility</li>
            <li>Recognition of contributions</li>
            <li>Regular evaluation and adaptation</li>
          </ol>
        </div>
      </ModuleSection>
    </div>
  );
}
