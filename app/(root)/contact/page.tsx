import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getCurrentUser } from '@/lib/actions/auth.action'
import UserError from '@/components/UserError'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
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
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@sidvia.com',
      action: 'Send Email'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    }
  ]

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: '#' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: '#' },
    { icon: <Github className="w-5 h-5" />, name: 'GitHub', url: '#' }
  ]

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium">
            <Headphones className="w-4 h-4" />
            Get in Touch
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            We&apos;re Here to
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Help You Succeed
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about Sidvia? Need technical support? Want to share feedback? 
            We&apos;d love to hear from you and help you on your interview preparation journey.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="grid md:grid-cols-3 gap-8">
        {contactMethods.map((method, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {method.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{method.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                <p className="font-medium text-foreground mb-4">{method.contact}</p>
                <Button className="btn-primary w-full">
                  {method.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto">
        <Card className="p-8">
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Your last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" defaultValue={user.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button type="submit" className="w-full btn-primary h-12 text-base font-semibold">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Office Info */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Visit Our Office</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we primarily operate remotely, our team is based in San Francisco. 
              We&apos;re always happy to meet with partners, investors, or enterprise clients.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Address</h4>
                <p className="text-muted-foreground text-sm">
                  123 Innovation Drive<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Business Hours</h4>
                <p className="text-muted-foreground text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Global Support</h4>
                <p className="text-muted-foreground text-sm">
                  24/7 online support available worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
          <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Connect With Us</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Quick Links</h4>
                <div className="space-y-2 text-sm">
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
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 border border-border/50">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Check out our comprehensive FAQ section or reach out directly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">How does Sidvia work?</h4>
              <p className="text-muted-foreground text-sm">
                Sidvia uses advanced AI to conduct realistic mock interviews and provide detailed feedback on your performance.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Is my data secure?</h4>
              <p className="text-muted-foreground text-sm">
                Yes, we use enterprise-grade security measures to protect your personal information and interview data.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Can I practice for specific roles?</h4>
              <p className="text-muted-foreground text-sm">
                Absolutely! Sidvia offers customized interviews for various roles, experience levels, and tech stacks.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">What if I need technical support?</h4>
              <p className="text-muted-foreground text-sm">
                Our support team is available via email, chat, and phone to help you with any technical issues.
              </p>
            </div>
          </div>
          
          <Button variant="outline" className="mt-6">
            View All FAQs
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ContactPage