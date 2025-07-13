import { auth, db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get user statistics
    const listUsersResult = await auth.listUsers(1000);
    const users = listUsersResult.users;

    const totalUsers = users.length;
    const activeUsers = users.filter(user => !user.disabled).length;
    const disabledUsers = users.filter(user => user.disabled).length;
    
    // Calculate new users this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersThisWeek = users.filter(user => 
      new Date(user.metadata.creationTime) > weekAgo
    ).length;

    // Get interview statistics
    const interviewsSnapshot = await db.collection('interviews').get();
    const totalInterviews = interviewsSnapshot.size;

    // Get feedback statistics
    const feedbackSnapshot = await db.collection('feedback').get();
    const totalFeedback = feedbackSnapshot.size;

    // Calculate average scores
    const feedbackDocs = feedbackSnapshot.docs.map(doc => doc.data());
    const averageScore = feedbackDocs.length > 0 
      ? feedbackDocs.reduce((sum, feedback) => sum + (feedback.totalScore || 0), 0) / feedbackDocs.length
      : 0;

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        disabled: disabledUsers,
        newThisWeek: newUsersThisWeek
      },
      interviews: {
        total: totalInterviews
      },
      feedback: {
        total: totalFeedback,
        averageScore: Math.round(averageScore)
      }
    });

  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}