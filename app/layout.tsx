import type { Metadata } from 'next'
import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import Providers from './providers'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: {
        default: 'Online Asset Management',
        template: '%s | OAM',
    },
    description: 'Online Asset Management',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
