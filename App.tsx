import React, { useState } from 'react';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { ResumeData, SectionType } from './types';
import { Printer, Eye, PenLine, FileDown, Download } from 'lucide-react';
import { Button } from './components/Button';

const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  },
  theme: {
    primaryColor: '#111827',
    template: 'classic'
  },
  summary: '',
  experience: [],
  education: [],
  skills: '',
  projects: [],
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects']
};

// Satya Jagan's Resume Data
const DEMO_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Satya Jagan',
    email: 'jagankr99@gmail.com',
    phone: '+852 69546582',
    location: 'Hong Kong',
    linkedin: '',
    website: ''
  },
  theme: {
    primaryColor: '#111827', // Default Dark Gray
    template: 'timeline' // Defaulting to timeline to show the new feature
  },
  summary: 'Results-driven IT professional with over 17+ years of experience in customer success leadership, customer-facing consulting, solution delivery, business analysis, product ownership, and program management. Proven expertise in building and maintaining foundational relationships with key customer stakeholders and technical professionals to drive quality solution delivery, adoption, and account health. Skilled in aligning customer objectives with technology portfolios, developing Customer Success Plans (CSPs), driving consumption and adoption milestones, and mitigating retention risks in large-scale banking and digital transformation environments.',
  experience: [
    {
      id: '1',
      role: 'Senior Technical Manager',
      company: 'The Hong Kong Jockey Club, Hong Kong',
      startDate: 'Nov 2022',
      endDate: 'Present',
      current: true,
      description: '• Built and maintained foundational relationships with key customer stakeholders and technical teams to understand business/technical needs, assess solution feasibility, and deliver tailored cloud and AI-powered solutions.\n• Initiated customer conversations to align organizational objectives with Microsoft and AWS technology portfolios, ensuring ongoing customer success through program planning and prioritization.\n• Drove adoption and consumption milestones by implementing monitoring, logging, and CI/CD pipelines on AWS (EKS, EC2, S3) and Azure (AKS), resulting in improved usage and reduced churn risk.\n• Led development of an NLP-powered chatbot providing real-time betting advice and account support, significantly enhancing user engagement and customer satisfaction.'
    },
    {
      id: '2',
      role: 'Lead Scrum Master',
      company: 'The Hong Kong Jockey Club, Hong Kong',
      startDate: 'Oct 2019',
      endDate: 'Oct 2022',
      current: false,
      description: '• Supported delivery of program planning, customer-facing reviews, and prioritization of engagements with technical stakeholders to achieve agreed customer outcomes.\n• Facilitated cross-functional communication between developers, product teams, and stakeholders using JIRA, Confluence, and Aha! to track Program Increments and deliver on customer priorities.\n• Coached and mentored Scrum Masters, driving consistent ways of working and continuous improvement of Agile processes.\n• Managed full project lifecycle including budgeting, forecasting, risk/issue management, and stakeholder reporting.'
    },
    {
      id: '3',
      role: 'HSBC Global Standards Deployment Manager',
      company: 'Capco, Hong Kong',
      startDate: 'Jan 2018',
      endDate: 'Apr 2019',
      current: false,
      description: '• Led the strategic planning and deployment of HSBC’s Global Standards Programme for RBWM, assessing regulatory changes, recommending cost-effective solutions, and implementing enhanced Customer Due Diligence (CDD) and integrated financial crime risk controls.\n• Designed and established a consistent, scalable Financial Crime Compliance operating model and organization structure, incorporating Group policies, Enterprise-Wide Risk Assessments, and account remediation activities.\n• Functioned as virtual team lead across diverse geographies and time zones; chaired deployment meetings with regional leads, provided functional support to Global Service Delivery, drove decisions and actions, and escalated risks effectively.'
    },
    {
      id: '4',
      role: 'Senior Project Manager / Senior Consultant',
      company: 'Capco, Hong Kong',
      startDate: 'Jan 2017',
      endDate: 'Jan 2018',
      current: false,
      description: '• Delivered customer-facing consulting engagements, aligning account team priorities with Customer Success Plans and developing bookable programs of work.\n• Partnered with account leaders to support solution delivery, practice management, and customer strategy execution.'
    },
    {
      id: '5',
      role: 'Senior Business Analyst / Product Owner',
      company: 'DBS Bank (via Optimum Solutions), Singapore',
      startDate: 'Aug 2014',
      endDate: 'Jan 2017',
      current: false,
      description: '• Engaged directly with clients and senior stakeholders to gather detailed business and technical requirements, ensuring comprehensive understanding and alignment.\n• Proposed and customized banking solutions, conducted feasibility analysis, and delivered BRD, FSD, and Solution Design Documents signed off by clients.\n• Acted as primary bridge between onshore clients and offshore development teams, translating needs into actionable tasks and monitoring milestones.\n• Identified risks early, implemented mitigation strategies, and conducted client training and post-go-live support to drive successful adoption and retention.'
    },
    {
      id: '6',
      role: 'Senior Business Analyst',
      company: 'Kony Solutions, Hyderabad',
      startDate: 'Jul 2011',
      endDate: 'Jul 2014',
      current: false,
      description: '• Collaborated with cross-functional stakeholders to elicit, document, and prioritize requirements for mobile banking platforms, resulting in the successful delivery of customer-centric digital solutions that improved user adoption.'
    },
    {
      id: '7',
      role: 'Fidelity Information Systems',
      company: 'Bangalore',
      startDate: 'Aug 2010',
      endDate: 'Jun 2011',
      current: false,
      description: ''
    },
    {
      id: '8',
      role: 'Oracle Financial Software Services Limited',
      company: 'Bangalore',
      startDate: 'Mar 2008',
      endDate: 'Jul 2010',
      current: false,
      description: ''
    }
  ],
  education: [
    {
      id: '1',
      school: 'Andhra University, India',
      degree: 'Master of Computer Science',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    },
    {
      id: '2',
      school: 'IIIT Hyderabad',
      degree: 'Advanced Certification in Blockchain & DLT',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  skills: 'Cloud Platforms: AWS (IAM, EKS, EC2, S3, AWS Lambda), Azure, Terraform, Docker, Kubernetes\nTools: Jenkins, Azure DevOps, JIRA, Confluence\nMethodologies: Agile Software Development, SAFe, Scrum, Customer Success, Business Analysis, Project Management, Solution Delivery\n\nCertifications:\n• Certified AWS Solutions Architect – Associate\n• Terraform Associate Certified\n• TOGAF® Enterprise Architecture Certified\n• Six Sigma Black Belt\n• SAFe® 5 Scrum Master (SSM)\n• AI for everyone, Generative AI Essentials & Agentic AI (In progress)',
  projects: [],
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects']
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(DEMO_DATA);
  const [activeSection, setActiveSection] = useState<SectionType | null>(SectionType.DESIGN);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const element = document.getElementById('resume-preview');
    if (!element) {
      setIsDownloading(false);
      return;
    }

    // Access html2pdf from window to avoid import issues
    // @ts-ignore
    const html2pdf = window.html2pdf;

    if (!html2pdf) {
      console.error('html2pdf library not loaded');
      setIsDownloading(false);
      return;
    }

    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName || 'Resume'} - CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => setIsDownloading(false))
      .catch((err: any) => {
        console.error('Download failed:', err);
        setIsDownloading(false);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden print:bg-white print:h-auto print:overflow-visible">
      
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 print:hidden">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            CV
          </div>
          <span className="text-lg font-bold text-gray-800 tracking-tight">ATS-Pro</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="md:hidden">
             <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsMobilePreview(!isMobilePreview)}
            >
              {isMobilePreview ? <PenLine size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
              {isMobilePreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleDownload}
            isLoading={isDownloading}
            className="shadow-sm shadow-blue-200"
          >
            <Download size={16} className="mr-2" />
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative print:overflow-visible print:block print:h-auto">
        
        {/* Editor Panel */}
        <div className={`
          w-full md:w-[450px] lg:w-[500px] flex-shrink-0 bg-white shadow-xl z-20 
          transition-transform duration-300 ease-in-out absolute md:relative h-full
          ${isMobilePreview ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          print:hidden
        `}>
          <ResumeEditor 
            data={resumeData} 
            onChange={setResumeData}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Preview Panel */}
        <div className="flex-1 bg-gray-100 overflow-auto p-4 md:p-8 flex justify-center print:p-0 print:m-0 print:bg-white print:w-full print:block print:overflow-visible print:h-auto">
           <div className="print:w-full">
              <ResumePreview data={resumeData} />
           </div>
        </div>
      </main>

    </div>
  );
}

export default App;