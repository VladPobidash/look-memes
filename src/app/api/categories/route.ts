import {getCategories, saveCategories} from '@/utils/mock-category-api/api'
import {validateCategory} from '@/utils/mock-category-api/common'
import {logRequest} from '@/utils/mock-category-api/middleware'
import {createEdgeRouter} from 'next-connect'
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

const router = createEdgeRouter<NextRequest, { params?: unknown }>()

router.use(logRequest)

router
    .get((req) => {
        const categories = getCategories(req)
        return NextResponse.json({categories})
    })
    .post(async (req) => {
        const categories = getCategories(req)
        const newCategory = await req.json()

        validateCategory(newCategory)
        categories.splice(0, 0, newCategory)

        const res = NextResponse.json(newCategory)
        saveCategories(res, categories)

        return res
    })

export async function GET(request: NextRequest, ctx: { params?: unknown }) {
    return router.run(request, ctx) as Promise<void | Response>
}

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
    return router.run(request, ctx) as Promise<void | Response>
}