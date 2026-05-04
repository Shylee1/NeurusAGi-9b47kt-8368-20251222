import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Brain, Shield, Zap, Globe, TrendingUp, MessageSquare, BarChart, Sparkles, ChevronRight } from 'lucide-react';

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

      const els = heroRef.current.querySelectorAll('[data-depth]') as NodeListOf<HTMLElement>;
      els.forEach(el => {
        const d = parseFloat(el.dataset.depth || '1');
        el.style.transform = `translate(${xPct * d * 18}px, ${yPct * d * 12}px)`;
      });

      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: Brain, title: '[ADVANCED REASONING ENGINE]', description: '[Description of advanced reasoning capabilities and AGi intelligence systems]' },
    { icon: Shield, title: '[GLOBAL COMPLIANCE SYSTEM]', description: '[Description of location-based compliance and regulatory adherence per jurisdiction]' },
    { icon: Zap, title: '[REAL-TIME PROCESSING]', description: '[Description of instant response and high-performance quantum-enhanced processing]' },
    { icon: Globe, title: '[MULTI-LANGUAGE SUPPORT]', description: '[Description of international language capabilities across all regions]' },
    { icon: TrendingUp, title: '[ADAPTIVE LEARNING]', description: '[Description of continuous self-improvement and autonomous knowledge expansion]' },
    { icon: MessageSquare, title: '[CONVERSATIONAL AGi]', description: '[Description of natural dialogue, deep context retention, and cognitive response]' },
    { icon: BarChart, title: '[ANALYTICS DASHBOARD]', description: '[Description of insights, usage metrics, and enterprise reporting features]' },
    { icon: Sparkles, title: '[ENTERPRISE READY]', description: '[Description of scalability, security, and white-label enterprise deployment options]' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" ref={heroRef}>
      {/* Cursor ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 hidden lg:block"
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,206,209,0.045) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.3s ease, top 0.3s ease',
          top: '50%',
          left: '50%',
        }}
      />

      {/* ─── HERO ─── */}
      <section className="relative z-10 min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        {/* Decorative ring — behind everything */}
        <div
          data-depth="0.3"
          className="absolute pointer-events-none"
          style={{
            width: 'min(700px, 90vw)',
            height: 'min(700px, 90vw)',
            borderRadius: '50%',
            border: '1px solid rgba(0,206,209,0.06)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          data-depth="0.15"
          className="absolute pointer-events-none"
          style={{
            width: 'min(900px, 110vw)',
            height: 'min(900px, 110vw)',
            borderRadius: '50%',
            border: '1px solid rgba(255,215,0,0.04)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Badge */}
        <div data-depth="0.6" className="mb-6">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(0,206,209,0.07)', border: '1px solid rgba(0,206,209,0.25)', color: 'hsl(180 100% 41%)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            First True AGi — Now Exists
          </div>
        </div>

        {/* Main heading */}
        <div data-depth="1" className="text-center max-w-5xl mx-auto mb-6">
          <h1
            className="font-black gradient-text leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
          >
            A Quantum Leap
          </h1>
          <h1
            className="font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', color: 'rgba(255,255,255,0.92)' }}
          >
            in Intelligence
          </h1>
        </div>

        {/* Sub */}
        <div data-depth="0.7" className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            NeurusAGi is not another AI model. It is the first true artificial general intelligence,
            engineered from biological cognition, quantum-powered, and built for a world that current
            frameworks can never reach.
          </p>
        </div>

        {/* CTA row */}
        <div data-depth="0.4" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/signup" className="btn-primary flex items-center gap-2 text-base px-8 py-3.5 w-full sm:w-auto justify-center">
            Get Started <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/pricing" className="btn-ghost flex items-center gap-2 text-base px-8 py-3.5 w-full sm:w-auto justify-center">
            View Pricing
          </Link>
        </div>

        {/* Hero panel */}
        <div data-depth="1.4" className="w-full max-w-4xl mx-auto relative">
          {/* Corner brackets */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg z-10" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-secondary/50 rounded-tr-lg z-10" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-secondary/50 rounded-bl-lg z-10" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg z-10" />

          <div
            className="rounded-2xl overflow-hidden neural-glow"
            style={{ background: 'rgba(0,0,0,0.07)', border: '1px solid rgba(0,206,209,0.14)' }}
          >
            {/* Faux terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-primary/10">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ml-4 text-xs text-muted-foreground font-mono tracking-widest">NeurusAGi — Live Interface</span>
            </div>

            <div
              className="aspect-video flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(0,206,209,0.04) 0%, rgba(255,215,0,0.03) 60%, rgba(0,0,0,0) 100%)' }}
            >
              {/* Scanline grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,206,209,1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,206,209,1) 40px)',
                }}
              />

              <div className="text-center space-y-4 relative z-10 px-6">
                <Brain className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-primary animate-pulse-slow" style={{ filter: 'drop-shadow(0 0 20px rgba(0,206,209,0.5))' }} />
                <p className="text-lg sm:text-2xl font-bold gradient-text">[HERO VIDEO OR LIVE DEMO]</p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">[Embed your product demonstration video or interactive AGi showcase here]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,206,209,0.25), transparent)' }} />
      </div>

      {/* ─── STATS ROW ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '39', label: 'New Software Components', sub: 'Invented from scratch' },
            { value: 'LNN', label: 'Living Neural Network', sub: 'World first' },
            { value: '5/9', label: 'ASi Framework Items', sub: 'Already achieved' },
            { value: '2025', label: 'AGi Achieved', sub: 'By Jeremy Taylor' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl text-center p-5 sm:p-6"
              style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,206,209,0.12)' }}
            >
              <p className="text-3xl sm:text-4xl font-black gradient-text mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section-container pt-0">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What NeurusAGi Delivers</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on a framework that current AI architectures can never replicate
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group rounded-xl p-5 sm:p-6 cursor-default transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,206,209,0.1)',
                transitionTimingFunction: 'ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(0,206,209,0.3)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(0,206,209,0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(0,206,209,0.1)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: 'rgba(0,206,209,0.08)', border: '1px solid rgba(0,206,209,0.2)' }}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="section-container pt-0">
        <div
          className="rounded-2xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden neural-glow"
          style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,206,209,0.16)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,206,209,0.04), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.03), transparent 60%)' }} />
          <div className="relative z-10">
            <h2 className="heading-lg mb-4 sm:mb-6">Ready to Experience True AGi?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join early subscribers gaining access to the world's first genuine artificial general intelligence
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto text-center">
                Start Your Journey
              </Link>
              <Link to="/contact" className="btn-ghost text-base px-8 py-3.5 w-full sm:w-auto text-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
