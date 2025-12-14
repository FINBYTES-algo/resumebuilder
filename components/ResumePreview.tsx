import React from 'react';
import { ResumeData, SectionKey } from '../types';
import { MapPin, Mail, Phone, Linkedin, Globe, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { theme } = data;
  const layout = theme.template || 'classic';

  switch (layout) {
    case 'modern':
      return <ModernLayout data={data} />;
    case 'timeline':
      return <TimelineLayout data={data} />;
    default:
      return <ClassicLayout data={data} />;
  }
};

// --- Shared Helpers ---

const renderBullets = (text: string) => {
  if (!text) return null;
  const items = text.split('\n').filter(item => item.trim().length > 0);
  if (items.length === 0) return null;
  
  const isList = items.some(item => item.trim().startsWith('•') || item.trim().startsWith('-'));
  
  if (isList) {
    return (
      <ul className="list-disc ml-4 space-y-1 mt-1">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-800 leading-relaxed text-[10.5pt]">
            {item.replace(/^[•-]\s*/, '')}
          </li>
        ))}
      </ul>
    );
  }

  return items.map((item, idx) => (
    <p key={idx} className="text-gray-800 leading-relaxed text-[10.5pt] mb-1.5 last:mb-0">
      {item}
    </p>
  ));
};

const ContactInfo = ({ personalInfo, color }: { personalInfo: any, color?: string }) => (
  <div className={`flex flex-wrap justify-center gap-3 text-xs ${color ? '' : 'text-gray-700'}`} style={{ color: color }}>
    {personalInfo.location && (
      <div className="flex items-center">
        <span className="font-medium">{personalInfo.location}</span>
      </div>
    )}
    {personalInfo.phone && (
        <>
        <span className="opacity-60">•</span>
        <div className="flex items-center">
          <span className="font-medium">{personalInfo.phone}</span>
        </div>
      </>
    )}
    {personalInfo.email && (
      <>
        <span className="opacity-60">•</span>
        <div className="flex items-center">
          <a href={`mailto:${personalInfo.email}`} className="font-medium hover:underline">{personalInfo.email}</a>
        </div>
      </>
    )}
    {personalInfo.linkedin && (
        <>
        <span className="opacity-60">•</span>
        <div className="flex items-center">
          <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="font-medium hover:underline">
            LinkedIn
          </a>
        </div>
      </>
    )}
    {personalInfo.website && (
        <>
        <span className="opacity-60">•</span>
        <div className="flex items-center">
          <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="font-medium hover:underline">
            Portfolio
          </a>
        </div>
      </>
    )}
  </div>
);

// --- Layouts ---

const ClassicLayout: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, theme } = data;
  const primaryColor = theme?.primaryColor || '#111827';
  const defaultOrder: SectionKey[] = ['summary', 'experience', 'education', 'skills', 'projects'];
  const sectionOrder = data.sectionOrder || defaultOrder;

  const renderSection = (sectionKey: SectionKey) => {
    switch (sectionKey) {
      case 'summary':
        if (!summary) return null;
        return (
          <section key={sectionKey} className="mb-5 break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-2 pb-0.5" style={{ color: primaryColor, borderColor: '#d1d5db' }}>
              Professional Summary
            </h2>
            <p className="text-[10.5pt] leading-relaxed text-gray-800">{summary}</p>
          </section>
        );
      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key={sectionKey} className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-0.5" style={{ color: primaryColor, borderColor: '#d1d5db' }}>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[11pt] font-bold" style={{ color: primaryColor }}>{exp.role}</h3>
                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11pt] font-semibold text-gray-700 mb-1">{exp.company}</div>
                  <div className="text-[10.5pt] text-gray-800">{renderBullets(exp.description)}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'education':
        if (education.length === 0) return null;
        return (
          <section key={sectionKey} className="mb-5 break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-0.5" style={{ color: primaryColor, borderColor: '#d1d5db' }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[11pt] font-bold" style={{ color: primaryColor }}>{edu.school}</h3>
                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                      {edu.startDate && `${edu.startDate} – `}{edu.endDate}
                    </span>
                  </div>
                  <div className="text-[10.5pt]">
                    <span className="font-semibold text-gray-800">{edu.degree}</span>
                    {edu.field && <span className="text-gray-700"> in {edu.field}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key={sectionKey} className="mb-5 break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-0.5" style={{ color: primaryColor, borderColor: '#d1d5db' }}>
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[11pt] font-bold" style={{ color: primaryColor }}>
                      {proj.name} 
                      {proj.link && (
                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="ml-2 text-xs font-normal text-blue-700 hover:underline inline-flex items-center">
                          Link <ExternalLink size={10} className="ml-0.5"/>
                        </a>
                      )}
                    </h3>
                  </div>
                  {proj.technologies && <p className="text-xs font-medium text-gray-600 mb-1">Technologies: {proj.technologies}</p>}
                  <div className="text-[10.5pt] text-gray-800">{renderBullets(proj.description)}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'skills':
        if (!skills) return null;
        return (
          <section key={sectionKey} className="mb-5 break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-2 pb-0.5" style={{ color: primaryColor, borderColor: '#d1d5db' }}>
              Technical Skills
            </h2>
            <p className="text-[10.5pt] leading-relaxed text-gray-800">{skills}</p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div id="resume-preview" className="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto shadow-2xl print:shadow-none print:m-0 print:p-[12mm] text-gray-900 font-sans">
      <header className="border-b-2 pb-4 mb-5 break-inside-avoid" style={{ borderColor: primaryColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-wide text-center mb-3" style={{ color: primaryColor }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <ContactInfo personalInfo={personalInfo} />
      </header>

      {sectionOrder.map(renderSection)}
    </div>
  );
};

const TimelineLayout: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, theme } = data;
  const primaryColor = theme?.primaryColor || '#111827';
  const defaultOrder: SectionKey[] = ['summary', 'experience', 'education', 'skills', 'projects'];
  const sectionOrder = data.sectionOrder || defaultOrder;

  const renderSection = (sectionKey: SectionKey) => {
    switch (sectionKey) {
      case 'summary':
        // Summary is shown in header for timeline layout
        return null;
      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key={sectionKey} className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
               Experience
            </h2>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-8 break-inside-avoid">
                  <div 
                    className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  
                  <div className="mb-1">
                     <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                    <h3 className="text-[12pt] font-bold" style={{ color: primaryColor }}>{exp.role}</h3>
                    <div className="text-[11pt] font-medium" style={{ color: primaryColor }}>{exp.company}</div>
                  </div>
                  <div className="text-[10.5pt] text-gray-800 mt-2">
                    {renderBullets(exp.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key={sectionKey} className="mb-6 break-inside-avoid">
             <h2 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
               Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border p-4 rounded-lg bg-gray-50 border-gray-100">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[11pt] font-bold" style={{ color: primaryColor }}>
                      {proj.name}
                    </h3>
                     {proj.link && (
                        <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center">
                          View <ExternalLink size={10} className="ml-1"/>
                        </a>
                      )}
                  </div>
                  {proj.technologies && <div className="text-xs font-mono text-gray-500 mb-2">{proj.technologies}</div>}
                  <div className="text-[10pt] text-gray-800">{renderBullets(proj.description)}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'education':
        if (education.length === 0) return null;
        return (
          <section key={sectionKey} className="break-inside-avoid">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-1" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="text-[10.5pt] font-bold text-gray-900">{edu.school}</div>
                  <div className="text-[10pt] text-gray-700">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                  <div className="text-xs text-gray-500">{edu.startDate && `${edu.startDate} – `}{edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'skills':
        if (!skills) return null;
        return (
          <section key={sectionKey} className="break-inside-avoid">
             <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-1" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
              Skills
            </h2>
            <div className="text-[10.5pt] leading-relaxed text-gray-800">
              {skills.split(',').map((skill) => (
                <span key={skill} className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-medium text-gray-700 mr-2 mb-2">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  // Separate sections that go in grid vs full width
  const gridSections: SectionKey[] = ['education', 'skills'];
  const fullWidthSections = sectionOrder.filter(s => !gridSections.includes(s));
  const gridOrder = sectionOrder.filter(s => gridSections.includes(s));

  return (
    <div id="resume-preview" className="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto shadow-2xl print:shadow-none print:m-0 print:p-[12mm] text-gray-900 font-sans">
      <header className="mb-8 break-inside-avoid">
        <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: primaryColor }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 mb-4 border-l-4 pl-4" style={{ borderColor: primaryColor }}>
           <div className="flex flex-col gap-1">
             {personalInfo.email && <span className="flex items-center gap-2"><Mail size={12}/> {personalInfo.email}</span>}
             {personalInfo.phone && <span className="flex items-center gap-2"><Phone size={12}/> {personalInfo.phone}</span>}
             {personalInfo.location && <span className="flex items-center gap-2"><MapPin size={12}/> {personalInfo.location}</span>}
             {personalInfo.linkedin && <span className="flex items-center gap-2"><Linkedin size={12}/> {personalInfo.linkedin}</span>}
           </div>
        </div>
        {summary && <p className="text-[10.5pt] leading-relaxed text-gray-700 italic">{summary}</p>}
      </header>

      {fullWidthSections.map(renderSection)}

      {gridOrder.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gridOrder.map(renderSection)}
        </div>
      )}
    </div>
  );
};

const ModernLayout: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, theme } = data;
  const primaryColor = theme?.primaryColor || '#111827';

  return (
    <div id="resume-preview" className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-2xl print:shadow-none print:m-0 flex text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[65mm] p-[8mm] text-white flex-shrink-0" style={{ backgroundColor: primaryColor }}>
        <div className="mb-8 text-center break-inside-avoid">
           <div className="w-20 h-20 rounded-full bg-white/10 mx-auto flex items-center justify-center text-2xl font-bold mb-4">
             {personalInfo.fullName.charAt(0)}
           </div>
           <h1 className="text-xl font-bold uppercase tracking-wide leading-tight mb-4" style={{ color: '#ffffff' }}>
            {personalInfo.fullName}
          </h1>
        </div>

        <div className="space-y-6 text-sm">
          <div className="space-y-3 opacity-90 break-inside-avoid">
             {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
             {personalInfo.phone && <div>{personalInfo.phone}</div>}
             {personalInfo.location && <div>{personalInfo.location}</div>}
             {personalInfo.linkedin && <a href={personalInfo.linkedin} className="block hover:underline truncate">LinkedIn</a>}
             {personalInfo.website && <a href={personalInfo.website} className="block hover:underline truncate">Portfolio</a>}
          </div>

          {skills && (
            <div className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3" style={{ color: '#ffffff' }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                 {skills.split(',').map((skill) => (
                  <span key={skill} className="text-xs bg-white/10 px-2 py-1 rounded">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="break-inside-avoid">
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 mb-3" style={{ color: '#ffffff' }}>Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold">{edu.degree}</div>
                    <div className="text-xs opacity-80">{edu.school}</div>
                    <div className="text-xs opacity-60 mt-0.5">{edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-[10mm]">
        {(() => {
          const defaultOrder: SectionKey[] = ['summary', 'experience', 'education', 'skills', 'projects'];
          const sectionOrder = data.sectionOrder || defaultOrder;
          // For modern layout, skills and education stay in sidebar, so filter them out
          const mainContentOrder = sectionOrder.filter(s => s !== 'skills' && s !== 'education');

          const renderMainSection = (sectionKey: SectionKey) => {
            switch (sectionKey) {
              case 'summary':
                if (!summary) return null;
                return (
                  <section key={sectionKey} className="mb-6 break-inside-avoid">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b border-gray-200" style={{ color: primaryColor }}>
                      Profile
                    </h2>
                    <p className="text-[10pt] leading-relaxed text-gray-600">
                      {summary}
                    </p>
                  </section>
                );
              case 'experience':
                if (experience.length === 0) return null;
                return (
                  <section key={sectionKey} className="mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-1 border-b border-gray-200" style={{ color: primaryColor }}>
                      Experience
                    </h2>
                    <div className="space-y-5">
                      {experience.map((exp) => (
                        <div key={exp.id} className="break-inside-avoid">
                           <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-[11pt] font-bold" style={{ color: primaryColor }}>{exp.role}</h3>
                            <span className="text-xs font-bold text-gray-500">
                              {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <div className="text-[10pt] font-semibold text-gray-700 mb-2" style={{ color: primaryColor }}>{exp.company}</div>
                          <div className="text-[10pt] text-gray-600">
                            {renderBullets(exp.description)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              case 'projects':
                if (projects.length === 0) return null;
                return (
                  <section key={sectionKey} className="mb-6 break-inside-avoid">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-1 border-b border-gray-200" style={{ color: primaryColor }}>
                      Projects
                    </h2>
                    <div className="space-y-4">
                      {projects.map((proj) => (
                        <div key={proj.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-[11pt] font-bold" style={{ color: primaryColor }}>{proj.name}</h3>
                             {proj.link && (
                              <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                                Link
                              </a>
                            )}
                          </div>
                          <div className="text-[10pt] text-gray-600">
                            {renderBullets(proj.description)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              default:
                return null;
            }
          };

          return mainContentOrder.map(renderMainSection);
        })()}
      </main>
    </div>
  );
};