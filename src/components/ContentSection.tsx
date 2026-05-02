import React, { useEffect, useRef } from 'react';
import { Container } from './ui';
import { Play, Youtube, ExternalLink, Linkedin, Facebook } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v8a4 4 0 0 1-2-3.46" />
  </svg>
);

const SocialWrapper = ({ 
  platform, 
  icon: Icon, 
  iconColor,
  headerBg,
  children 
}: { 
  platform: string, 
  icon: any, 
  iconColor: string,
  headerBg: string,
  children: React.ReactNode 
}) => (
  <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000]">
    {/* Neo-brutalist browser header */}
    <div className={`${headerBg} border-b-2 border-black px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="font-bold text-xs uppercase tracking-wider text-black">{platform}</span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full border border-black bg-white"></div>
        <div className="w-2.5 h-2.5 rounded-full border border-black bg-white"></div>
        <div className="w-2.5 h-2.5 rounded-full border border-black bg-white"></div>
      </div>
    </div>
    {/* Embed container */}
    <div className="bg-white w-full h-[400px] md:h-[450px] overflow-y-auto overflow-x-hidden relative flex items-start justify-center">
      {children}
    </div>
  </div>
);

const LinkedInEmbed = () => (
  <div className="h-full transition-all duration-500 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] rounded-xl">
    <SocialWrapper platform="LinkedIn" icon={Linkedin} iconColor="text-blue-600" headerBg="bg-blue-50">
      <iframe
        src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7280402427013382144"
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        title="LinkedIn Post"
      />
    </SocialWrapper>
  </div>
);

const FacebookEmbed = () => {
  const encodedHref = encodeURIComponent('https://www.facebook.com/photo?fbid=3339865516197652&set=a.364455427072024');
  return (
    <div className="h-full lg:translate-y-8 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] rounded-xl">
      <SocialWrapper platform="Facebook" icon={Facebook} iconColor="text-indigo-600" headerBg="bg-indigo-50">
        <iframe
          src={`https://www.facebook.com/plugins/post.php?href=${encodedHref}&show_text=true&width=350`}
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Post"
        />
      </SocialWrapper>
    </div>
  );
};

const TikTokEmbed = () => (
  <div className="h-full transition-all duration-500 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[0_0_30px_rgba(219,39,119,0.3)] rounded-xl">
    <SocialWrapper platform="TikTok" icon={TikTokIcon} iconColor="text-pink-600" headerBg="bg-pink-50">
      <iframe
        src="https://www.tiktok.com/embed/v2/7624782196674399495"
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        scrolling="no"
        title="TikTok Post"
      />
    </SocialWrapper>
  </div>
);

const YouTubeEmbed = () => (
  <div className="h-full lg:translate-y-8 transition-all duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] rounded-xl">
    <SocialWrapper platform="YouTube" icon={Youtube} iconColor="text-red-600" headerBg="bg-red-50">
      <iframe
        src="https://www.youtube.com/embed/videoseries?list=UUp516-9p-tw8HPqyY68i3Ow"
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube Channel"
      />
    </SocialWrapper>
  </div>
);

export function ContentSection() {
  return (
    <section className="py-24 bg-brand-bg border-y-2 border-brand-border" id="social">
      <Container>
        <div className="mb-12 lg:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 group cursor-default leading-tight">
            <span className="block text-black transition-all duration-300 group-hover:text-gray-800">Building by day.</span>
            <span className="block text-gray-400 transition-all duration-500 group-hover:text-purple-600 group-hover:italic group-hover:drop-shadow-[0_0_12px_rgba(147,53,253,0.4)]">
              Breaking it down by night.
            </span>
          </h2>
          
          <p className="text-brand-subtext max-w-2xl text-lg">Most of my time is spent at the intersection of engineering and revenue, helping enterprises scale their infrastructure. But I have always been obsessed with the story behind the code. I use these platforms to share my experiences, translating complex technical concepts into clear insights, and diving into everything from AI updates to market strategy. This is basically my personal log of what I am learning, building, and bringing to market.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          <LinkedInEmbed />
          <FacebookEmbed />
          <TikTokEmbed />
          <YouTubeEmbed />
        </div>
      </Container>
    </section>
  );
}
