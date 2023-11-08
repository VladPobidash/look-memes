import type {ReactNode} from 'react'
import React, {useMemo, useState} from 'react'
import type {Active, UniqueIdentifier} from '@dnd-kit/core'
import {DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'
import {arrayMove, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import SortableOverlay from '@/app/categories/components/SortableOverlay'

interface BaseItem {
    id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
    items: T[];

    onChange(items: T[]): void;

    renderItem(item: T): ReactNode;
}

export default function SortableCategories<T extends BaseItem>({
                                                                   items,
                                                                   onChange,
                                                                   renderItem
                                                               }: Props<T>) {
    const [active, setActive] = useState<Active | null>(null)

    const activeItem = useMemo(
        () => items.find((item) => item.id === active?.id),
        [active, items]
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({active}) => {
                setActive(active)
            }}
            onDragEnd={({active, over}) => {
                if (over && active.id !== over?.id) {
                    const activeIndex = items.findIndex(({id}) => id === active.id)
                    const overIndex = items.findIndex(({id}) => id === over.id)

                    onChange(arrayMove(items, activeIndex, overIndex))
                }
                setActive(null)
            }}
            onDragCancel={() => {
                setActive(null)
            }}
        >
            <SortableContext items={items}>
                <ul className="list-none space-y-3 my-3" role="application">
                    {items.map((item) => (
                        <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
                    ))}
                </ul>
            </SortableContext>
            <SortableOverlay>
                {activeItem ? renderItem(activeItem) : null}
            </SortableOverlay>
        </DndContext>
    )
}
