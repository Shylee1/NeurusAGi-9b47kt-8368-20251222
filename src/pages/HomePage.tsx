import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Brain, Shield, Zap, Globe, TrendingUp, MessageSquare, BarChart, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) {setVisible(true);obs.disconnect();}},
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealSection({ children, delay = 0, className = '' }: {children: React.ReactNode;delay?: number;className?: string;}) {
  const { ref, visible } = useInView();
  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`
      }}>
      
      {children}
    </section>);

}

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigate = useNavigate();

  const features = [
  { icon: Brain, title: '[ADVANCED REASONING ENGINE]', description: '[Description of advanced reasoning capabilities and AGi intelligence systems]' },
  { icon: Shield, title: '[GLOBAL COMPLIANCE SYSTEM]', description: '[Description of location-based compliance and regulatory adherence per jurisdiction]' },
  { icon: Zap, title: '[REAL-TIME PROCESSING]', description: '[Description of instant response and high-performance quantum-enhanced processing]' },
  { icon: Globe, title: '[MULTI-LANGUAGE SUPPORT]', description: '[Description of international language capabilities across all regions]' },
  { icon: TrendingUp, title: '[ADAPTIVE LEARNING]', description: '[Description of continuous self-improvement and autonomous knowledge expansion]' },
  { icon: MessageSquare, title: '[CONVERSATIONAL AGi]', description: '[Description of natural dialogue, deep context retention, and cognitive response]' },
  { icon: BarChart, title: '[ANALYTICS DASHBOARD]', description: '[Description of insights, usage metrics, and enterprise reporting features]' },
  { icon: Sparkles, title: '[ENTERPRISE READY]', description: '[Description of scalability, security, and white-label enterprise deployment options]' }];


  const stats = [
  { value: '39', label: 'New Software Components', sub: 'Invented from scratch' },
  { value: 'LNN', label: 'Living Neural Network', sub: 'World first' },
  { value: '5/9', label: 'ASi Framework Items', sub: 'Already achieved' },
  { value: '2025', label: 'AGi Achieved', sub: 'By Jeremy Taylor' }];


  // Dynamic aurora based on mouse
  const auroraStyle = {
    background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 80}%, rgba(0,206,209,0.055) 0%, transparent 55%), radial-gradient(ellipse at ${(1 - mousePos.x) * 100}% ${mousePos.y * 100}%, rgba(255,215,0,0.035) 0%, transparent 50%)`
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" ref={heroRef}>

      {/* Aurora layer — mouse-reactive, NOT following content */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-700"
        style={auroraStyle} />
      

      {/* ── HERO ── */}
      <section className="relative z-10 min-h-[95vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-20">

        {/* Orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {[520, 720, 920].map((size, i) =>
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1px solid rgba(0,206,209,${0.04 - i * 0.01})`,
              animation: `spin ${40 + i * 20}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`
            }} />

          )}
        </div>

        {/* Pre-sale badge */}
        <div className="mb-5 z-10">
          <button
            onClick={() => navigate('/presale')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(255,215,0,0.07)', border: '1px solid rgba(255,215,0,0.35)', color: '#FFD700' }}>
            
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Pre-Sale Now Open - Pay Months, Get Years
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-6 z-10">
          <h1
            className="font-black gradient-text leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
            
            A Quantum Leap
          </h1>
          <h1
            className="font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', color: 'rgba(255,255,255,0.9)' }}>
            
            in Intelligence
          </h1>
        </div>

        {/* Sub */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-center z-10 leading-relaxed">First artificial general intelligence, engineered from biological cognition, quantum-powered, and built for a world that current frameworks can never reach.

        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 z-10 w-full max-w-sm sm:max-w-none">
          

          
          

          
        </div>

        {/* Hero demo panel */}
        <div className="w-full max-w-4xl mx-auto z-10">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,206,209,0.15)',
              boxShadow: '0 0 60px rgba(0,206,209,0.12), 0 0 120px rgba(255,215,0,0.06)'
            }}>
            
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-primary/10" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ml-4 text-xs text-muted-foreground font-mono tracking-widest">NeurusAGi - Live Interface</span>
            </div>
            <div
              className="aspect-video flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(0,206,209,0.03) 0%, rgba(0,0,0,0) 100%)' }}>
              
              {/* Scan grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0.025,
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,206,209,1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,206,209,1) 40px)'
                }} />
              
              <div className="text-center space-y-4 px-6">
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
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,206,209,0.2), transparent)' }} />
      </div>

      {/* ── STATS ── */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) =>
          <div
            key={i}
            className="rounded-xl text-center p-5 sm:p-7"
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,206,209,0.1)',
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,206,209,0.3)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(0,206,209,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,206,209,0.1)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}>
            
              <p className="text-3xl sm:text-4xl font-black gradient-text mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          )}
        </div>
      </RevealSection>

      {/* ── FEATURES ── */}
      <RevealSection delay={100} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What NeurusAGi Delivers</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on a framework that current AI architectures can never replicate
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) =>
          <div
            key={i}
            className="rounded-xl p-5 sm:p-6 group cursor-default"
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,206,209,0.1)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = 'rgba(0,206,209,0.3)';
              el.style.boxShadow = '0 0 28px rgba(0,206,209,0.1)';
              el.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = 'rgba(0,206,209,0.1)';
              el.style.boxShadow = 'none';
              el.style.transform = 'translateY(0)';
            }}>
            
              <div
              className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
              style={{ background: 'rgba(0,206,209,0.07)', border: '1px solid rgba(0,206,209,0.18)' }}>
              
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          )}
        </div>
      </RevealSection>

      {/* ── BOTTOM CTA ── */}
      <RevealSection delay={150} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div
          className="rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,206,209,0.16)',
            boxShadow: '0 0 60px rgba(0,206,209,0.08)'
          }}>
          
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,206,209,0.05), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.035), transparent 60%)' }} />
          <div className="relative z-10">
            <h2 className="heading-lg mb-4">Ready to Experience True AGi?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join early subscribers gaining access to the world's first genuine artificial general intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto text-center">
                Get Access
              </Link>
              <Link to="/contact" className="btn-ghost text-base px-8 py-3.5 w-full sm:w-auto text-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>);

}