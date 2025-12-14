import React, { useState } from 'react';
import { ResumeData, SectionType, TemplateType, SectionKey } from '../types';
import { Plus, Trash2, ChevronDown, ChevronUp, Palette, LayoutTemplate, Clock, Columns, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { AIAssistant } from './AIAssistant';
import { generateResumeSummary, improveDescription } from '../services/geminiService';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  activeSection: SectionType | null;
  setActiveSection: (section: SectionType | null) => void;
}

const PRESET_COLORS = [
  '#111827', // Gray 900 (Default)
  '#2563eb', // Blue 600
  '#059669', // Emerald 600
  '#7c3aed', // Violet 600
  '#db2777', // Pink 600
  '#dc2626', // Red 600
  '#ea580c', // Orange 600
  '#0d9488', // Teal 600
];

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ 
  data, 
  onChange,
  activeSection,
  setActiveSection
}) => {
  const defaultOrder: SectionKey[] = ['summary', 'experience', 'education', 'skills', 'projects'];
  const sectionOrder = data.sectionOrder || defaultOrder;

  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateSectionOrder = (newOrder: SectionKey[]) => {
    onChange({ ...data, sectionOrder: newOrder });
  };

  const moveSectionUp = (sectionKey: SectionKey) => {
    const newOrder = [...sectionOrder];
    const currentIndex = newOrder.indexOf(sectionKey);
    if (currentIndex > 0) {
      [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
      updateSectionOrder(newOrder);
    }
  };

  const moveSectionDown = (sectionKey: SectionKey) => {
    const newOrder = [...sectionOrder];
    const currentIndex = newOrder.indexOf(sectionKey);
    if (currentIndex < newOrder.length - 1) {
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      updateSectionOrder(newOrder);
    }
  };

  const resetSectionOrder = () => {
    updateSectionOrder(defaultOrder);
  };

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateTheme = (field: keyof ResumeData['theme'], value: any) => {
    onChange({
      ...data,
      theme: { ...data.theme, [field]: value }
    });
  };

  const addItem = <T extends { id: string }>(field: 'experience' | 'education' | 'projects', newItem: T) => {
    onChange({
      ...data,
      [field]: [...data[field], newItem]
    });
  };

  const removeItem = (field: 'experience' | 'education' | 'projects', id: string) => {
    onChange({
      ...data,
      [field]: data[field].filter((item: any) => item.id !== id)
    });
  };

  const updateItem = (field: 'experience' | 'education' | 'projects', id: string, key: string, value: any) => {
    onChange({
      ...data,
      [field]: data[field].map((item: any) => item.id === id ? { ...item, [key]: value } : item)
    });
  };

  const SectionHeader = ({ title, type, sectionKey }: { title: string, type: SectionType, sectionKey?: SectionKey }) => {
    const isReorderable = sectionKey !== undefined;
    const currentIndex = isReorderable ? sectionOrder.indexOf(sectionKey!) : -1;
    const canMoveUp = isReorderable && currentIndex > 0;
    const canMoveDown = isReorderable && currentIndex < sectionOrder.length - 1;

    return (
      <div className="flex items-center bg-white border-b transition-all">
        {isReorderable && (
          <div className="flex flex-col border-r border-gray-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveSectionUp(sectionKey!);
              }}
              disabled={!canMoveUp}
              className={`
                p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed
                ${canMoveUp ? 'cursor-pointer' : ''}
              `}
              title="Move section up"
            >
              <ArrowUp size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveSectionDown(sectionKey!);
              }}
              disabled={!canMoveDown}
              className={`
                p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-200
                disabled:opacity-30 disabled:cursor-not-allowed
                ${canMoveDown ? 'cursor-pointer' : ''}
              `}
              title="Move section down"
            >
              <ArrowDown size={14} />
            </button>
          </div>
        )}
        <button 
          onClick={() => setActiveSection(activeSection === type ? null : type)} 
          className={`flex-1 flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${activeSection === type ? 'text-blue-600 font-semibold border-l-4 border-l-blue-600' : 'text-gray-700'}`}
        >
          <span className="text-sm font-medium uppercase tracking-wide flex items-center">
            {type === SectionType.DESIGN && <Palette size={16} className="mr-2" />}
            {title}
          </span>
          {activeSection === type ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    );
  };

  const isDefaultOrder = JSON.stringify(sectionOrder) === JSON.stringify(defaultOrder);

  return (
    <div className="h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Editor</h2>
            <p className="text-xs text-gray-500 mt-1">Optimize your content for ATS.</p>
          </div>
          {!isDefaultOrder && (
            <button
              onClick={resetSectionOrder}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-gray-200 hover:border-blue-300"
              title="Reset section order to default"
            >
              <RotateCcw size={14} />
              Reset Order
            </button>
          )}
        </div>
      </div>

       {/* Design / Theme */}
       <div>
        <SectionHeader title="Design & Templates" type={SectionType.DESIGN} />
        {activeSection === SectionType.DESIGN && (
          <div className="p-5 bg-white border-b border-gray-100 animate-in slide-in-from-top-2">
            
            {/* Template Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-3">Template Layout</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => updateTheme('template', 'classic')}
                  className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${data.theme.template === 'classic' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <LayoutTemplate size={20} className="mb-1" />
                  <span className="text-[10px] font-medium">Classic</span>
                </button>
                <button
                  onClick={() => updateTheme('template', 'timeline')}
                  className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${data.theme.template === 'timeline' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Clock size={20} className="mb-1" />
                  <span className="text-[10px] font-medium">Time Series</span>
                </button>
                <button
                  onClick={() => updateTheme('template', 'modern')}
                  className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${data.theme.template === 'modern' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Columns size={20} className="mb-1" />
                  <span className="text-[10px] font-medium">Modern</span>
                </button>
              </div>
            </div>

            <label className="block text-xs font-semibold text-gray-600 uppercase mb-3">Accent Color</label>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => updateTheme('primaryColor', color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${data.theme.primaryColor === color ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative overflow-hidden w-10 h-10 rounded-full border border-gray-200 shadow-sm">
                <input 
                  type="color" 
                  value={data.theme.primaryColor}
                  onChange={(e) => updateTheme('primaryColor', e.target.value)}
                  className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Custom Color</span>
                <span className="text-xs text-gray-500">{data.theme.primaryColor}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Personal Info */}
      <div>
        <SectionHeader title="Personal Information" type={SectionType.PERSONAL} />
        {activeSection === SectionType.PERSONAL && (
          <div className="p-5 space-y-4 bg-white animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={data.personalInfo.fullName} 
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email</label>
                  <input 
                    type="email" 
                    value={data.personalInfo.email} 
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.phone} 
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="+1 555-0123"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Location</label>
                <input 
                  type="text" 
                  value={data.personalInfo.location} 
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="City, Country"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">LinkedIn</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.linkedin} 
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Website</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.website} 
                    onChange={(e) => updatePersonalInfo('website', e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="portfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Render sections in order */}
      {sectionOrder.map((sectionKey) => {
        if (sectionKey === 'summary') {
          return (
            <div key={sectionKey}>
              <SectionHeader title="Professional Summary" type={SectionType.SUMMARY} sectionKey={sectionKey} />
              {activeSection === SectionType.SUMMARY && (
                <div className="p-5 space-y-3 bg-white border-b border-gray-100">
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase">Executive Summary</label>
                    <AIAssistant 
                      label="Auto-Write"
                      onGenerate={() => generateResumeSummary('Professional', data.skills || 'General Skills')}
                      onAccept={(text) => updateField('summary', text)}
                    />
                  </div>
                  <textarea 
                    value={data.summary} 
                    onChange={(e) => updateField('summary', e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                    placeholder="Briefly describe your professional background and key achievements..."
                  />
                </div>
              )}
            </div>
          );
        }
        if (sectionKey === 'experience') {
          return (
            <div key={sectionKey}>
              <SectionHeader title="Work Experience" type={SectionType.EXPERIENCE} sectionKey={sectionKey} />
              {activeSection === SectionType.EXPERIENCE && (
          <div className="p-5 space-y-6 bg-white">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                <div className="absolute top-4 right-4 flex space-x-2">
                   <button 
                    onClick={() => removeItem('experience', exp.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove position"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Position {index + 1}</h4>

                <div className="grid grid-cols-1 gap-3 mb-3">
                  <input 
                    placeholder="Job Title" 
                    className="w-full p-2 bg-white border border-gray-200 rounded text-sm font-medium focus:border-blue-500 outline-none"
                    value={exp.role}
                    onChange={(e) => updateItem('experience', exp.id, 'role', e.target.value)}
                  />
                  <input 
                    placeholder="Company Name" 
                    className="w-full p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                    value={exp.company}
                    onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                     <input 
                      type="text"
                      placeholder="Start Date (e.g., Jan 2020)" 
                      className="p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                      value={exp.startDate}
                      onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)}
                    />
                     <input 
                      type="text"
                      placeholder="End Date" 
                      className="p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none disabled:bg-gray-100"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)}
                    />
                  </div>
                   <div className="flex items-center mt-1">
                    <input 
                      type="checkbox" 
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateItem('experience', exp.id, 'current', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`current-${exp.id}`} className="ml-2 text-xs text-gray-600 cursor-pointer">I currently work here</label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase">Responsibilities & Achievements</label>
                    <AIAssistant 
                      label="Enhance"
                      onGenerate={() => improveDescription(exp.description)}
                      onAccept={(text) => updateItem('experience', exp.id, 'description', text)}
                    />
                  </div>
                  <textarea 
                    placeholder="• Led a team of 5 developers..." 
                    className="w-full p-3 bg-white border border-gray-200 rounded text-sm h-32 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                    value={exp.description}
                    onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-dashed py-3 text-gray-500 hover:text-blue-600 hover:border-blue-300"
              onClick={() => addItem('experience', {
                id: Date.now().toString(),
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
              })}
            >
              <Plus size={16} className="mr-2" /> Add Position
            </Button>
          </div>
        )}
            </div>
          );
        }
        if (sectionKey === 'education') {
          return (
            <div key={sectionKey}>
              <SectionHeader title="Education" type={SectionType.EDUCATION} sectionKey={sectionKey} />
              {activeSection === SectionType.EDUCATION && (
          <div className="p-5 space-y-6 bg-white">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                <button 
                  onClick={() => removeItem('education', edu.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
                
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Education {index + 1}</h4>

                <div className="grid grid-cols-1 gap-3">
                  <input 
                    placeholder="School / University" 
                    className="w-full p-2 bg-white border border-gray-200 rounded text-sm font-medium focus:border-blue-500 outline-none"
                    value={edu.school}
                    onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      placeholder="Degree (e.g., BS, MA)" 
                      className="p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                      value={edu.degree}
                      onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                    />
                     <input 
                      placeholder="Field of Study" 
                      className="p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                      value={edu.field}
                      onChange={(e) => updateItem('education', edu.id, 'field', e.target.value)}
                    />
                  </div>
                   <div className="grid grid-cols-2 gap-3">
                    <input 
                      placeholder="Start Date" 
                      className="p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                      value={edu.startDate}
                      onChange={(e) => updateItem('education', edu.id, 'startDate', e.target.value)}
                    />
                     <input 
                      placeholder="End Date / Grad Year" 
                      className="p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                      value={edu.endDate}
                      onChange={(e) => updateItem('education', edu.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-dashed py-3 text-gray-500 hover:text-blue-600 hover:border-blue-300"
              onClick={() => addItem('education', {
                id: Date.now().toString(),
                school: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
              })}
            >
              <Plus size={16} className="mr-2" /> Add Education
            </Button>
          </div>
        )}
            </div>
          );
        }
        if (sectionKey === 'skills') {
          const skillsList = data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];
          
          const addSkill = (skill: string) => {
            if (skill.trim()) {
              const newSkills = skillsList.length > 0 
                ? [...skillsList, skill.trim()].join(', ')
                : skill.trim();
              updateField('skills', newSkills);
            }
          };

          const removeSkill = (index: number) => {
            const newSkillsList = skillsList.filter((_, i) => i !== index);
            updateField('skills', newSkillsList.join(', '));
          };

          const updateSkill = (index: number, newValue: string) => {
            const newSkillsList = [...skillsList];
            newSkillsList[index] = newValue.trim();
            updateField('skills', newSkillsList.join(', '));
          };

          return (
            <div key={sectionKey}>
              <SectionHeader title="Skills" type={SectionType.SKILLS} sectionKey={sectionKey} />
              {activeSection === SectionType.SKILLS && (
                <div className="p-5 space-y-4 bg-white">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Key Competencies</label>
                    
                    {/* Skills List */}
                    {skillsList.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {skillsList.map((skill, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded hover:bg-white transition-colors">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => updateSkill(index, e.target.value)}
                              className="flex-1 p-1.5 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="Skill name"
                            />
                            <button
                              onClick={() => removeSkill(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              title="Remove skill"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Skill Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="new-skill-input"
                        placeholder="Enter a skill (e.g. React, Python, Leadership)"
                        className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            addSkill(input.value);
                            input.value = '';
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById('new-skill-input') as HTMLInputElement;
                          if (input) {
                            addSkill(input.value);
                            input.value = '';
                            input.focus();
                          }
                        }}
                        className="px-4"
                      >
                        <Plus size={16} className="mr-1" />
                        Add
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Press Enter or click Add to add a skill. Skills will be displayed in the resume.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        }
        if (sectionKey === 'projects') {
          return (
            <div key={sectionKey}>
              <SectionHeader title="Projects" type={SectionType.PROJECTS} sectionKey={sectionKey} />
              {activeSection === SectionType.PROJECTS && (
          <div className="p-5 space-y-6 bg-white">
            {data.projects.map((proj, index) => (
              <div key={proj.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all">
                <button 
                  onClick={() => removeItem('projects', proj.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
                
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Project {index + 1}</h4>

                <div className="grid grid-cols-1 gap-3 mb-3">
                  <input 
                    placeholder="Project Name" 
                    className="w-full p-2 bg-white border border-gray-200 rounded text-sm font-medium focus:border-blue-500 outline-none"
                    value={proj.name}
                    onChange={(e) => updateItem('projects', proj.id, 'name', e.target.value)}
                  />
                   <input 
                    placeholder="Technologies Used" 
                    className="w-full p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                    value={proj.technologies}
                    onChange={(e) => updateItem('projects', proj.id, 'technologies', e.target.value)}
                  />
                  <input 
                    placeholder="Link (e.g. GitHub URL)" 
                    className="w-full p-2 bg-white border border-gray-200 rounded text-sm focus:border-blue-500 outline-none"
                    value={proj.link}
                    onChange={(e) => updateItem('projects', proj.id, 'link', e.target.value)}
                  />
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase">Description</label>
                    <AIAssistant 
                      label="Refine"
                      onGenerate={() => improveDescription(proj.description)}
                      onAccept={(text) => updateItem('projects', proj.id, 'description', text)}
                    />
                  </div>
                  <textarea 
                    placeholder="Briefly describe what you built and the outcome..." 
                    className="w-full p-3 bg-white border border-gray-200 rounded text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={proj.description}
                    onChange={(e) => updateItem('projects', proj.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-dashed py-3 text-gray-500 hover:text-blue-600 hover:border-blue-300"
              onClick={() => addItem('projects', {
                id: Date.now().toString(),
                name: '',
                description: '',
                link: '',
                technologies: ''
              })}
            >
              <Plus size={16} className="mr-2" /> Add Project
            </Button>
          </div>
        )}
            </div>
          );
        }
        return null;
      })}

      <div className="h-20"></div> {/* Spacer for bottom scroll */}
    </div>
  );
};