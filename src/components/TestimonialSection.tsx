import React from 'react';
import { Container } from './ui';
import { Code, Compass, FileText } from 'lucide-react';

const principles = [
  {
    category: "The Solutions Perspective",
    title: "Commercial-Minded Architecture",
    body: "Technology should not be sold in a vacuum. I approach every client with an engineer's understanding of complex systems and a seller's focus on revenue. This means scoping technical solutions that directly drive scalable business growth and maximize a client's Return on Investment.",
    icon: Code,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    category: "The Client Perspective",
    title: "The \"Why\" Before the \"What\"",
    body: "Enterprise buyers do not buy code; they buy solutions to critical pain points. I focus on ruthlessly uncovering the exact business bottleneck before ever pitching a product. If we cannot clearly measure and prove the commercial impact of a Proof of Concept (PoC), we should not be proposing it.",
    icon: Compass,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    category: "The Alignment Perspective",
    title: "Radical Clarity",
    body: "Miscommunication is the biggest deal-breaker in complex B2B sales. Whether I am navigating technical pushback from engineers or presenting a business case to C-suite executives, my goal is to act as the ultimate translator. I ensure every stakeholder understands exactly what we are delivering and why it matters to their bottom line.",
    icon: FileText,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  }
];

export function TestimonialSection() {
  return (
    <section className="py-24 bg-[#fdfaf5] border-y-2 border-brand-border" id="principles">
      <Container>
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Operating Principles</h2>
          <p className="text-brand-subtext max-w-3xl text-lg leading-relaxed">
            I believe successful enterprise partnerships aren't just about pitching smart features. They are about how you translate those features into undeniable business value. These are the core rules I follow when architecting solutions and driving revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 border-2 border-black rounded-xl shadow-[6px_6px_0_0_#000] flex flex-col transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg border-2 border-black ${p.iconBg} shadow-[2px_2px_0_0_#000]`}>
                  <p.icon className={`w-6 h-6 ${p.iconColor}`} strokeWidth={2.5} />
                </div>
                <div className="text-sm font-bold text-brand-subtext uppercase tracking-wider">{p.category}</div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
              <p className="text-lg text-brand-text leading-relaxed font-medium flex-1">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
