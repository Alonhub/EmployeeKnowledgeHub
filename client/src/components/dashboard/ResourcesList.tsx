import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileDown, Link as LinkIcon, FileCode } from "lucide-react";

export default function ResourcesList() {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Resources</h3>
        <ul className="space-y-3">
          <li>
            <a 
              href="https://www.knowledge-management-tools.net/knowledge-management-definition.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <FileDown className="mr-2 h-4 w-4" />
              <span>Knowledge Management Fundamentals</span>
            </a>
          </li>
          <li>
            <a 
              href="https://www.ifla.org/wp-content/uploads/2019/05/assets/km/publications/km-concepts-and-benefits.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Social Factors Reference Guide</span>
            </a>
          </li>
          <li>
            <a 
              href="https://www.researchgate.net/publication/264557302_Knowledge_Management_Processes_and_Organizational_Learning_and_Unlearning" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>External Research Repository</span>
            </a>
          </li>
          <li>
            <a 
              href="https://www.emerald.com/insight/content/doi/10.1108/13673270810859479/full/html"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <FileCode className="mr-2 h-4 w-4" />
              <span>Cultural Impact Case Studies</span>
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
