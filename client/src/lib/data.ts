/**
 * Data structures for content used throughout the knowledge management platform
 */

// Social Factors module content
export const socialFactorsContent = {
  introduction: {
    title: "Introduction to Social Factors in Knowledge Management",
    content: `
      <p>Social factors play a crucial role in shaping knowledge management behaviors within organizations. 
      These factors influence how individuals share, acquire, and apply knowledge in their daily work.</p>
      
      <h3>Key Social Factors:</h3>
      <ul>
        <li>Trust and relationships between employees</li>
        <li>Motivational factors for knowledge sharing</li>
        <li>Communities of practice and social networks</li>
        <li>Leadership and management support</li>
        <li>Recognition and reward systems</li>
      </ul>
      
      <h3>Research Insights:</h3>
      <p>According to research by Davenport and Prusak (1998), social factors often determine the success or failure of knowledge 
      management initiatives more than technological factors.</p>
      
      <p>A study by Wang and Noe (2010) found that interpersonal trust, organizational culture, and management 
      support were among the most significant predictors of knowledge sharing behavior.</p>
    `,
    references: [
      { 
        text: "View References", 
        url: "https://www.researchgate.net/publication/220363013_Social_Capital_Knowledge_Sharing_and_Organizational_Performance"
      }
    ]
  },
  trust: {
    title: "Trust and Relationships in Knowledge Management",
    content: `
      <p>Trust is a fundamental enabler of knowledge sharing in organizations. When employees trust each other,
      they are more willing to share valuable knowledge and expertise.</p>
      
      <h3>Types of Trust in Knowledge Management:</h3>
      <ul class="list-none">
        <li><span class="font-medium">1. Competence-based trust:</span> Trust in colleagues' expertise and abilities</li>
        <li><span class="font-medium">2. Benevolence-based trust:</span> Trust that others will act in your best interest</li>
        <li><span class="font-medium">3. Integrity-based trust:</span> Trust in others' honesty and ethical principles</li>
      </ul>
      
      <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-4">
        <h3>Research Highlight:</h3>
        <p>"In organizations where trust levels are high, knowledge sharing is 50% more effective than in low-trust environments."
        - Levin et al. (2004), Trust and Knowledge Sharing: A Critical Combination</p>
      </div>
      
      <h3>Building Trust for Knowledge Management:</h3>
      <ul>
        <li>Promote transparency in communication</li>
        <li>Create opportunities for informal social interaction</li>
        <li>Recognize and reward knowledge sharing behaviors</li>
        <li>Lead by example - managers should actively share knowledge</li>
        <li>Establish fair processes for knowledge contribution and recognition</li>
      </ul>
    `
  },
  motivation: {
    title: "Motivation Factors for Knowledge Sharing",
    content: `
      <p>Understanding what motivates employees to share knowledge is crucial for developing effective 
      knowledge management practices. Motivation factors can be both intrinsic and extrinsic.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <div class="border rounded-lg p-4 dark:border-gray-700">
          <h3>Intrinsic Motivators</h3>
          <ul>
            <li>Personal satisfaction in helping others</li>
            <li>Interest in the subject matter</li>
            <li>Desire to enhance reputation and expertise</li>
            <li>Enjoyment in the process of teaching/sharing</li>
            <li>Commitment to organizational goals</li>
          </ul>
        </div>
        <div class="border rounded-lg p-4 dark:border-gray-700">
          <h3>Extrinsic Motivators</h3>
          <ul>
            <li>Recognition and awards</li>
            <li>Financial incentives and bonuses</li>
            <li>Career advancement opportunities</li>
            <li>Reciprocity expectation</li>
            <li>Management support and encouragement</li>
          </ul>
        </div>
      </div>
      
      <h3>Motivational Barriers to Knowledge Sharing:</h3>
      <ul>
        <li>Fear of losing competitive advantage ("knowledge is power")</li>
        <li>Lack of time and resources</li>
        <li>Uncertainty about the value of one's knowledge</li>
        <li>Fear of criticism or negative evaluation</li>
        <li>Organizational politics and lack of trust</li>
      </ul>
      
      <div class="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg my-4">
        <h3>Case Study: IBM's Knowledge Management Program</h3>
        <p>IBM implemented a comprehensive knowledge management system that balanced intrinsic and extrinsic motivators:</p>
        <ul>
          <li>Recognition through "knowledge champions" program</li>
          <li>Integration of knowledge sharing into performance reviews</li>
          <li>Creating communities of practice around key topics</li>
          <li>Showcasing business impact of knowledge sharing</li>
        </ul>
        <p class="mt-2">The program resulted in a 30% increase in knowledge sharing activities and significant cost savings.</p>
      </div>
    `
  },
  communities: {
    title: "Communities of Practice in Knowledge Management",
    content: `
      <p>Communities of Practice (CoPs) are groups of people who share a concern or passion for something 
      they do and learn how to do it better through regular interaction.</p>
      
      <h3>Key Elements of Communities of Practice:</h3>
      <ul class="list-none">
        <li><span class="font-medium">1. Domain:</span> The shared area of interest and competence that brings the community together</li>
        <li><span class="font-medium">2. Community:</span> The relationships and interactions that enable learning and knowledge sharing</li>
        <li><span class="font-medium">3. Practice:</span> The shared repertoire of resources, experiences, tools, and approaches</li>
      </ul>
      
      <h3>Benefits of Communities of Practice:</h3>
      <ul>
        <li>Facilitate rapid problem-solving and innovation</li>
        <li>Reduce learning curves for new employees</li>
        <li>Prevent "reinventing the wheel" across the organization</li>
        <li>Create channels for disseminating best practices</li>
        <li>Develop professional skills and expertise</li>
        <li>Increase employee engagement and satisfaction</li>
      </ul>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <div class="border rounded-lg p-4 dark:border-gray-700">
          <h3>Physical Communities</h3>
          <p>Traditional in-person communities:</p>
          <ul>
            <li>Regular meetings and workshops</li>
            <li>Lunch and learn sessions</li>
            <li>Conferences and seminars</li>
            <li>Cross-functional project teams</li>
            <li>Mentoring relationships</li>
          </ul>
        </div>
        <div class="border rounded-lg p-4 dark:border-gray-700">
          <h3>Virtual Communities</h3>
          <p>Digital and online communities:</p>
          <ul>
            <li>Online forums and discussion groups</li>
            <li>Knowledge repositories and wikis</li>
            <li>Virtual collaboration platforms</li>
            <li>Webinars and virtual learning sessions</li>
            <li>Social media and enterprise social networks</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg my-4">
        <h3>Success Factors for Communities of Practice:</h3>
        <ol>
          <li>Leadership support and resource allocation</li>
          <li>Clear purpose and measurable objectives</li>
          <li>Active facilitation and coordination</li>
          <li>Balance between structure and flexibility</li>
          <li>Recognition of contributions</li>
          <li>Regular evaluation and adaptation</li>
        </ol>
      </div>
    `
  }
};

// Cultural Factors module content
export const culturalFactorsContent = {
  introduction: {
    title: "Introduction to Cultural Factors in Knowledge Management",
    content: `
      <p>Cultural factors significantly influence how knowledge is created, shared, and utilized within organizations.
      Culture shapes attitudes, behaviors, and practices related to knowledge management at multiple levels.</p>
      
      <h3>Key Cultural Dimensions in Knowledge Management:</h3>
      <ul>
        <li>Organizational culture (values, norms, and practices)</li>
        <li>National and regional cultural differences</li>
        <li>Professional and functional subcultures</li>
        <li>Leadership and management cultural influence</li>
        <li>Cultural approaches to information ownership</li>
      </ul>
      
      <div class="bg-violet-50 dark:bg-violet-900/30 p-4 rounded-lg my-4">
        <h3>Impact of Culture on Knowledge Management:</h3>
        <p>Culture influences how people approach knowledge in several ways:</p>
        <ul>
          <li>Determines what knowledge is considered valuable</li>
          <li>Shapes communication patterns and knowledge flows</li>
          <li>Influences willingness to share or hoard knowledge</li>
          <li>Affects how conflicts around knowledge are resolved</li>
          <li>Impacts adoption of knowledge management technologies</li>
        </ul>
      </div>
    `,
    references: [
      { 
        text: "View References", 
        url: "https://www.researchgate.net/publication/235317071_Organizational_culture_and_knowledge_management_A_case_study"
      }
    ]
  },
  organizational: {
    title: "Organizational Culture and Knowledge Management",
    content: `
      <p>Organizational culture represents the shared values, beliefs, and practices that shape behavior within an organization.
      It has a profound impact on knowledge management effectiveness.</p>
      
      <h3>Types of Organizational Cultures:</h3>
      <ul class="list-none space-y-3">
        <li>
          <span class="font-medium">1. Clan Culture:</span>
          <p class="pl-4">Emphasizes collaboration, teamwork, and participation. This culture typically facilitates 
          knowledge sharing through strong social connections and mentoring relationships.</p>
        </li>
        <li>
          <span class="font-medium">2. Adhocracy Culture:</span>
          <p class="pl-4">Focused on innovation, creativity, and risk-taking. This culture promotes knowledge creation 
          and experimentation, often with less formal knowledge documentation.</p>
        </li>
        <li>
          <span class="font-medium">3. Hierarchy Culture:</span>
          <p class="pl-4">Emphasizes structure, procedures, and stability. Knowledge management in this culture tends to 
          be formalized, documented, and process-driven.</p>
        </li>
        <li>
          <span class="font-medium">4. Market Culture:</span>
          <p class="pl-4">Results-oriented, focused on competition and achievement. Knowledge sharing may be limited to what 
          contributes directly to performance metrics and competitive advantage.</p>
        </li>
      </ul>
      
      <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-4">
        <h3>Cultural Elements that Support Knowledge Management:</h3>
        <ul>
          <li>Open communication and transparency</li>
          <li>Learning orientation and growth mindset</li>
          <li>Psychological safety and trust</li>
          <li>Collaboration over competition</li>
          <li>Recognition of knowledge sharing behaviors</li>
          <li>Leaders who model knowledge sharing</li>
        </ul>
      </div>
      
      <h3>Cultural Barriers to Knowledge Management:</h3>
      <ul>
        <li>Knowledge hoarding as a source of power</li>
        <li>"Not invented here" syndrome</li>
        <li>Blame culture and fear of mistakes</li>
        <li>Short-term focus over long-term learning</li>
        <li>Hierarchical information flows</li>
        <li>Overemphasis on explicit knowledge capture</li>
      </ul>
    `
  },
  national: {
    title: "National Culture and Knowledge Management",
    content: `
      <p>National cultural dimensions significantly influence knowledge management practices across global organizations.
      Understanding these differences is crucial for effective cross-cultural knowledge exchange.</p>
      
      <h3>Hofstede's Cultural Dimensions in Knowledge Management:</h3>
      <ul class="list-none space-y-3">
        <li>
          <span class="font-medium">1. Power Distance:</span>
          <p class="pl-4">In high power distance cultures, knowledge often flows top-down, while low power distance cultures 
          have more horizontal knowledge sharing. Example: Hierarchical knowledge sharing in Japan vs. 
          collaborative approaches in Scandinavian countries.</p>
        </li>
        <li>
          <span class="font-medium">2. Individualism vs. Collectivism:</span>
          <p class="pl-4">Collectivist cultures often share knowledge within in-groups, while individualistic cultures 
          may require more explicit incentives for knowledge sharing. Example: Team-based knowledge sharing 
          in South Korea vs. expertise-recognition systems in the United States.</p>
        </li>
        <li>
          <span class="font-medium">3. Uncertainty Avoidance:</span>
          <p class="pl-4">High uncertainty avoidance cultures may prefer detailed, explicit knowledge documentation, 
          while low uncertainty avoidance cultures may be more comfortable with tacit knowledge transfer. 
          Example: Detailed documentation in Germany vs. contextual learning in the UK.</p>
        </li>
        <li>
          <span class="font-medium">4. Long-term vs. Short-term Orientation:</span>
          <p class="pl-4">Long-term oriented cultures may invest more heavily in knowledge infrastructure 
          and learning capabilities. Example: Long-term knowledge management investments in China 
          vs. more immediate application focus in the US.</p>
        </li>
      </ul>
      
      <div class="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg my-4">
        <h3>Case Study: Toyota's Global Knowledge Management</h3>
        <p>Toyota successfully adapted its knowledge management approach across different national cultures:</p>
        <ul>
          <li>In Japan: Relies heavily on tacit knowledge transfer through mentorship</li>
          <li>In the US: Implemented more codified approaches with explicit documentation</li>
          <li>In Europe: Balanced tacit and explicit approaches based on local preferences</li>
          <li>Globally: Created cross-cultural communities of practice around key technical domains</li>
        </ul>
        <p class="mt-2">This multicultural approach allowed Toyota to maintain consistent quality while respecting cultural differences.</p>
      </div>
    `
  },
  leadership: {
    title: "Leadership and Cultural Transformation",
    content: `
      <p>Leaders play a critical role in shaping organizational culture and driving knowledge management initiatives.
      Effective leadership can transform cultural barriers into enablers for knowledge sharing.</p>
      
      <h3>Leadership Styles and Knowledge Management:</h3>
      <ul class="list-none space-y-3">
        <li>
          <span class="font-medium">1. Transformational Leadership:</span>
          <p class="pl-4">Inspires and motivates employees to share knowledge by connecting it to a meaningful vision. 
          Leaders model knowledge sharing behaviors and create a sense of purpose around collaborative learning.</p>
        </li>
        <li>
          <span class="font-medium">2. Servant Leadership:</span>
          <p class="pl-4">Emphasizes supporting employees' growth and development. These leaders create psychological safety 
          for knowledge sharing and remove barriers that prevent effective knowledge flow.</p>
        </li>
        <li>
          <span class="font-medium">3. Adaptive Leadership:</span>
          <p class="pl-4">Focuses on helping organizations adapt to changing environments. These leaders encourage 
          experimentation, learning from failures, and continuous knowledge evolution.</p>
        </li>
      </ul>
      
      <h3>Leadership Practices for Knowledge-Friendly Culture:</h3>
      <ol>
        <li>Visibly practice and reward knowledge sharing</li>
        <li>Create psychological safety for sharing failures and lessons learned</li>
        <li>Align knowledge management with strategic objectives</li>
        <li>Allocate resources for knowledge infrastructure and activities</li>
        <li>Connect knowledge sharing to performance management</li>
        <li>Break down silos between departments and teams</li>
        <li>Tell stories that highlight the value of knowledge sharing</li>
      </ol>
      
      <div class="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg my-4">
        <h3>Cultural Transformation Framework:</h3>
        <p>Leaders can use this framework to transform organizational culture to support knowledge management:</p>
        <ol>
          <li>Assess current cultural enablers and barriers to knowledge flow</li>
          <li>Create a compelling vision for knowledge-based collaboration</li>
          <li>Align systems (rewards, metrics, tools) to support knowledge sharing</li>
          <li>Model desired behaviors starting with the leadership team</li>
          <li>Celebrate and publicize knowledge sharing success stories</li>
          <li>Remove structural and procedural barriers to knowledge flow</li>
          <li>Measure and adapt based on cultural feedback mechanisms</li>
        </ol>
      </div>
    `
  }
};

// Evaluation questions
export const evaluationQuestions = [
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

// Resources data
export const resourcesData = [
  {
    title: "Knowledge Management Fundamentals",
    icon: "FileDown",
    url: "https://www.knowledge-management-tools.net/knowledge-management-definition.html"
  },
  {
    title: "Social Factors Reference Guide",
    icon: "FileText",
    url: "https://www.ifla.org/wp-content/uploads/2019/05/assets/km/publications/km-concepts-and-benefits.pdf"
  },
  {
    title: "External Research Repository",
    icon: "Link",
    url: "https://www.researchgate.net/publication/264557302_Knowledge_Management_Processes_and_Organizational_Learning_and_Unlearning"
  },
  {
    title: "Cultural Impact Case Studies",
    icon: "FileCode",
    url: "https://www.emerald.com/insight/content/doi/10.1108/13673270810859479/full/html"
  }
];

// Dashboard updates
export const updatesData = [
  {
    title: "New cultural factors content added",
    timeAgo: "2 days ago"
  },
  {
    title: "Evaluation module updated",
    timeAgo: "5 days ago"
  },
  {
    title: "New research references added",
    timeAgo: "1 week ago"
  }
];
