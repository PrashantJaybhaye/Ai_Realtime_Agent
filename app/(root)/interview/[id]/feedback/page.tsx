import { Button } from '@/components/ui/button';
import UserError from '@/components/UserError';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import dayjs from 'dayjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { 
  Star, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target, 
  BarChart3, 
  ArrowLeft, 
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect('/');
  if (!user) return <UserError />;

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-4 h-4" />;
    if (score >= 60) return <BarChart3 className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/20 rounded-full text-primary text-sm font-medium">
          <Award className="w-4 h-4" />
          Interview Complete
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Interview Feedback Report
        </h1>
        
        <p className="text-lg text-muted-foreground capitalize">
          {interview.role} Developer Position
        </p>
      </div>

      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-3xl border border-border/50 p-8 text-center backdrop-blur-sm">
        <div className="space-y-6">
          {/* Score Display */}
          <div className="space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center ${getScoreColor(feedback?.totalScore || 0)}`}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{feedback?.totalScore || 0}</div>
                  <div className="text-sm opacity-70">/ 100</div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                {getScoreIcon(feedback?.totalScore || 0)}
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-foreground">Overall Performance</h2>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-medium">Score: {feedback?.totalScore || 0}/100</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-medium">
                {feedback?.createdAt
                  ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Assessment */}
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Overall Assessment</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {feedback?.finalAssessment || "No assessment available."}
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Performance Breakdown</h3>
        </div>
        
        <div className="grid gap-4">
          {feedback?.categoryScores?.map((category, index) => (
            <div key={index} className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{category.name}</h4>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getScoreColor(category.score)}`}>
                  {getScoreIcon(category.score)}
                  {category.score}/100
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    category.score >= 80 ? 'bg-green-400' :
                    category.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${category.score}%` }}
                />
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {category.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-green-500/5 backdrop-blur-sm rounded-2xl border border-green-500/20 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Key Strengths</h3>
          </div>
          <ul className="space-y-3">
            {feedback?.strengths?.map((strength, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-orange-500/5 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-foreground">Areas for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {feedback?.areasForImprovement?.map((area, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button variant="outline" className="flex-1 h-12" asChild>
          <Link href="/" className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </Button>

        <Button className="flex-1 h-12 bg-primary hover:bg-primary/90" asChild>
          <Link href={`/interview/${id}`} className="flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Retake Interview
          </Link>
        </Button>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-500/5 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-foreground">Next Steps</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Practice More:</h4>
            <p className="text-muted-foreground">Take additional mock interviews to improve your confidence and performance.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Focus Areas:</h4>
            <p className="text-muted-foreground">Work on the improvement areas highlighted in your feedback for better results.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page