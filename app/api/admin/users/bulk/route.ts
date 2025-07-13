import { auth } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action, userIds } = await request.json();

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !action) {
      return NextResponse.json(
        { error: "Missing required parameters or empty user list" },
        { status: 400 }
      );
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const userId of userIds) {
      try {
        switch (action) {
          case 'disable':
            await auth.updateUser(userId, { disabled: true });
            break;

          case 'enable':
            await auth.updateUser(userId, { disabled: false });
            break;

          case 'delete':
            await auth.deleteUser(userId);
            break;

          default:
            throw new Error(`Invalid action: ${action}`);
        }
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to ${action} user ${userId}: ${error}`);
        console.error(`Error ${action} user ${userId}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Bulk ${action} completed`,
      results
    });

  } catch (error) {
    console.error("Error performing bulk user action:", error);
    return NextResponse.json(
      { error: "Failed to perform bulk action" },
      { status: 500 }
    );
  }
}