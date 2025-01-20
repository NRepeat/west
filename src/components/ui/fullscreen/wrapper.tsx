import { useDraggable } from '@dnd-kit/core'
import React, { useContext } from 'react'
import { DragContextState, ItemsId } from './container'
import clsx from 'clsx'

const Wrapper = ({ id, children }: { id: ItemsId, children?: React.ReactNode }) => {
	console.log('id', id)
	const data = useContext(DragContextState)
	const item = data?.coordinates.find((item) => item.id === id)
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useDraggable({
			id,
		})
	const handleStyle = {
		top: `${item?.y}px`,
		left: `${item?.x}px`,
		transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
	} as React.CSSProperties;
	return (
		<div
			className={clsx('absolute z-10 cursor-grab',{"cursor-grabbing": isDragging})}
			{...listeners}
			ref={setNodeRef}
			{...attributes}
			style={handleStyle}
		>
			{children}
		</div>
	)
}

export default Wrapper