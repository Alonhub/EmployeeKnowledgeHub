import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ModuleSectionProps = {
  title: string;
  children: ReactNode;
  isActive: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  previousSection?: () => void;
  nextSection?: () => void;
  nextSectionText?: string;
  externalLinks?: Array<{ url: string; text: string }>;
};

export default function ModuleSection({
  title,
  children,
  isActive,
  hasPrevious,
  hasNext,
  previousSection,
  nextSection,
  nextSectionText = "Next",
  externalLinks
}: ModuleSectionProps) {
  if (!isActive) return null;
  
  return (
    <Card className="border rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">{title}</h2>
      
      {children}
      
      <div className="border-t pt-3 md:pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 dark:border-gray-700">
        {externalLinks && externalLinks.length > 0 ? (
          <a
            href={externalLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center text-sm md:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            {externalLinks[0].text}
          </a>
        ) : (
          <div className="hidden sm:block"></div>
        )}
        
        <div className="flex space-x-2 w-full sm:w-auto justify-end">
          {hasPrevious && previousSection && (
            <Button 
              variant="outline" 
              onClick={previousSection}
              size="sm"
              className="text-xs md:text-sm"
            >
              Previous
            </Button>
          )}
          
          {hasNext && nextSection && (
            <Button 
              onClick={nextSection}
              size="sm"
              className="text-xs md:text-sm"
            >
              {nextSectionText}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
