import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PixelAvatar, TikTokIcon } from './PixelIcons';
import { Button, Container, Modal } from './ui';
import { Github, Linkedin, Mail, Youtube, Facebook, ArrowRight, Download, ExternalLink, FileText, ChevronLeft, ChevronRight, Loader, ZoomIn, ZoomOut } from 'lucide-react';
import { fetchPdf } from '../utils/fetchPdf';

// Reuse the same worker setup
pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;

const cvUrl = '/projects/cv/CV_PM_1Page_v2.bin';

const codeSnippet = `
function initializeMultiAgentPipeline(config: PipelineConfig) {
  const { models, routingStrategy, maxRetries } = config;
  
  // Cost-aware multi-LLM routing
  const router = new ModelRouter({
    primary: models.claude,
    fallback: models.gemini,
    local: models.ollama
  });

  return async function processArticle(sourceId: string) {
    try {
      const rawData = await fetchSource(sourceId);
      const metrics = await analyzeCost(rawData.length);
      
      const model = router.selectOptimal(metrics);
      const optimizedContent = await model.generate(rawData);
      
      await publishToHeadlessCMS({
        content: optimizedContent,
        seoTags: generateSEOMetadata(optimizedContent)
      });
      
      return { status: 'success', cost: metrics.projectedCost };
    } catch (error) {
      if (maxRetries > 0) return retryPipeline(sourceId);
      throw new PipelineError('Pipeline failed', error);
    }
  }
}
`.trim();

const CodeScroll = () => (
  <div className="animate-scroll-code flex flex-col gap-8 h-[200%]">
    <pre>{codeSnippet}</pre>
    <pre>{codeSnippet}</pre>
    <pre>{codeSnippet}</pre>
    <pre>{codeSnippet}</pre>
    <pre>{codeSnippet}</pre>
    <pre>{codeSnippet}</pre>
  </div>
);

const WireframeSVG = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-40">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ccc" strokeWidth="0.5" />
      </pattern>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#999" />
      </marker>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />

    <rect x="5%" y="20%" width="25%" height="15%" rx="4" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
    <rect x="7%" y="23%" width="10%" height="2%" fill="#ccc" className="animate-[pulse_2s_ease-in-out_infinite]" />
    <rect x="7%" y="27%" width="20%" height="1%" fill="#ccc" className="animate-[pulse_2.5s_ease-in-out_infinite]" />
    <rect x="7%" y="30%" width="15%" height="1%" fill="#ccc" className="animate-[pulse_3s_ease-in-out_infinite]" />

    <path d="M 30% 27% L 70% 27%" stroke="#999" strokeWidth="2" strokeDasharray="8 8" markerEnd="url(#arrow)" className="animate-[flowLine_0.5s_linear_infinite]" />

    <rect x="70%" y="15%" width="30%" height="25%" rx="4" fill="none" stroke="#999" strokeWidth="2" className="animate-pulse" style={{ animationDuration: '3s' }} />
    <circle cx="85%" cy="25%" r="4%" fill="none" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: '85% 25%' }} />
    <circle cx="85%" cy="25%" r="1.5%" fill="#ccc" className="animate-ping" style={{ animationDuration: '3s' }} />
    <rect x="73%" y="32%" width="24%" height="4%" rx="2" fill="#ccc" className="animate-[pulse_1.5s_ease-in-out_infinite]" />

    <path d="M 85% 40% L 85% 55%" stroke="#999" strokeWidth="2" strokeDasharray="8 8" markerEnd="url(#arrow)" className="animate-[flowLine_0.8s_linear_infinite]" />

    <rect x="70%" y="55%" width="30%" height="20%" rx="4" fill="none" stroke="#999" strokeWidth="2" className="animate-pulse" style={{ animationDuration: '4s' }} />
    <rect x="73%" y="60%" width="10%" height="8%" rx="2" fill="#ccc" className="animate-[pulse_2s_ease-in-out_infinite]" />
    <rect x="87%" y="60%" width="10%" height="8%" rx="2" fill="#ccc" className="animate-[pulse_2.5s_ease-in-out_infinite]" />
  </svg>
);

const bgStyles = `
  @keyframes scrollCode {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  .animate-scroll-code {
    animation: scrollCode 20s linear infinite;
  }
  @keyframes flowLine {
    to { stroke-dashoffset: -8; }
  }
  .animate-flow-line {
    animation: flowLine 1s linear infinite;
  }
`;

function useMagnetic() {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

export function HeroSection() {
  const [bgState, setBgState] = useState<'none' | 'how' | 'why'>('none');
  const magnetic = useMagnetic();

  const [isCvOpen, setIsCvOpen] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(900);
  const [pdfScale, setPdfScale] = useState(1);

  // Stable file object — created once, never recreated (prevents react-pdf loop)
  const fileObjRef = useRef<{ data: ArrayBuffer } | null>(null);
  const [cvReady, setCvReady] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [cvError, setCvError] = useState(false);

  // Blob URL for download/open actions
  const blobUrlRef = useRef<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  // Measure width: once on open + on window resize (no ResizeObserver — prevents loop)
  const measureWidth = useCallback(() => {
    if (containerRef.current) {
      const w = Math.min(Math.floor(containerRef.current.clientWidth) - 32, 1100);
      setContainerWidth(w);
    }
  }, []);

  useEffect(() => {
    if (!isCvOpen) return;
    const timer = setTimeout(measureWidth, 100);
    window.addEventListener('resize', measureWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureWidth);
    };
  }, [isCvOpen, measureWidth]);

  // Fetch CV PDF when modal opens — once ever
  useEffect(() => {
    if (!isCvOpen || fileObjRef.current) {
      if (fileObjRef.current) setCvReady(true);
      return;
    }

    let cancelled = false;
    setCvLoading(true);
    setCvError(false);

    fetchPdf(cvUrl)
      .then(buf => {
        if (cancelled) return;
        // Create ONCE — same object reference forever
        fileObjRef.current = { data: buf };
        blobUrlRef.current = URL.createObjectURL(new Blob([buf], { type: 'application/pdf' }));
        setCvReady(true);
        setCvLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setCvError(true);
          setCvLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [isCvOpen]);

  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.preventDefault();
    if (blobUrlRef.current) window.open(blobUrlRef.current, '_blank');
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (blobUrlRef.current) {
      const a = document.createElement('a');
      a.href = blobUrlRef.current;
      a.download = 'CV_PM_1Page.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <section className="pt-24 pb-12 bg-white relative overflow-hidden" id="about">
      <style>{bgStyles}</style>

      {/* Backgrounds */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out z-0 ${bgState === 'how' ? 'opacity-100' : 'opacity-0'}`}>
        {/* How: Scrolling code */}
        <div className="absolute inset-0 overflow-hidden text-gray-800 font-mono text-sm leading-relaxed whitespace-pre opacity-30 p-8 select-none">
          <CodeScroll />
        </div>
      </div>

      <div className={`hidden lg:block absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out z-0 ${bgState === 'why' ? 'opacity-100' : 'opacity-0'}`}>
        {/* Why: Wireframes SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <WireframeSVG />
        </div>
      </div>

      <Container>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-20">
          <div className="flex flex-col items-center gap-4 relative">
            <div className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0">
              <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="An Nguyen Quoc" className="w-full h-full object-cover rounded-[2rem] border-4 border-black shadow-[6px_6px_0_0_#000] rotate-3 hover:rotate-0 transition-transform duration-300 relative z-10 bg-white" />
            </div>

            {/* Active Builder Pulse */}
            <div className="flex items-center gap-2 border-2 border-black bg-white shadow-[2px_2px_0_0_#000] px-3 py-1.5 rounded-md absolute -bottom-6 md:-bottom-8 z-20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold font-mono tracking-tight uppercase whitespace-nowrap">
                LATEST BUILD: AI-Powered Vietnamese Tech News Platform
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start max-w-2xl mt-8 md:mt-0">
            <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-1.5 mb-6 shadow-[3px_3px_0_0_#000] rotate-[-1deg] hover:rotate-0 transition-transform">
              <span className="font-bold text-sm md:text-base uppercase tracking-widest">An Nguyen</span>
              <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
              <span className="font-mono text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-700">STRATEGIC BUSINESS DEVELOPMENT / TECH SALES</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Engineering the <span
                onMouseEnter={() => setBgState('how')}
                onMouseLeave={() => setBgState('none')}
                className="cursor-crosshair border-b-4 border-dashed border-gray-300 hover:border-black transition-colors"
              >Solution.</span> <br />
              Selling the <span
                onMouseEnter={() => setBgState('why')}
                onMouseLeave={() => setBgState('none')}
                className="cursor-crosshair border-b-4 border-dashed border-gray-300 hover:border-black transition-colors"
              >Impact.</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-brand-text mb-4 leading-relaxed">
              The best code in the world does not matter if the market does not understand its business value.
            </p>
            <p className="text-base text-brand-subtext mb-8 leading-relaxed">
              I started my career in the technical trenches, building scalable software and AI workflows for organizations like ANZ Plus and P&G. However, my most impactful commercial wins, such as deploying an enterprise AI chatbot that eliminated critical data bottlenecks at ANZ Plus, taught me that the real challenge is rarely the technology. It is business alignment. Now, I operate at the intersection of engineering and commercial value. I help clients uncover their infrastructure bottlenecks and architecting technical solutions that deliver scalable ROI.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mb-8">
              <Button className="flex items-center gap-2" onClick={() => setIsCvOpen(true)}>
                View My CV / Resume
                <ArrowRight size={16} strokeWidth={3} />
              </Button>

              <a
                href="#projects"
                ref={magnetic.ref}
                onMouseMove={magnetic.handleMouseMove}
                onMouseLeave={magnetic.handleMouseLeave}
                className="font-bold text-sm underline underline-offset-4 decoration-2 decoration-brand-subtext hover:decoration-black hover:text-black transition-colors duration-200 ease-out inline-block px-4 py-2"
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                Explore my work ↓
              </a>
            </div>

            <div className="flex items-center gap-4 text-brand-subtext">
              <a href="https://www.linkedin.com/in/an-nguyen-quoc/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Linkedin size={24} /></a>
              <a href="https://github.com/an6122003" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Github size={24} /></a>
              <a href="https://www.youtube.com/@anndaynee" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Youtube size={24} /></a>
              <a href="https://www.facebook.com/anmamxanhbaby/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Facebook size={24} /></a>
              <a href="https://www.tiktok.com/@anndaynee" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><TikTokIcon className="w-6 h-6" /></a>
              <a href="mailto:an6122003@gmail.com" className="hover:text-black transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </Container>

      {/* CV Modal */}
      <Modal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} title="Resume">
        <div ref={containerRef} className="flex flex-col gap-4">
          <div className="w-full border-4 border-black rounded-xl overflow-auto shadow-[4px_4px_0_0_#000] bg-white h-[60vh] min-h-[400px] relative">
            {cvLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                <Loader className="w-8 h-8 animate-spin text-black" />
                <span className="text-brand-subtext font-mono text-sm font-bold">Loading CV…</span>
              </div>
            )}
            {cvError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8 bg-white z-10">
                <FileText className="w-12 h-12 text-gray-300" />
                <p className="text-brand-subtext font-medium">Could not load CV.</p>
              </div>
            )}
            {cvReady && fileObjRef.current && (
              <div className="flex justify-center min-w-min">
                <Document
                  file={fileObjRef.current}
                  onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                  onLoadError={() => setCvError(true)}
                  error={
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <FileText className="w-12 h-12 text-gray-300" />
                      <p className="text-brand-subtext font-medium">Failed to render CV.</p>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    width={containerWidth}
                    scale={pdfScale}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onRenderSuccess={() => {}}
                    loading={
                      <div className="flex items-center justify-center h-[60vh]">
                        <Loader className="w-6 h-6 animate-spin text-gray-400" />
                      </div>
                    }
                  />
                </Document>
              </div>
            )}
          </div>

          {/* Controls Bar: Pagination & Zoom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fdfaf5] border-2 border-black rounded-lg px-4 py-2.5">
            {/* Pagination (visually hidden if 1 page to maintain flex layout) */}
            <div className="flex items-center gap-4" style={{ visibility: numPages > 1 ? 'visible' : 'hidden' }}>
              <button
                type="button"
                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={3} />
              </button>
              <span className="font-mono text-sm font-bold">Page {pageNumber} / {Math.max(1, numPages)}</span>
              <button
                type="button"
                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
                className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPdfScale(s => Math.max(0.5, s - 0.25))}
                className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" strokeWidth={3} />
              </button>
              <span className="font-mono text-sm font-bold min-w-[4ch] text-center">{Math.round(pdfScale * 100)}%</span>
              <button
                type="button"
                onClick={() => setPdfScale(s => Math.min(3, s + 0.25))}
                className="p-1.5 border-2 border-black rounded bg-white hover:bg-black hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Blob-based actions — prevents IDM interception */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleOpenInNewTab}
              disabled={!cvReady}
              className="flex-1 flex items-center justify-center gap-2 font-bold text-sm border-2 border-black px-6 py-3 rounded bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-wait"
            >
              <ExternalLink size={18} strokeWidth={3} />
              {cvReady ? 'Open in New Tab' : 'Preparing…'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!cvReady}
              className="flex-1 flex items-center justify-center gap-2 font-bold text-sm border-2 border-black px-6 py-3 rounded bg-black text-white hover:bg-gray-800 transition-all shadow-[4px_4px_0_0_#EAEAEA] hover:shadow-[2px_2px_0_0_#EAEAEA] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-wait"
            >
              <Download size={18} strokeWidth={3} />
              {cvReady ? 'Download PDF' : 'Preparing…'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
