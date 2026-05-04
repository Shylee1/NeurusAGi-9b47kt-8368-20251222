import { Link } from 'react-router-dom';
import { Mail, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'rgba(0,0,0,0.06)', borderTop: '1px solid rgba(0,206,209,0.18)' }} className="mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/neurus-logo-bg.jpeg"
                alt="NeurusAGi"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="text-lg font-bold gradient-text">NeurusAGi</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              A quantum leap in intelligence. The first true AGi.
            </p>
            <div className="flex gap-4 pt-1">
              <a href="mailto:jt@naurusagi.com" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/news', label: 'News' },
                { to: '/pricing', label: 'Pricing' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { to: '/investors', label: 'Investors' },
                { to: '/contact', label: 'Contact' },
                { to: '/login', label: 'Sign In' },
                { to: '/signup', label: 'Get Started' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted-foreground/60">[Privacy Policy]</span></li>
              <li><span className="text-sm text-muted-foreground/60">[Terms of Service]</span></li>
              <li><span className="text-sm text-muted-foreground/60">[Cookie Policy]</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} NeurusAGi. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Founded by <span className="text-primary/70">Jeremy Taylor</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
