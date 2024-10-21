import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = async () => {
    const { userId } = auth();
    if (!userId) return null;
    return await db.profile.findUnique({ where: { userId } });
}