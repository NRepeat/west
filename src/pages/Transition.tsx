import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
	DndContext,
	useDraggable,
	useSensor,
	MouseSensor,
	TouchSensor,
	KeyboardSensor,
	PointerActivationConstraint,
	Modifiers,
	useSensors,
	type DragPendingEvent,
	useDndMonitor,
} from '@dnd-kit/core';

import type { Coordinates } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Axis, Draggable, Wrapper } from './drag/components';
import clsx from 'clsx';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import Porsche from '@/components/Models/Porshe';
import { AmbientLight } from 'three';

const defaultCoordinates = {
	x: 0,
	y: 0,
};
interface Props {
	activationConstraint?: PointerActivationConstraint;
	axis?: Axis;
	handle?: boolean;
	modifiers?: Modifiers;
	buttonStyle?: React.CSSProperties;
	style?: React.CSSProperties;
	label?: string;
	showConstraintCue?: boolean;
}
export default function Transition({
	activationConstraint,
	axis,
	handle,
	label = 'Go ahead, drag me.',
	modifiers,
	style,
	buttonStyle,
	showConstraintCue,
}: Props) {
	const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint,
	});

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint,
	});
	const keyboardSensor = useSensor(KeyboardSensor, {});
	const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
	const Item = DraggableItem;

	return (
		<div className="h-screen w-full">
			<DndContext
				sensors={sensors}
				onDragEnd={({ delta }) => {
					setCoordinates(({ x, y }) => {
						return {
							x: x + delta.x,
							y: y + delta.y,
						};
					});
				}}
				modifiers={modifiers}
			>
				<Canvas camera={{ near: 10.1, far: 1200, position: [54, 53, 50] }}
					gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
				>
					<ambientLight intensity={0.5} />
					<OrbitControls />
					<ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={0.6} far={100} />
					<Porsche scale={10} />
				</Canvas>
				<Wrapper>
					<Item
						axis={axis}
						label={label}
						handle={handle}
						top={y}
						left={x}
						style={style}
						buttonStyle={buttonStyle}
					/>
				</Wrapper>
			</DndContext>
		</div>
	);
}
interface DraggableItemProps {
	label: string;
	handle?: boolean;
	style?: React.CSSProperties;
	buttonStyle?: React.CSSProperties;
	axis?: Axis;
	top?: number;
	left?: number;
}
function DraggableItem({
	axis,
	label,
	style,
	top,
	left,
	handle,
	buttonStyle,
}: DraggableItemProps) {
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useDraggable({
			id: 'draggable',
		});
	console.log('transform', transform)

	const handleStyle = {
		...style,
		top: `${top}px`, // Убедитесь, что передаёте пиксели
		left: `${left}px`, // Аналогично
		transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`, // Исправлено на использование transform?.x
	} as React.CSSProperties;

	console.log('handleStyle', handleStyle)

	return (
		<div
			className='relative'
			{...listeners}
			{...attributes}
			style={handleStyle}
		>
			<Button

				ref={setNodeRef}
			>
				Drag me
			</Button>
		</div>
		// <Draggable
		// 	ref={setNodeRef}
		// 	dragging={isDragging}
		// 	handle={handle}
		// 	label={label}
		// 	listeners={listeners}
		// 	style={{ ...style, top, left }}
		// 	buttonStyle={buttonStyle}
		// 	transform={transform}
		// 	axis={axis}
		// 	{...attributes}
		// />
	);
}