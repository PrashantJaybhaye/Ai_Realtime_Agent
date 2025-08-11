import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action, interviewIds } = await request.json();

    if (!interviewIds || !Array.isArray(interviewIds) || interviewIds.length === 0 || !action) {
      return NextResponse.json(
        { error: "Missing required parameters or empty interview list" },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    const batch = db.batch();

    for (const interviewId of interviewIds) {
      try {
        switch (action) {
          case 'delete':
            // Delete interview
            const interviewRef = db.collection('interviews').doc(interviewId);
            batch.delete(interviewRef);
            
            // Delete related feedback
            const feedbackSnapshot = await db.collection('feedback')
              .where('interviewId', '==', interviewId)
              .get();
            
            feedbackSnapshot.docs.forEach(doc => {
              batch.delete(doc.ref);
            });
            break;

          case 'finalize':
            const finalizeRef = db.collection('interviews').doc(interviewId);
            batch.update(finalizeRef, { 
              finalized: true,
              updatedAt: new Date().toISOString()
            });
            break;

          case 'unfinalize':
            const unfinalizeRef = db.collection('interviews').doc(interviewId);
            batch.update(unfinalizeRef, { 
              finalized: false,
              updatedAt: new Date().toISOString()
            });
            break;

          default:
            throw new Error(`Invalid action: ${action}`);
        }
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to ${action} interview ${interviewId}: ${error}`);
        console.error(`Error ${action} interview ${interviewId}:`, error);
      }
    }

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Bulk ${action} completed`,
      results
    });

  } catch (error) {
    console.error("Error performing bulk interview action:", error);
    return NextResponse.json(
      { error: "Failed to perform bulk action" },
      { status: 500 }
    );
  }
}