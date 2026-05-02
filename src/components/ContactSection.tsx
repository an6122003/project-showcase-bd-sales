import React from 'react';
import { Container } from './ui';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="py-24 bg-white" id="contact">
      <Container>
        <div className="bg-[#fdfaf5] text-black border-4 border-black rounded-2xl p-8 md:p-16 shadow-[8px_8px_0_0_#666] flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's drive scalable growth together.</h2>
            <p className="text-xl font-medium text-gray-700 mb-8">
              I am currently open to new roles in Strategic Business Development and Technical Sales. Whether you are looking for someone to bridge the gap between engineering and revenue, or just want to connect, my inbox is always open.
            </p>
            
            <a 
              href="mailto:an6122003@gmail.com" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-xl font-bold border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
            >
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Say Hello
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <a 
              href="https://www.linkedin.com/in/an-nguyen-quoc/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white border-2 border-black rounded-xl hover:bg-gray-50 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Linkedin className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-lg">Connect on LinkedIn</span>
            </a>
            <a 
              href="https://github.com/an6122003" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white border-2 border-black rounded-xl hover:bg-gray-50 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <Github className="w-8 h-8" />
              <span className="font-bold text-lg">View GitHub Profile</span>
            </a>
          </div>

        </div>
      </Container>
    </section>
  );
}
