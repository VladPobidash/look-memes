import React, {CSSProperties, useEffect, useState} from 'react'
import {useController, useForm} from 'react-hook-form'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import AppToggle from '@/components/AppToggle'
import SvgIcon from '@/components/SvgIcon'
import {Category} from '@/utils/mock-category-api/common'

interface Props {
    category: Category
    onSubmit: (category: Category) => void
    onToggle: (id: string) => void
    onDelete: (id: string, deleteDraft?: boolean) => void
}

export default function SortableCategory({category, onSubmit, onToggle, onDelete}: Props) {
    const {id, name, enabled, isNew} = category
    const [isEditing, setIsEditing] = useState(false)

    const {control, setFocus} = useForm({mode: 'onChange'})

    const {field, fieldState,} = useController({
        control,
        name: 'name',
        defaultValue: name,
        rules: {
            required: 'Please enter category name',
            minLength: {
                value: 2,
                message: 'Please enter at least 2 characters'
            }
        }
    })

    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({id})

    const style: CSSProperties = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Translate.toString(transform),
        transition
    }

    useEffect(() => {
        if (isNew) setIsEditing(true)
    }, [isNew])

    useEffect(() => {
        if (isEditing) setFocus('name')
    }, [isEditing, setFocus])

    const handleDoubleClick = () => {
        if (!enabled) return
        setIsEditing(true)
    }

    const handleBlur = () => {
        setIsEditing(false)

        if (!field.value && !name) onDelete(id, true)
        else if (!fieldState.invalid) onSubmit({...category, name: field.value})
    }

    return (
        <li ref={setNodeRef} style={style}
            className="flex justify-between items-center px-5 py-3 text-sm rounded border-2 border-[#323443]">
            <div className="pr-7" onDoubleClick={handleDoubleClick}>
                {
                    isEditing
                        ? <input
                            {...field}
                            onBlur={handleBlur}
                            autoComplete="off"
                            placeholder="Enter Category Name"
                            className="outline-none bg-transparent placeholder:text-[#696969]"
                        />
                        : <span style={{color: enabled ? '#FFF' : '#696969'}}>{field.value}</span>
                }
                <p className="text-xxs text-[#FF5B5B]">{fieldState.error?.message}</p>
            </div>
            <div className="flex space-x-5">
                <AppToggle enabled={category.enabled} onChange={() => onToggle(id)}/>
                <SvgIcon name="delete" width={26} height={26} alt="delete-icon"
                         onClick={() => onDelete(id)}/>
                <button {...attributes} {...listeners} ref={setActivatorNodeRef}>
                    <SvgIcon className="cursor-grab" name="drag" width={8} height={14} alt="sort-icon"/>
                </button>
            </div>
        </li>
    )
}
