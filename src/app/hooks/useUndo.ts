import {useState} from 'react'
import {Category} from '@/utils/mock-category-api/common'

export default function useUndo() {
    const [hasChanges, setHasChanges] = useState(false)
    const [items, setItems] = useState<Array<Category>>([])
    const [copy, setCopy] = useState<Array<Category>>([])
    const onChange = () => {
        if (copy.length) return

        setHasChanges(true)
        setCopy(JSON.parse(JSON.stringify(items)))
    }

    const saveChanges = () => {
        setCopy([])
        setHasChanges(false)
    }

    const cancelChanges = () => {
        if (!copy.length) return

        setItems(copy)
        setCopy([])
        setHasChanges(false)
    }

    return {
        items,
        setItems,
        hasChanges,
        onChange,
        saveChanges,
        cancelChanges,
    }
}