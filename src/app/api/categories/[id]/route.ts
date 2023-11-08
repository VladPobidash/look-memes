import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {createEdgeRouter} from 'next-connect'
import {getCategories, saveCategories} from '@/utils/mock-category-api/api'
import {logRequest} from '@/utils/mock-category-api/middleware'
import {Category, validateCategory} from '@/utils/mock-category-api/common'

interface RequestContext {
    params: {
        id: string;
    };
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.use(logRequest)

router
    .put(async (req, {params: {id}}) => {
        const categories = getCategories(req)
        const index = categories.findIndex(c => c.id === id)

        const body = await req.json() as Category
        validateCategory(body)

        categories[index] = body

        const res = NextResponse.json(body)
        saveCategories(res, categories)

        return res
    })
    .delete((req, {params: {id}}) => {
        const categories = getCategories(req)
        const index = categories.findIndex(c => c.id === id)

        if (index === -1) {
            return NextResponse.json({error: 'Category not found'}, {status: 404})
        }

        const res = NextResponse.json({message: 'Category has been deleted.'}, {status: 200})
        saveCategories(res, categories.filter(c => c.id !== id))

        return res
    })

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}