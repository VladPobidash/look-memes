import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontSize: {
            xxs: ['11px', '12px'],
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-satoshi)'],
            },
            boxShadow: {
                button: '0 4px 7px rgba(0, 0, 0, 0.08)'
            }
        },
    },
    plugins: [],
}
export default config
