import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Sparkles, Brain, Shield, Zap, Globe, TrendingUp, MessageSquare, BarChart } from 'lucide-react';

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

      const els = heroRef.current.querySelectorAll('[data-parallax]') as NodeListOf<HTMLElement>;
      els.forEach(el => {
        const depth = parseFloat(el.dataset.parallax || '1');
        el.style.transform = `translate(${xPct * depth * 14}px, ${yPct * depth * 10}px)`;
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
    {
      icon: Brain,
      title: '[ADVANCED REASONING ENGINE]',
      description: '[Description of advanced reasoning capabilities and AGi intelligence]',
    },
    {
      icon: Shield,
      title: '[GLOBAL COMPLIANCE SYSTEM]',
      description: '[Description of location-based compliance and regulatory adherence]',
    },
    {
      icon: Zap,
      title: '[REAL-TIME PROCESSING]',
      description: '[Description of instant response and high-performance processing]',
    },
    {
      icon: Globe,
      title: '[MULTI-LANGUAGE SUPPORT]',
      description: '[Description of international language capabilities]',
    },
    {
      icon: TrendingUp,
      title: '[ADAPTIVE LEARNING]',
      description: '[Description of continuous improvement and learning features]',
    },
    {
      icon: MessageSquare,
      title: '[CONVERSATIONAL AI]',
      description: '[Description of natural dialogue and chat capabilities]',
    },
    {
      icon: BarChart,
      title: '[ANALYTICS DASHBOARD]',
      description: '[Description of insights, metrics, and reporting features]',
    },
    {
      icon: Sparkles,
      title: '[ENTERPRISE READY]',
      description: '[Description of scalability, security, and enterprise features]',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" ref={heroRef}>
      {/* Cursor-following ambient glow (desktop only) */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 hidden md:block"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,206,209,0.05) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.25s ease, top 0.25s ease',
          top: '50%',
          left: '50%',
        }}
      />

      {/* Hero Section */}
      <section className="section-container relative z-10">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-block" data-parallax="0.5">
            <div className="px-4 py-2 glass rounded-full border border-primary/30">
              <span className="text-xs sm:text-sm font-medium gradient-text tracking-widest uppercase">
                Introducing NeurusAGi
              </span>
            </div>
          </div>

          {/* Title */}
          <div data-parallax="1">
            <h1 className="heading-xl max-w-4xl mx-auto leading-tight">
              A Quantum Leap in Intelligence
            </h1>
          </div>

          {/* Subtitle */}
          <div data-parallax="0.7">
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the next evolution of artificial general intelligence.
              NeurusAGi delivers enterprise-grade AGi capabilities with advanced reasoning,
              global compliance, and unparalleled innovation.
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center pt-2" data-parallax="0.3">
            <Link to="/pricing" className="btn-primary text-base sm:text-lg px-8 py-3 sm:py-4">
              View Pricing
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="pt-8 sm:pt-12" data-parallax="1.5">
            <div
              className="glass-strong rounded-2xl neural-glow max-w-3xl mx-auto relative overflow-hidden"
              style={{ padding: 'clamp(24px, 5vw, 48px)' }}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-secondary/40 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-secondary/40 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />

              <div
                className="aspect-video rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,206,209,0.08) 0%, rgba(255,215,0,0.06) 100%)' }}
              >
                <div className="text-center space-y-3">
                  <Brain className="w-14 h-14 sm:w-20 sm:h-20 mx-auto text-primary animate-pulse-slow" />
                  <p className="text-base sm:text-xl font-semibold gradient-text">
                    [HERO DEMONSTRATION VIDEO OR ANIMATION]
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    [Interactive demo or product showcase goes here]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,206,209,0.3), transparent)' }} />
      </div>

      {/* Features Section */}
      <section className="section-container relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="heading-lg mb-3 sm:mb-4">Enterprise-Grade Features</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful capabilities designed for the most demanding applications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-block group"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px] group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{ background: '#000' }}>
                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container relative z-10">
        <div className="glass-strong rounded-2xl p-8 sm:p-12 lg:p-16 neural-glow text-center relative overflow-hidden">
          {/* Decorative bg blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,206,209,0.06), transparent)' }} />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(255,215,0,0.05), transparent)' }} />

          <div className="relative z-10">
            <h2 className="heading-lg mb-4 sm:mb-6">Ready to Experience the Future?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
              Join organizations leveraging NeurusAGi for breakthrough innovations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary text-base sm:text-lg px-8 py-3 sm:py-4 w-full sm:w-auto text-center">
                Start Your Journey
              </Link>
              <Link to="/contact" className="btn-ghost text-base sm:text-lg px-8 py-3 sm:py-4 w-full sm:w-auto text-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
