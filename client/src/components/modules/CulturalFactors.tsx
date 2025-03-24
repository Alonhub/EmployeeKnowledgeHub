import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleSection from "./ModuleSection";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function CulturalFactors() {
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
      case "organizational":
        percentComplete = 50;
        break;
      case "national":
        percentComplete = 75;
        break;
      case "leadership":
        percentComplete = 100;
        break;
    }
    
    try {
      await updateModuleProgress(2, percentComplete, percentComplete === 100);
      
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
    setLocation("/evaluation");
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
            <TabsTrigger value="organizational">Organizational Culture</TabsTrigger>
            <TabsTrigger value="national">National Culture</TabsTrigger>
            <TabsTrigger value="leadership">Leadership & Culture</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Introduction Section */}
      <ModuleSection
        title="Introduction to Cultural Factors in Knowledge Management"
        isActive={currentSection === "introduction"}
        hasPrevious={false}
        hasNext={true}
        nextSection={() => {
          setCurrentSection("organizational");
          completeSection("introduction");
        }}
        nextSectionText="Next: Organizational Culture"
        externalLinks={[
          {
            url: "https://www.researchgate.net/publication/235317071_Organizational_culture_and_knowledge_management_A_case_study",
            text: "View References"
          }
        ]}
      >
        <div className="w-full h-48 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-purple-500 dark:text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="mb-4">
          Cultural factors significantly influence how knowledge is created, shared, and utilized within organizations.
          Culture shapes attitudes, behaviors, and practices related to knowledge management at multiple levels.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Key Cultural Dimensions in Knowledge Management:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Organizational culture (values, norms, and practices)</li>
            <li>National and regional cultural differences</li>
            <li>Professional and functional subcultures</li>
            <li>Leadership and management cultural influence</li>
            <li>Cultural approaches to information ownership</li>
          </ul>
        </div>
        <div className="p-4 bg-violet-50 dark:bg-violet-900/30 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">Impact of Culture on Knowledge Management:</h3>
          <p>
            Culture influences how people approach knowledge in several ways:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Determines what knowledge is considered valuable</li>
            <li>Shapes communication patterns and knowledge flows</li>
            <li>Influences willingness to share or hoard knowledge</li>
            <li>Affects how conflicts around knowledge are resolved</li>
            <li>Impacts adoption of knowledge management technologies</li>
          </ul>
        </div>
      </ModuleSection>
      
      {/* Organizational Culture Section */}
      <ModuleSection
        title="Organizational Culture and Knowledge Management"
        isActive={currentSection === "organizational"}
        hasPrevious={true}
        hasNext={true}
        previousSection={() => setCurrentSection("introduction")}
        nextSection={() => {
          setCurrentSection("national");
          completeSection("organizational");
        }}
        nextSectionText="Next: National Culture"
      >
        <p className="mb-4">
          Organizational culture represents the shared values, beliefs, and practices that shape behavior within an organization.
          It has a profound impact on knowledge management effectiveness.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Types of Organizational Cultures:</h3>
          <ul className="space-y-3">
            <li className="flex flex-col">
              <span className="font-medium">1. Clan Culture:</span>
              <span className="pl-4">
                Emphasizes collaboration, teamwork, and participation. This culture typically facilitates 
                knowledge sharing through strong social connections and mentoring relationships.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">2. Adhocracy Culture:</span>
              <span className="pl-4">
                Focused on innovation, creativity, and risk-taking. This culture promotes knowledge creation 
                and experimentation, often with less formal knowledge documentation.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">3. Hierarchy Culture:</span>
              <span className="pl-4">
                Emphasizes structure, procedures, and stability. Knowledge management in this culture tends to 
                be formalized, documented, and process-driven.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">4. Market Culture:</span>
              <span className="pl-4">
                Results-oriented, focused on competition and achievement. Knowledge sharing may be limited to what 
                contributes directly to performance metrics and competitive advantage.
              </span>
            </li>
          </ul>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">Cultural Elements that Support Knowledge Management:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Open communication and transparency</li>
            <li>Learning orientation and growth mindset</li>
            <li>Psychological safety and trust</li>
            <li>Collaboration over competition</li>
            <li>Recognition of knowledge sharing behaviors</li>
            <li>Leaders who model knowledge sharing</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Cultural Barriers to Knowledge Management:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Knowledge hoarding as a source of power</li>
            <li>"Not invented here" syndrome</li>
            <li>Blame culture and fear of mistakes</li>
            <li>Short-term focus over long-term learning</li>
            <li>Hierarchical information flows</li>
            <li>Overemphasis on explicit knowledge capture</li>
          </ul>
        </div>
      </ModuleSection>
      
      {/* National Culture Section */}
      <ModuleSection
        title="National Culture and Knowledge Management"
        isActive={currentSection === "national"}
        hasPrevious={true}
        hasNext={true}
        previousSection={() => setCurrentSection("organizational")}
        nextSection={() => {
          setCurrentSection("leadership");
          completeSection("national");
        }}
        nextSectionText="Next: Leadership & Culture"
      >
        <p className="mb-4">
          National cultural dimensions significantly influence knowledge management practices across global organizations.
          Understanding these differences is crucial for effective cross-cultural knowledge exchange.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Hofstede's Cultural Dimensions in Knowledge Management:</h3>
          <ul className="space-y-3">
            <li className="flex flex-col">
              <span className="font-medium">1. Power Distance:</span>
              <span className="pl-4">
                In high power distance cultures, knowledge often flows top-down, while low power distance cultures 
                have more horizontal knowledge sharing. Example: Hierarchical knowledge sharing in Japan vs. 
                collaborative approaches in Scandinavian countries.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">2. Individualism vs. Collectivism:</span>
              <span className="pl-4">
                Collectivist cultures often share knowledge within in-groups, while individualistic cultures 
                may require more explicit incentives for knowledge sharing. Example: Team-based knowledge sharing 
                in South Korea vs. expertise-recognition systems in the United States.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">3. Uncertainty Avoidance:</span>
              <span className="pl-4">
                High uncertainty avoidance cultures may prefer detailed, explicit knowledge documentation, 
                while low uncertainty avoidance cultures may be more comfortable with tacit knowledge transfer. 
                Example: Detailed documentation in Germany vs. contextual learning in the UK.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">4. Long-term vs. Short-term Orientation:</span>
              <span className="pl-4">
                Long-term oriented cultures may invest more heavily in knowledge infrastructure 
                and learning capabilities. Example: Long-term knowledge management investments in China 
                vs. more immediate application focus in the US.
              </span>
            </li>
          </ul>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">Case Study: Toyota's Global Knowledge Management</h3>
          <p className="mb-2">
            Toyota successfully adapted its knowledge management approach across different national cultures:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>In Japan: Relies heavily on tacit knowledge transfer through mentorship</li>
            <li>In the US: Implemented more codified approaches with explicit documentation</li>
            <li>In Europe: Balanced tacit and explicit approaches based on local preferences</li>
            <li>Globally: Created cross-cultural communities of practice around key technical domains</li>
          </ul>
          <p className="mt-2">
            This multicultural approach allowed Toyota to maintain consistent quality while respecting cultural differences.
          </p>
        </div>
      </ModuleSection>
      
      {/* Leadership Section */}
      <ModuleSection
        title="Leadership and Cultural Transformation"
        isActive={currentSection === "leadership"}
        hasPrevious={true}
        hasNext={true}
        previousSection={() => setCurrentSection("national")}
        nextSection={() => {
          completeSection("leadership");
          navigateToNextModule();
        }}
        nextSectionText="Next Module: Evaluation"
      >
        <p className="mb-4">
          Leaders play a critical role in shaping organizational culture and driving knowledge management initiatives.
          Effective leadership can transform cultural barriers into enablers for knowledge sharing.
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Leadership Styles and Knowledge Management:</h3>
          <ul className="space-y-3">
            <li className="flex flex-col">
              <span className="font-medium">1. Transformational Leadership:</span>
              <span className="pl-4">
                Inspires and motivates employees to share knowledge by connecting it to a meaningful vision. 
                Leaders model knowledge sharing behaviors and create a sense of purpose around collaborative learning.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">2. Servant Leadership:</span>
              <span className="pl-4">
                Emphasizes supporting employees' growth and development. These leaders create psychological safety 
                for knowledge sharing and remove barriers that prevent effective knowledge flow.
              </span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium">3. Adaptive Leadership:</span>
              <span className="pl-4">
                Focuses on helping organizations adapt to changing environments. These leaders encourage 
                experimentation, learning from failures, and continuous knowledge evolution.
              </span>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Leadership Practices for Knowledge-Friendly Culture:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Visibly practice and reward knowledge sharing</li>
            <li>Create psychological safety for sharing failures and lessons learned</li>
            <li>Align knowledge management with strategic objectives</li>
            <li>Allocate resources for knowledge infrastructure and activities</li>
            <li>Connect knowledge sharing to performance management</li>
            <li>Break down silos between departments and teams</li>
            <li>Tell stories that highlight the value of knowledge sharing</li>
          </ol>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">Cultural Transformation Framework:</h3>
          <p className="mb-2">
            Leaders can use this framework to transform organizational culture to support knowledge management:
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Assess current cultural enablers and barriers to knowledge flow</li>
            <li>Create a compelling vision for knowledge-based collaboration</li>
            <li>Align systems (rewards, metrics, tools) to support knowledge sharing</li>
            <li>Model desired behaviors starting with the leadership team</li>
            <li>Celebrate and publicize knowledge sharing success stories</li>
            <li>Remove structural and procedural barriers to knowledge flow</li>
            <li>Measure and adapt based on cultural feedback mechanisms</li>
          </ol>
        </div>
      </ModuleSection>
    </div>
  );
}
