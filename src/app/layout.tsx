import type {Metadata} from 'next'
import localFont from 'next/font/local'
import AppHeader from '@/app/components/AppHeader'
import './globals.css'

const satoshi = localFont({
    src: [
        {
            path: '../../public/fonts/satoshi/Satoshi-Regular.woff',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../../public/fonts/satoshi/Satoshi-Medium.woff',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../../public/fonts/satoshi/Satoshi-Bold.woff',
            weight: '700',
            style: 'bold'
        },
    ],
    variable: '--font-satoshi'
})

export const metadata: Metadata = {
    title: 'Look memes',
    description: 'The best NFTs',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={satoshi.className}>
        <AppHeader/>
        {children}
        </body>
        </html>
    )
}
