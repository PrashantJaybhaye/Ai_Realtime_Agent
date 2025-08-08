import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import {
  getInterviewByUserId,
  getFeedbackByInterviewId
} from '@/lib/actions/general.action';
import UserError from '@/components/UserError';
import InterviewCard from '@/components/InterviewCard';
import {
  BarChart3,
  TrendingUp,
  Award,
  Filter,
  Search,
  Star,
  Target,
  ArrowRight,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { ActionButtonProvider } from '@/contexts/ActionButtonContext';

const FeedbackPage = async () => {
  const user = await getCurrentUser();
  if (!user) return <UserError />;

  const userInterviews = await getInterviewByUserId(user.id);
  if (!userInterviews || userInterviews.length === 0) {
    return (
      <div className="space-y-8">
        <section className="text-center py-16 space-y-6">
          <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">No interviews completed yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Complete your first interview to start tracking your progress and receiving detailed AI feedback.
            </p>
            <Button asChild className="btn-primary">
              <Link href="/interview" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Start Your First Interview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const completedInterviews = userInterviews.filter(interview => interview.finalized);
  const interviewsWithFeedback = await Promise.all(
    completedInterviews.map(async (interview) => {
      const feedback = await getFeedbackByInterviewId({
        interviewId: interview.id,
        userId: user.id
      });
      return { ...interview, feedback };
    })
  );

  const totalInterviews = completedInterviews.length;
  const interviewsWithValidFeedback = interviewsWithFeedback.filter(
    interview => interview.feedback?.totalScore !== undefined && interview.feedback?.totalScore !== null
  );
  const feedbackScores = interviewsWithValidFeedback.map(interview => interview.feedback!.totalScore);
  const averageScore = feedbackScores.length > 0
    ? Math.round(feedbackScores.reduce((sum, score) => sum + score, 0) / feedbackScores.length)
    : 0;
  const highestScore = feedbackScores.length > 0
    ? Math.max(...feedbackScores)
    : 0;

  return (
    <div className="space-y-16 md:space-y-24 lg:space-y-32">
      {/* Header */}
      <section className="text-center space-y-8 md:space-y-12 pt-8 md:pt-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full text-primary text-sm font-medium shadow-sm">
          <BarChart3 className="w-4 h-4" />
          Performance Analytics
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Your Interview<br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Feedback History
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
          Track your progress, review detailed feedback, and identify areas for improvement across all your practice sessions.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <StatsCard icon={<Target />} title="Total Interviews" value={totalInterviews} subtitle="All time" color="blue" />
        <StatsCard icon={<TrendingUp />} title="Average Score" value={averageScore} subtitle={feedbackScores.length > 0 ? 'Out of 100' : 'No scores yet'} color="green" suffix="%" />
        <StatsCard icon={<Award />} title="High Scores" value={highestScore} subtitle="points" color="purple" />
        <StatsCard icon={<BarChart3 />} title="Feedback Received" value={feedbackScores.length} subtitle="With feedback" color="yellow" />
      </section>

      {/* Filters & Actions */}
      <section className="flex flex-col sm:flex-row gap-6 items-center justify-between mt-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">Interview History</h2>
          <p className="text-sm text-muted-foreground">
            {totalInterviews} interview{totalInterviews !== 1 ? 's' : ''} completed, {feedbackScores.length} with feedback
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="w-4 h-4" /> Search
          </Button>
        </div>
      </section>

      {/* Interview Cards */}
      <ActionButtonProvider>
        <section className="space-y-8 mt-2">
          {interviewsWithFeedback.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interviewsWithFeedback.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-8">
              <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">No feedback history yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Complete your first interview to start tracking your progress and receiving detailed AI feedback.
                </p>
                <Button asChild className="btn-primary">
                  <Link href="/" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Start Your First Interview
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      </ActionButtonProvider>

      {/* Motivation Section */}
      {completedInterviews.length > 0 && (
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-border/50 mt-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Keep Improving!</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your interview skills are developing well. Continue practicing to achieve even better results and boost your confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
              <Button asChild size="lg" className="gap-2 text-base font-medium">
                <Link href="/interview">Take Another Interview</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-base font-medium border-muted hover:border-primary">View Performance Tips</Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

type StatsCardProps = {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  subtitle: string;
  color?: string;
  suffix?: string;
};

const StatsCard = ({
  icon,
  title,
  value,
  subtitle,
  color = 'blue',
  suffix = ''
}: StatsCardProps) => {
  const bg = `${color}-500/10`;
  const text = `${color}-500`;

  return (
    <div className="stats-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className={`stats-icon bg-${bg} text-${text} group-hover:bg-${color}-500/20 transition-colors`}>
        {icon}
      </div>
      <div className="text-3xl mb-2 font-extrabold bg-gradient-to-b from-neutral-50 to-neutral-600 text-transparent bg-clip-text">
        {value}{suffix && <span className="text-base text-muted-foreground ml-1">{suffix}</span>}
      </div>
      <div className="text-base font-medium text-muted-foreground">{title}</div>
      <div className={`text-sm text-${text} mt-1`}>{subtitle}</div>
    </div>
  );
};

export default FeedbackPage;