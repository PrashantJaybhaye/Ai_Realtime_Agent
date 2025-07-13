import { auth } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action, userId } = await request.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    switch (action) {
      case 'disable':
        await auth.updateUser(userId, { disabled: true });
        return NextResponse.json({ success: true, message: "User disabled successfully" });

      case 'enable':
        await auth.updateUser(userId, { disabled: false });
        return NextResponse.json({ success: true, message: "User enabled successfully" });

      case 'delete':
        await auth.deleteUser(userId);
        return NextResponse.json({ success: true, message: "User deleted successfully" });

      case 'view':
        const userRecord = await auth.getUser(userId);
        return NextResponse.json({ 
          success: true, 
          user: {
            uid: userRecord.uid,
            email: userRecord.email,
            disabled: userRecord.disabled,
            emailVerified: userRecord.emailVerified,
            metadata: userRecord.metadata,
            customClaims: userRecord.customClaims
          }
        });

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error performing user action:", error);
    return NextResponse.json(
      { error: "Failed to perform action" },
      { status: 500 }
    );
  }
}