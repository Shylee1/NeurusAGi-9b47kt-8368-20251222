import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';

export function PricingPage() {
  const tiers = [
    {
      name: '[TIER 1 NAME]',
      price: '[PRICE]',
      description: '[Tier 1 description and target audience]',
      features: [
        '[Feature 1]',
        '[Feature 2]',
        '[Feature 3]',
        '[Feature 4]',
      ],
      stripeLink: '#',
      highlighted: false,
    },
    {
      name: '[TIER 2 NAME]',
      price: '[PRICE]',
      description: '[Tier 2 description and target audience]',
      features: [
        '[Feature 1]',
        '[Feature 2]',
        '[Feature 3]',
        '[Feature 4]',
        '[Feature 5]',
      ],
      stripeLink: '#',
      highlighted: false,
    },
    {
      name: '[TIER 3 NAME]',
      price: '[PRICE]',
      description: '[Tier 3 description and target audience]',
      features: [
        '[Feature 1]',
        '[Feature 2]',
        '[Feature 3]',
        '[Feature 4]',
        '[Feature 5]',
        '[Feature 6]',
      ],
      stripeLink: '#',
      highlighted: true,
    },
    {
      name: '[TIER 4 NAME]',
      price: '[PRICE]',
      description: '[Tier 4 description and target audience]',
      features: [
        '[Feature 1]',
        '[Feature 2]',
        '[Feature 3]',
        '[Feature 4]',
        '[Feature 5]',
        '[Feature 6]',
        '[Feature 7]',
      ],
      stripeLink: '#',
      highlighted: false,
    },
    {
      name: '[TIER 5 NAME]',
      price: '[PRICE]',
      description: '[Tier 5 description and target audience]',
      features: [
        '[Feature 1]',
        '[Feature 2]',
        '[Feature 3]',
        '[Feature 4]',
        '[Feature 5]',
        '[Feature 6]',
        '[Feature 7]',
        '[Feature 8]',
      ],
      stripeLink: '#',
      highlighted: false,
    },
    {
      name: '[TIER 6 NAME]',
      price: '[PRICE]',
      description: '[Tier 6 description and target audience]',
      features: [
        '[Feature 1]',
        '[Feature 2]',
        '[Feature 3]',
        '[Feature 4]',
        '[Feature 5]',
        '[Feature 6]',
        '[Feature 7]',
        '[Feature 8]',
        '[Feature 9]',
      ],
      stripeLink: '#',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h1 className="heading-xl mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect tier for your needs. All plans include core AGi capabilities.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative group ${
                tier.highlighted
                  ? 'lg:scale-105 lg:-translate-y-4'
                  : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-secondary to-accent rounded-full">
                  <span className="text-xs font-bold text-secondary-foreground flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>POPULAR</span>
                  </span>
                </div>
              )}
              
              <div
                className={`h-full feature-block perspective-1000 ${
                  tier.highlighted
                    ? 'border-2 border-secondary'
                    : ''
                }`}
              >
                {/* Tier Header */}
                <div className="text-center pb-6 border-b border-primary/20">
                  <h3 className="heading-md text-2xl mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                {/* Features List */}
                <div className="py-6 space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-6">
                  <a
                    href={tier.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center ${
                      tier.highlighted
                        ? 'btn-secondary'
                        : 'btn-primary'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include 24/7 support and regular updates
          </p>
          <Link to="/contact" className="text-primary hover:text-primary/80 font-semibold">
            Need help choosing? Contact our team
          </Link>
        </div>
      </section>
    </div>
  );
}
