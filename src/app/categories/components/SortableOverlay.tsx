import type {PropsWithChildren} from 'react'
import type {DropAnimation} from '@dnd-kit/core'
import {defaultDropAnimationSideEffects, DragOverlay} from '@dnd-kit/core'

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.4'
            }
        }
    })
}

interface Props {
}

export default function SortableOverlay({children}: PropsWithChildren<Props>) {
    return (
        <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
    )
}
