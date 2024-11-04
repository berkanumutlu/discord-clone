"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { useModal } from '@/hooks/use-modal-store';

interface HomeClientProps {
    serverUrl: string | null;
}

export default function Home({ serverUrl }: HomeClientProps) {
    const router = useRouter();
    const { theme } = useTheme();
    const { isSignedIn } = useAuth();
    const { onOpen } = useModal();
    const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? '/sign-in';

    useEffect(() => {
        if (!isSignedIn) {
            router.push(signInUrl);
        }
    }, [isSignedIn, router, signInUrl]);

    if (!isSignedIn) {
        return null;
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className='flex items-center gap-3'>
                    <Image
                        src={
                            theme === 'dark'
                                ? '/logo/full-logo-lockup-small/small_logo_white_RGB.svg'
                                : '/logo/full-logo-lockup-small/small_logo_blurple_RGB.svg'
                        }
                        alt="Discord Clone logo"
                        width={180}
                        height={38}
                        priority
                    />
                    <span className='text-[#5865F2] dark:text-[#FDFEFF]'>Clone</span>
                </div>
                <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2">
                        Get started by editing{" "}
                        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                            src/app/page.tsx
                        </code>
                        .
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        href={serverUrl || "#"}
                        onClick={(e) => {
                            if (!serverUrl || serverUrl === '#') {
                                e.preventDefault();
                                onOpen("createServer");
                            }
                        }}
                    >
                        <Image
                            className="dark:invert"
                            src="https://nextjs.org/icons/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        {!serverUrl || serverUrl === '#' ? 'Create your first server' : 'Start now'}
                    </a>
                    <a
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                        href="https://github.com/berkanumutlu/discord-clone"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github Repo
                    </a>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}