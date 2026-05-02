import React from 'react';
import { Sparkles } from 'lucide-react';

const techSkills = [
  "AWS", "GCP", "Python", "Go", "NodeJS", "React", "Docker", "Kubernetes", "SQL", "BigQuery"
];

const pmSkills = [
  "Product Strategy", "Roadmap Planning", "UX Research", "Agile", "Jira", "Figma", "Looker", "A/B Testing", "Stakeholder Alignment"
];

// Combine and duplicate for infinite marquee effect
const allSkills = [...techSkills, ...pmSkills];
const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills]; // triple to ensure it's wide enough

export function TechStackSection() {
  return (
    <section className="py-16 overflow-hidden flex flex-col items-center gap-8" id="tech-stack">
      {/* Indicator Block - Centered above */}
      <div className="flex items-center gap-2 font-bold text-lg md:text-xl uppercase tracking-widest bg-white border-2 border-black rounded-lg px-6 py-2 shadow-[4px_4px_0_0_#000] rotate-[-1deg] hover:rotate-0 transition-transform">
        <Sparkles className="w-5 h-5 text-black" />
        <span>Core Skillsets</span>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden w-full bg-brand-bg border-y-2 border-brand-border py-8">
        <div className="flex animate-marquee gap-4 items-center">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={index}
              className="px-6 py-3 bg-white text-black font-bold text-lg md:text-xl border-2 border-black rounded-lg shadow-[4px_4px_0_0_#666] select-none"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
