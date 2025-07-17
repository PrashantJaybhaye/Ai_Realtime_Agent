import Link from 'next/link'
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  Heart,
  ArrowRight
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Integrations', href: '#' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Status', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: '#' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:hello@sidvia.com' }
  ]

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground">
                <svg width={32} height={32} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                  <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                  <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                  <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={2} fill="none" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Sidvia</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Revolutionizing interview preparation with AI-powered coaching. 
              Practice, improve, and land your dream job with confidence.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} Sidvia Inc. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for job seekers worldwide.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted/50 hover:bg-primary/20 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer