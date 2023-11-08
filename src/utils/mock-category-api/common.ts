export const COOKIE_NAME = 'nc_categories'

export type Category = {
    id: string
    name: string
    enabled: boolean
    order: number
    isNew?: boolean
}

export const validateCategory = (category: Category) => {
    category.name = category.name.trim()
    if (!category.name) throw new Error('Name cannot be empty')
    if (category.name.length < 2) throw new Error('Name should include at least 2 characters')
}