'use client'

import Image from 'next/image'
import React, {useState} from 'react'
import useQueryParams from '@/app/hooks/useQueryParams'

export default function AppHeader() {
    const {setQueryParams, queryParams} = useQueryParams<{
        searchQuery?: string;
    }>()
    const [searchQuery, setSearchQuery] = useState(queryParams.get('searchQuery') || '')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        console.log(e.target.value)
        setQueryParams({searchQuery: e.target.value})
    }

    return (
        <header className="sticky top-0 z-10 bg-[#1E1E27] border-b border-[#313442]">
            <div className="container mx-auto flex justify-between items-center py-[18px] px-4 sm:px-0">
                <div className="flex items-center">
                    <Image width={78} height={30} className="h-[30px]" src="../../images/logo.svg" alt="app-logo"/>
                    <span className="hidden sm:inline ml-2.5 font-bold text-[32px] leading-7 text-white">Memes</span>
                </div>
                <label className="relative h-10 w-3/6 md:w-[380px]">
                    <input
                        value={searchQuery}
                        onChange={handleChange}
                        className="w-full h-full px-5 py-2.5 bg-[#30313C] rounded outline-none placeholder:text-[#9B9D9F]"
                        type="text"
                        placeholder="Search"/>
                    <Image className="absolute right-5 top-1/2 -translate-y-1/2" width={20} height={20}
                           src="../../icons/search.svg"
                           alt="search-icon"/>
                </label>
            </div>
        </header>
    )
}