import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import HomeClient from './client-page';

export default async function Home() {
    const profile = await currentProfile();
    if (!profile) return null;
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    let serverUrl = "";
    if (server) {
        serverUrl = `/servers/${server.id}`;
    }

    return <HomeClient serverUrl={serverUrl} />;
}