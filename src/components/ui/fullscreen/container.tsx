import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    useDraggable,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import React, { createContext, FC, useEffect, useState } from 'react';
import type { Coordinates } from '@dnd-kit/utilities';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { createSnapModifier } from '@dnd-kit/modifiers';
import { useWindowSize, useWindowWidth } from '@react-hook/window-size';
const gridSize = 20; // pixels
const snapToGridModifier = createSnapModifier(gridSize);
type ContainerProps = {
    id?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export type ItemsId = 'models' | 'disks' | 'controls';
type ItemCoordinates = Coordinates & { id: ItemsId };
type DragContextState = {
    coordinates: ItemCoordinates[];
};
export const DragContextState = createContext<DragContextState | null>(null);

const Container: FC<ContainerProps> = (props) => {
    const [width, height] = useWindowSize();
    console.log('width, height', width, height);

    const [coordinates, setCoordinates] = useState<ItemCoordinates[]>([
        { id: 'models', x: 0, y: 100 },
        { id: 'disks', x: 0, y: 500 },
        { id: 'controls', x: width / 2, y: height },
    ]);
    useEffect(() => {
        setCoordinates((prev) => {
            return prev.map((item) => {
                if (item.id === 'controls') {
                    return { ...item, x: width / 3 - 400, y: height - 200 };
                }
                if (item.id === 'models') {
                    return { ...item, x: width / 3 - 200, y: 100 };
                }
                if (item.id === 'disks') {
                    return { ...item, x: width - 450, y: 100 };
                }
                return item;
            });
        });
    }, [width, height]);
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
    const updateItemCoordinates = (
        id: UniqueIdentifier,
        x: number,
        y: number,
        perv: ItemCoordinates[],
    ) => {
        const index = perv.findIndex((item) => item.id === id);
        if (index === -1) {
            return perv;
        }
        const item = perv[index];
        const newItem = { ...item, x: item.x + x, y: item.y + y };
        return [...perv.slice(0, index), newItem, ...perv.slice(index + 1)];
    };

    return (
        <DndContext
            modifiers={[snapToGridModifier, restrictToWindowEdges]}
            sensors={sensors}
            onDragEnd={(data) => {
                setCoordinates((prev) => {
                    return updateItemCoordinates(data.active.id, data.delta.x, data.delta.y, prev);
                });
            }}
        >
            <DragContextState.Provider value={{ coordinates }}>
                {props.children}
            </DragContextState.Provider>
        </DndContext>
    );
};

export default Container;
