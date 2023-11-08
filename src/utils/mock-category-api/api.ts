import type {NextRequest, NextResponse} from 'next/server'
import type {Category} from './common'
import {COOKIE_NAME} from './common'

export const getCategories = (req: NextRequest): Array<Category> => {
    // we store all data in cookies for demo purposes
    const cookie = req.cookies.get(COOKIE_NAME)
    if (cookie) {
        const categories: Array<Category> = JSON.parse(cookie.value)
        return categories.sort((a, b) => a.order - b.order)
    }
    return []
}

export const saveCategories = (res: NextResponse, categories: Array<Category>) => {
    res.cookies.set(COOKIE_NAME, JSON.stringify(categories), {
        path: '/',
    })
    return res
}