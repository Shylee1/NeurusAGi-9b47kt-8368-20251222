import { Link } from 'react-router-dom';
import { Sparkles, Brain, Shield, Zap, Globe, TrendingUp, MessageSquare, BarChart } from 'lucide-react';

export function HomePage() {
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <div className="px-4 py-2 glass rounded-full border border-primary/30 mb-6">
              <span className="text-sm font-medium gradient-text">
                Introducing NeurusAGi
              </span>
            </div>
          </div>
          
          <h1 className="heading-xl max-w-4xl mx-auto">
            A Quantum Leap in Intelligence
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the next evolution of artificial general intelligence. 
            NeurusAGi delivers enterprise-grade AGi capabilities with advanced reasoning, 
            global compliance, and unparalleled innovation.
          </p>
          
          <div className="flex items-center justify-center pt-4">
            <Link to="/pricing" className="btn-primary text-lg px-8 py-4">
              View Pricing
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="pt-12 sm:pt-16">
            <div className="glass-strong rounded-2xl p-8 sm:p-12 neural-glow card-3d max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Brain className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-primary animate-pulse-slow" />
                  <p className="text-xl sm:text-2xl font-semibold gradient-text">
                    [HERO DEMONSTRATION VIDEO OR ANIMATION]
                  </p>
                  <p className="text-sm text-muted-foreground">
                    [Interactive demo or product showcase]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            Enterprise-Grade Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful capabilities designed for the most demanding applications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-block">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-background/90 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="heading-sm text-base">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <div className="glass-strong rounded-2xl p-8 sm:p-12 lg:p-16 neural-glow text-center">
          <h2 className="heading-lg mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of organizations leveraging NeurusAGi for breakthrough innovations
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Start Your Journey
            </Link>
            <Link to="/contact" className="btn-ghost text-lg px-8 py-4">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
