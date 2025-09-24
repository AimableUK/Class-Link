// lib/getRole.ts
import { auth } from "@clerk/nextjs/server";

export async function getRole() {
    const { userId, sessionClaims } = await auth();
    return {
        role: (sessionClaims?.metadata as { role?: string })?.role,
        currentUserId: userId
    }
}

