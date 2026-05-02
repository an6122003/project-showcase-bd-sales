import React from 'react';
import { Container } from './ui';
import { Briefcase, Code, Compass, GraduationCap, Server, Linkedin } from 'lucide-react';
import { PixelComputer } from './PixelIcons';

export function AboutSection() {
  return (
    <section className="py-24 bg-[#fdfaf5]" id="experience">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Intro & Skills */}
          <div className="w-full lg:w-5/12 flex flex-col gap-8 lg:sticky lg:top-32 self-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                <PixelComputer className="w-8 h-8" />
                About Me
              </h2>
              <p className="text-lg md:text-xl text-brand-text leading-relaxed font-medium mb-4">
                Transitioning from Software Engineering into B2B Tech Sales and Business Development.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                I started my career in the technical trenches, building scalable AI and cloud infrastructure. But my true obsession has always been the end-user and the commercial outcome. Because I care deeply about solving real customer pain points, I went beyond just writing code. I built real, working enterprise products that solve critical business bottlenecks, and I engineered reward-winning business strategies for global brands.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                This user-centric mindset made me realize that the best technology only matters if the market understands its value. I am pivoting into Tech Sales because I want to be on the front lines. I bring a unique, hands-on ability to sit across from clients, immediately understand their technical constraints, and translate complex product capabilities into clear commercial ROI.
              </p>
            </div>

            <div className="pt-6 border-t-2 border-brand-border">
              <h3 className="text-xl font-bold mb-6">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center mb-3 border-2 border-black">
                    <Compass className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold mb-2">Product & Strategy</h4>
                  <p className="text-sm text-gray-600 font-medium">Product Lifecycle Management, MVP Definition, UI/UX Prototyping, Strategy & Alignment.</p>
                </div>
                
                <div className="bg-white p-5 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center mb-3 border-2 border-black">
                    <Code className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold mb-2">Data & Analytics</h4>
                  <p className="text-sm text-gray-600 font-medium">Data-Driven Decision Making, KPI Tracking, FinOps Cost Optimization, BigQuery, Looker.</p>
                </div>

                <div className="bg-white p-5 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all md:col-span-2">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mb-3 border-2 border-black">
                    <Server className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold mb-2">Technical Engineering</h4>
                  <p className="text-sm text-gray-600 font-medium">Go, Python, NodeJS, Java, AWS, GCP, Docker, Kubernetes, SQL.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="w-full lg:w-7/12 flex flex-col gap-10">
            
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6" /> Work Experience
              </h3>
              <div className="relative border-l-4 border-black pl-8 ml-4 space-y-8">
                <div className="relative">
                  <div className="absolute w-5 h-5 bg-black rounded-full -left-[42px] top-1 border-4 border-[#fdfaf5]"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      May 2024 - Present
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Back-end & Platform Engineer</h4>
                    <p className="text-brand-subtext font-bold mb-3">HCLTech x ANZx (ANZ Plus)</p>
                    <p className="text-sm text-gray-700 leading-relaxed md:line-clamp-4">
                      Led the end-to-end lifecycle of a Multi-Agent Analytics Chatbot automating SQL generation and chart visualization. Delivered secure Joint-Account workflows and optimized Google Cloud usage, eliminating manual financial data processing.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Sep 2023 - Dec 2023
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">IT Intern Co-op / Management</h4>
                    <p className="text-brand-subtext font-bold mb-3">Procter & Gamble Vietnam</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Led global SU/Pallet tracking initiative for Grooming BU, aligning up to 20 cross-functional stakeholders.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Oct 2021 - Nov 2022
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Marketing Intern</h4>
                    <p className="text-brand-subtext font-bold mb-3">Vietnam Australia International School</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Managed marketing copywriting and content production. Founded and grew social communities to 30,000+ followers, assisting the PR Manager in media creation and event organization to promote School's values.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Extracurricular */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Compass className="w-6 h-6" /> Extracurricular
              </h3>
              <div className="relative border-l-4 border-black pl-8 ml-4 space-y-8">
                <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Jul 2022 - Jan 2023
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Project Leader</h4>
                    <p className="text-brand-subtext font-bold mb-3">Intelligent Investment Competition</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Directed a 6-month action plan for a nationwide virtual stock trading competition with 600+ participants. Managed 4 cross-functional teams (38 members) spanning Marketing, Sponsorship, and Programming. Secured complex stakeholder partnerships and major funding.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-white p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Jun 2022 - May 2023
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">External Vice President</h4>
                    <p className="text-brand-subtext font-bold mb-3">RMIT Vietnam Finance Club</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Operated as an Executive Board member, managing 140+ members across 4 departments. Efficiently supervised External Relations and Marketing teams, growing social communities to 29k+ followers and driving successful medium-scale events through cross-club collaborations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" /> Education
              </h3>
              <div className="relative border-l-4 border-black pl-8 ml-4 space-y-8">
                <div className="relative">
                  <div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full -left-[42px] top-1"></div>
                  <div className="bg-blue-50 p-6 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000]">
                    <div className="flex items-center gap-2 text-brand-subtext font-bold text-xs uppercase tracking-wide mb-2">
                      Graduation
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Bachelor of Info Technology</h4>
                    <p className="text-brand-subtext font-bold mb-3">RMIT University (GPA: 3.6/4.0)</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Scholar's List.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mx-auto lg:mx-0 mt-6 lg:mt-4">
               <a 
                 href="https://www.linkedin.com/in/an-nguyen-quoc/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 rounded-lg font-bold text-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
               >
                 <Linkedin className="w-5 h-5 fill-current" />
                 Connect
               </a>
               <a 
                 href="https://www.linkedin.com/in/an-nguyen-quoc/details/experience/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-50 rounded-lg font-bold text-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
               >
                 View Full Experience
               </a>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
