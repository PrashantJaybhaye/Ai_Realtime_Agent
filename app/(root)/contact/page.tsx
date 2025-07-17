import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/actions/auth.action'
import UserError from '@/components/UserError'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Headphones,
  Globe,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react'

const ContactPage = async () => {
  const user = await getCurrentUser()
  if (!user) return <UserError />

  const contactMethods = [
    {
      icon: <Mail className="w-7 h-7" />,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@sidvia.com',
      action: 'Send Email'
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat'
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    }
  ]

  const socialLinks = [
    { icon: <Twitter className="w-6 h-6" />, name: 'Twitter', url: '#' },
    { icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', url: '#' },
    { icon: <Github className="w-6 h-6" />, name: 'GitHub', url: '#' }
  ]

  return (
    <div className="container mx-auto px-4 md:px-8 space-y-20 md:space-y-28 lg:space-y-36">
      {/* Header Section */}
      <section className="text-center space-y-8 md:space-y-12 pt-10 md:pt-20">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full text-primary text-base font-semibold shadow-sm">
          <Headphones className="w-5 h-5" />
          Get in Touch
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
          We&apos;re Here to <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Help You Succeed
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-2">
          Have questions about Sidvia? Need technical support? Want to share feedback?
          We&apos;d love to hear from you and help you on your interview preparation journey.
        </p>
      </section>

      {/* Why Contact Us Section */}
      <section className="max-w-3xl mx-auto bg-card/70 rounded-2xl shadow-lg border border-border/40 p-6 md:p-10 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Why Contact Us?</h2>
        <ul className="space-y-4 text-muted-foreground text-base md:text-lg list-disc list-inside">
          <li>Get personalized support for your interview prep journey</li>
          <li>Share feedback or request new features</li>
          <li>Report bugs or technical issues</li>
          <li>Discuss partnership or enterprise solutions</li>
        </ul>
      </section>

      {/* Contact Methods */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {contactMethods.map((method, index) => (
          <Card key={index} className="text-center p-6 md:p-10 bg-gradient-to-br from-primary/5 to-accent/5 border border-border/30 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary shadow mb-2">
                {method.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{method.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-2">{method.description}</p>
              <p className="font-medium text-foreground mb-4">{method.contact}</p>
              <Button className="btn-primary w-full font-semibold text-base">
                {method.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Office Info & Social Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Visit Our Office</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
            While we primarily operate remotely, our team is based in San Francisco.
            We&apos;re always happy to meet with partners, investors, or enterprise clients.
          </p>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Address</h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  91 Springboard, 4th Floor, Ackruti Trade Centre<br />
                  MIDC Industrial Area, Andheri East, Mumbai, Maharashtra 400093<br />
                  India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Global Support</h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  24/7 online support available worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-10 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
          <div className="relative bg-card/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border/40 shadow-lg">
            <div className="space-y-8">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Connect With Us</h3>
              <div className="flex gap-4 md:gap-8 justify-center mb-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary transition-colors shadow"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground mb-1">Quick Links</h4>
                <div className="space-y-2 text-sm md:text-base">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Help Center & FAQ
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Feature Requests
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Bug Reports
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Partnership Inquiries
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-14 border border-border/40 shadow-lg mt-10">
        <div className="text-center space-y-8 md:space-y-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mb-4">
            Can&apos;t find what you&apos;re looking for? Check out our comprehensive FAQ section or reach out directly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-1">How does Sidvia work?</h4>
              <p className="text-muted-foreground text-sm md:text-base">
                Sidvia uses advanced AI to conduct realistic mock interviews and provide detailed feedback on your performance.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-1">Is my data secure?</h4>
              <p className="text-muted-foreground text-sm md:text-base">
                Yes, we use enterprise-grade security measures to protect your personal information and interview data.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-1">Can I practice for specific roles?</h4>
              <p className="text-muted-foreground text-sm md:text-base">
                Absolutely! Sidvia offers customized interviews for various roles, experience levels, and tech stacks.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-1">What if I need technical support?</h4>
              <p className="text-muted-foreground text-sm md:text-base">
                Our support team is available via email, chat, and phone to help you with any technical issues.
              </p>
            </div>
          </div>
          <Button variant="outline" className="mt-8 text-base font-semibold px-8 py-3 rounded-xl">
            View All FAQs
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ContactPage