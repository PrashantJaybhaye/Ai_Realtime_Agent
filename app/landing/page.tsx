import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Star,
  Target,
  Shield,
  Clock,
  MessageSquare,
  BarChart3,
  Headphones,
  Globe
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI-Powered Interviews",
      description: "Practice with our advanced AI interviewer that adapts to your responses and provides realistic interview scenarios."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Detailed Analytics",
      description: "Get comprehensive feedback on communication skills, technical knowledge, and areas for improvement."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Role-Specific Practice",
      description: "Customize interviews for specific roles, experience levels, and technology stacks."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere. Our AI interviewer is always ready when you are."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your interview data is encrypted and secure. Practice with confidence knowing your privacy is protected."
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Voice Recognition",
      description: "Natural voice conversations with advanced speech recognition and real-time feedback."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "Sidvia helped me prepare for my Google interview. The AI feedback was incredibly detailed and helped me identify areas I never knew I needed to work on.",
      avatar: "/user-avatar.png",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager at Microsoft",
      content: "The behavioral interview practice was game-changing. I felt so much more confident going into my actual interviews after using Sidvia.",
      avatar: "/user-avatar.png",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist at Netflix",
      content: "I loved how Sidvia adapted to my specific tech stack. The technical questions were spot-on and really prepared me for the real thing.",
      avatar: "/user-avatar.png",
      rating: 5
    }
  ]

  const stats = [
    { label: 'Success Rate', value: '95%', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Interviews Completed', value: '10K+', icon: <Target className="w-6 h-6" /> },
    { label: 'Happy Users', value: '2K+', icon: <Users className="w-6 h-6" /> },
    { label: 'Countries', value: '25+', icon: <Globe className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="btn-primary">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Interview Coaching
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
              Master Your Next
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Job Interview
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Practice with our AI interviewer, get instant feedback, and boost your confidence. 
              Join thousands who&apos;ve landed their dream jobs with Sidvia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary h-14 px-8 text-lg font-semibold max-sm:w-full">
                <Link href="/sign-up" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Start Practicing Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" className="h-14 px-8 text-lg font-semibold">
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full scale-75 opacity-30" />
            <Image
              src="/robot.png"
              alt="AI Interview Assistant"
              width={600}
              height={600}
              className="mx-auto drop-shadow-2xl rounded-2xl relative z-10"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Why Choose Sidvia?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to excel in your next interview
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Sidvia has helped professionals land their dream jobs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-foreground">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of successful candidates who&apos;ve improved their interview skills with Sidvia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary h-14 px-8 text-lg font-semibold max-sm:w-full">
              <Link href="/sign-up">
                <Play className="h-5 w-5 mr-2" />
                Start Your Free Trial
              </Link>
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg font-semibold">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
            
            <div className="text-sm text-muted-foreground">
              © 2025 Sidvia Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage