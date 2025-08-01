import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";

const monaSans = Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ["latin"],
    display: "swap",
    preload: true,
});


export const metadata: Metadata = {
    title: "Sidvia",
    description: "Sidvia is a smart, voice-interactive interview simulator that uses real-time AI to conduct mock interviews and provide instant feedback.",
    keywords: "interview preparation, AI interviewer, mock interviews, job interview practice",
    authors: [{ name: "Sidvia Team" }],
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="icon" type="image/svg+xml" href="favicon.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
                <meta name="theme-color" content="#00E676" />
            </head>
            <body
                className={`${monaSans.className} antialiased`}
            >
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                    <Toaster />
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
