'use client'

import {useRouter} from 'next/navigation'
import AppButton from '@/components/AppButton'

export default function Home() {
    const router = useRouter()

    return (
        <div className="h-screen flex justify-center items-center">
            <AppButton className="w-6/12" text="Navigate to Categories" color="#884DFE"
                       onClick={() => router.push('/categories')}/>
        </div>
    )
}