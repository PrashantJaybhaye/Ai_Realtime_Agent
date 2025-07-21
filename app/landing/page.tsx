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
  X
} from 'lucide-react'
import { useState } from 'react'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Dotted Background Pattern */}
      <div className="absolute inset-0 bg-dot-white/[0.2] pointer-events-none" />
      
      {/* Fixed Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground">
                <svg width={32} height={32} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                  <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#10A37F" opacity={0.5} />
                  <path cx={16} cy={16} r={4} fill="#10A37F" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                  <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#10A37F" strokeWidth={2} fill="none" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Sidvia</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Testimonials', 'Pricing'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="btn-primary">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4 border-t border-border/50 mt-4">
              {['Features', 'Testimonials', 'Pricing'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ x: 4 }}
                >
                  {item}
                </motion.a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary w-full">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium"
              variants={scaleIn}
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Interview Coaching
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-5xl mx-auto leading-tight"
              variants={fadeInUp}
            >
              Master Your Next
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Job Interview
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Practice with our AI interviewer, get instant feedback, and boost your confidence. 
              Join thousands who&apos;ve landed their dream jobs with Sidvia.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="btn-primary h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold w-full sm:w-auto">
                  <Link href="/sign-up" className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Start Practicing Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold w-full sm:w-auto">
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full scale-75 opacity-30" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src="/robot.png"
                alt="AI Interview Assistant"
                width={600}
                height={600}
                className="mx-auto drop-shadow-2xl rounded-2xl relative z-10 max-w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center space-y-4"
                variants={scaleIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Why Choose Sidvia?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to excel in your next interview
            </p>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all">
                  <CardContent className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Success Stories</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how Sidvia has helped professionals land their dream jobs
            </p>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="p-6 h-full">
                  <CardContent className="space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.content}"
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Join thousands of successful candidates who&apos;ve improved their interview skills with Sidvia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="btn-primary h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold w-full sm:w-auto">
                <Link href="/sign-up">
                  <Play className="h-5 w-5 mr-2" />
                  Start Your Free Trial
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold w-full sm:w-auto">
                Schedule a Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
            
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Sidvia Inc. All rights reserved.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage