import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const interviewsSnapshot = await db.collection('interviews').orderBy('createdAt', 'desc').get();
    const interviews = interviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { action, interviewId, data } = await request.json();

    if (!interviewId || !action) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    switch (action) {
      case 'delete':
        await db.collection('interviews').doc(interviewId).delete();
        // Also delete related feedback
        const feedbackSnapshot = await db.collection('feedback')
          .where('interviewId', '==', interviewId)
          .get();
        
        const batch = db.batch();
        feedbackSnapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        
        return NextResponse.json({ success: true, message: "Interview deleted successfully" });

      case 'update':
        if (!data) {
          return NextResponse.json(
            { error: "Missing data for update" },
            { status: 400 }
          );
        }
        
        await db.collection('interviews').doc(interviewId).update({
          ...data,
          updatedAt: new Date().toISOString()
        });
        
        return NextResponse.json({ success: true, message: "Interview updated successfully" });

      case 'view':
        const interviewDoc = await db.collection('interviews').doc(interviewId).get();
        if (!interviewDoc.exists) {
          return NextResponse.json(
            { error: "Interview not found" },
            { status: 404 }
          );
        }
        
        return NextResponse.json({ 
          success: true, 
          interview: { id: interviewDoc.id, ...interviewDoc.data() }
        });

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error performing interview action:", error);
    return NextResponse.json(
      { error: "Failed to perform action" },
      { status: 500 }
    );
  }
}