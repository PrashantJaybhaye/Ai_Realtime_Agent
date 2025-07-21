'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Target,
  Award,
  Shield,
  Clock,
  MessageSquare,
  BarChart3,
  Headphones,
  Globe,
  Menu,
  X,
  Rocket,
  Brain,
  Lightbulb,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Technology",
      description: "Cutting-edge artificial intelligence that understands context, provides personalized feedback, and adapts to your unique interview style and industry requirements."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Comprehensive Analytics",
      description: "Deep performance insights with detailed breakdowns of communication skills, technical knowledge, confidence levels, and personalized improvement recommendations."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Industry-Specific Training",
      description: "Tailored interview scenarios for tech, finance, healthcare, consulting, and more. Practice with role-specific questions and industry best practices."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Practice whenever inspiration strikes. Our AI interviewer is available around the clock, accommodating your schedule and time zone preferences."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and privacy protection. Your interview data is secure, confidential, and never shared with third parties."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Career Acceleration",
      description: "Fast-track your career growth with proven interview techniques, confidence building exercises, and success strategies from industry leaders."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      content: "Sidvia transformed my interview approach completely. The AI feedback was incredibly detailed and helped me identify blind spots I never knew existed. Landed my dream role at Google within 3 weeks of using the platform.",
      avatar: "/user-avatar.png",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      company: "Microsoft",
      content: "The behavioral interview practice was a game-changer. Sidvia's AI understood the nuances of product management interviews and helped me craft compelling stories that resonated with hiring managers.",
      avatar: "/user-avatar.png",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "Netflix",
      content: "What impressed me most was how Sidvia adapted to my specific tech stack and experience level. The technical questions were challenging yet fair, perfectly preparing me for real-world scenarios.",
      avatar: "/user-avatar.png",
      rating: 5
    }
  ]

  const stats = [
    { label: 'Success Rate', value: '97%', icon: <TrendingUp className="w-8 h-8" />, description: 'Interview success rate' },
    { label: 'Interviews Completed', value: '50K+', icon: <Target className="w-8 h-8" />, description: 'Practice sessions conducted' },
    { label: 'Career Transitions', value: '5K+', icon: <Users className="w-8 h-8" />, description: 'Successful job placements' },
    { label: 'Global Reach', value: '40+', icon: <Globe className="w-8 h-8" />, description: 'Countries served' }
  ]

  const companies = [
    { name: 'Google', logo: '/covers/google.png' },
    { name: 'Microsoft', logo: '/covers/microsoft.png' },
    { name: 'Amazon', logo: '/covers/amazon.png' },
    { name: 'Netflix', logo: '/covers/netflix.png' },
    { name: 'Meta', logo: '/covers/facebook.png' },
    { name: 'Apple', logo: '/covers/apple.png' }
  ]

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Dotted Background Pattern */}
      <div className="absolute inset-0 bg-dot-white/[0.2] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Fixed Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary-foreground shadow-lg">
                <svg width={40} height={40} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                  <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                  <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                  <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={2} fill="none" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-foreground">Sidvia</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {['Features', 'Testimonials', 'Pricing', 'About'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-lg font-medium"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" asChild className="text-lg">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="btn-primary text-lg px-8 py-3 h-12">
                  <Link href="/sign-up">Get Started Free</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="py-6 space-y-6 border-t border-border/50 mt-6">
              {['Features', 'Testimonials', 'Pricing', 'About'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors text-lg font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ x: 4 }}
                >
                  {item}
                </motion.a>
              ))}
              <div className="flex flex-col gap-4 pt-6">
                <Button variant="ghost" asChild className="w-full text-lg h-12">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary w-full text-lg h-12">
                  <Link href="/sign-up">Get Started Free</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section - Increased Height */}
      <section className="pt-40 pb-32 px-6 lg:px-12 relative min-h-screen flex items-center">
        <div className="max-w-8xl mx-auto w-full">
          <motion.div 
            className="text-center space-y-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-3 rounded-full text-primary text-lg font-semibold border border-primary/20"
              variants={scaleIn}
            >
              <Sparkles className="w-5 h-5" />
              AI-Powered Interview Revolution
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground max-w-6xl mx-auto leading-tight"
              variants={fadeInUp}
            >
              Land Your Dream Job with
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI Interview Mastery
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Transform your interview skills with personalized AI coaching. Practice realistic scenarios, 
              receive instant feedback, and build unshakeable confidence for any interview situation.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="btn-primary h-16 px-12 text-xl font-bold w-full sm:w-auto shadow-2xl">
                  <Link href="/sign-up" className="flex items-center gap-3">
                    <Play className="h-6 w-6" />
                    Start Free Trial
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="h-16 px-12 text-xl font-semibold w-full sm:w-auto border-2">
                  <Lightbulb className="h-6 w-6 mr-3" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              className="pt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-sm font-medium">Discover More</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image - Enhanced */}
          <motion.div 
            className="mt-24 relative"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl rounded-full scale-75 opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl rounded-full scale-90 opacity-30" />
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10"
            >
              <Image
                src="/robot.png"
                alt="AI Interview Assistant"
                width={800}
                height={800}
                className="mx-auto drop-shadow-2xl rounded-3xl relative z-10 max-w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-24 px-6 lg:px-12 bg-muted/10 relative">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            className="text-center space-y-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl text-muted-foreground font-medium">
              Trusted by professionals at leading companies worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
              {companies.map((company, index) => (
                <motion.div
                  key={company.name}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-2xl font-bold text-muted-foreground">
                    {company.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-32 px-6 lg:px-12 relative">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center space-y-6"
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-primary shadow-lg">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="py-32 px-6 lg:px-12 bg-muted/5 relative">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            className="text-center space-y-8 mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Why Industry Leaders Choose Sidvia
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Advanced AI technology meets proven interview methodologies to deliver 
              unparalleled preparation experiences
            </p>
          </motion.div>
          
          <motion.div 
            className="grid lg:grid-cols-3 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="p-10 h-full hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="space-y-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-primary shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section id="testimonials" className="py-32 px-6 lg:px-12 relative">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            className="text-center space-y-8 mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Success Stories That Inspire
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Real professionals, real results. See how Sidvia has transformed careers 
              across industries and experience levels
            </p>
          </motion.div>
          
          <motion.div 
            className="grid lg:grid-cols-3 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="p-10 h-full hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="space-y-8">
                    <div className="flex gap-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed text-lg">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-border"
                      />
                      <div>
                        <div className="font-bold text-foreground text-lg">{testimonial.name}</div>
                        <div className="text-primary font-semibold">{testimonial.role}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 relative">
        <div className="absolute inset-0 bg-dot-white/[0.1] pointer-events-none" />
        <motion.div 
          className="max-w-6xl mx-auto text-center space-y-12 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            Join thousands of successful professionals who&apos;ve accelerated their careers with Sidvia. 
            Start your journey to interview mastery today.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="btn-primary h-16 px-12 text-xl font-bold w-full sm:w-auto shadow-2xl">
                <Link href="/sign-up">
                  <Rocket className="h-6 w-6 mr-3" />
                  Start Your Free Trial
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="h-16 px-12 text-xl font-semibold w-full sm:w-auto border-2">
                <MessageSquare className="h-6 w-6 mr-3" />
                Schedule a Demo
              </Button>
            </motion.div>
          </div>
          
          {/* Trust Indicators */}
          <motion.div 
            className="pt-16 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-16 px-6 lg:px-12 relative">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary-foreground shadow-lg">
                <svg width={40} height={40} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                  <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                  <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                  <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={2} fill="none" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-foreground">Sidvia</span>
            </div>
            
            <div className="text-lg text-muted-foreground text-center md:text-left">
              © 2025 Sidvia Inc. Empowering careers through AI innovation.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage