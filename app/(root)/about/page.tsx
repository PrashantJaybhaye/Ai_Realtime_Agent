import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/actions/auth.action'
import UserError from '@/components/UserError'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Target, 
  Users, 
  Award, 
  Zap,
  Heart,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react'

const AboutPage = async () => {
  const user = await getCurrentUser()
  if (!user) return <UserError />

  const stats = [
    { label: 'Interviews Completed', value: '5,000+', icon: <Target className="w-6 h-6" /> },
    { label: 'Success Rate', value: '95%', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Happy Users', value: '1,000+', icon: <Users className="w-6 h-6" /> },
    { label: 'Countries Served', value: '10+', icon: <Globe className="w-6 h-6" /> }
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Empowerment',
      description: 'We believe everyone deserves the confidence to succeed in their career journey.'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: 'Innovation',
      description: 'Cutting-edge AI technology that adapts to your unique learning style and needs.'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: 'Trust',
      description: 'Your privacy and data security are our top priorities in everything we do.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: 'Excellence',
      description: 'We strive for the highest quality in our AI feedback and user experience.'
    }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former Google recruiter with 10+ years of hiring experience.',
      image: '/user-avatar.png'
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and former Microsoft engineer specializing in NLP.',
      image: '/user-avatar.png'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      bio: 'Product leader with expertise in user experience and career development.',
      image: '/user-avatar.png'
    },
    {
      name: 'David Kim',
      role: 'Lead AI Engineer',
      bio: 'Machine learning expert focused on conversational AI and feedback systems.',
      image: '/user-avatar.png'
    }
  ]

  return (
    <div className="space-y-20 md:space-y-28 lg:space-y-36">
      {/* Hero Section */}
      <section className="text-center space-y-10 md:space-y-14 pt-10 md:pt-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full text-primary text-sm font-medium shadow-sm">
            <Star className="w-4 h-4" />
            About Sidvia
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Revolutionizing Interview
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Preparation with AI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-2">
            We&apos;re on a mission to democratize interview success by providing personalized, 
            AI-powered coaching that adapts to your unique strengths and areas for improvement.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Button asChild className="btn-primary h-12 px-8 text-base font-semibold max-sm:w-full">
            <Link href="/interview">
              Try Sidvia Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" className="h-12 px-8 text-base font-semibold">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Sidvia, we believe that everyone deserves the opportunity to showcase their best self 
              in interviews. Traditional interview preparation is often expensive, time-consuming, and 
              one-size-fits-all.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">
              That&apos;s why we created an AI-powered platform that provides personalized, real-time feedback 
              and coaching, making high-quality interview preparation accessible to everyone, everywhere.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-foreground">Personalized AI coaching for every user</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-foreground">Real-time feedback and improvement suggestions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-foreground">Accessible and affordable for everyone</span>
            </div>
          </div>
        </div>
        <div className="relative mt-10 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
          <Image
            src="/robot.png"
            alt="AI Interview Assistant"
            width={500}
            height={500}
            className="relative rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-14">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do and shape how we build products for our users.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re a diverse team of engineers, designers, and career experts passionate about helping people succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-border"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 border border-border/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                Powered by AI
              </div>
              <h2 className="text-3xl font-bold text-foreground">Advanced AI Technology</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our proprietary AI models are trained on thousands of successful interviews across 
                various industries and roles, providing you with insights that are both comprehensive 
                and personalized.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Natural Language Processing</h4>
                  <p className="text-muted-foreground text-sm">Advanced NLP analyzes your responses for clarity, structure, and content quality.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Real-time Feedback</h4>
                  <p className="text-muted-foreground text-sm">Get instant insights and suggestions during your practice sessions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Adaptive Learning</h4>
                  <p className="text-muted-foreground text-sm">Our AI learns from your progress and adapts to your unique learning style.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-10 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl rounded-full" />
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">AI Analysis Active</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-4/5 animate-pulse" />
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-3/5 animate-pulse" />
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-5/6 animate-pulse" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Processing speech patterns, analyzing content structure, generating personalized feedback...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 mt-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Ready to Transform Your Interview Skills?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          Join thousands of professionals who&apos;ve already improved their interview performance with Sidvia&apos;s AI-powered coaching.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <Button asChild className="btn-primary h-12 px-8 text-base font-semibold max-sm:w-full">
            <Link href="/interview">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 px-8 text-base font-semibold">
            <Link href="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage