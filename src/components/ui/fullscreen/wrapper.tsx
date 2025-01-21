import { useDraggable } from '@dnd-kit/core';
import React, { useContext, useEffect } from 'react';
import { DragContextState, ItemsId } from './container';
import clsx from 'clsx';
import { useConfiguratorStore } from '@/store/configurator-store';
import { animated, useSpring } from '@react-spring/web';

const Wrapper = ({ id, children }: { id: ItemsId; children?: React.ReactNode }) => {
    const data = useContext(DragContextState);
    const conf = useConfiguratorStore((state) => state.orbitControlBehaviorConfig);
    const item = data?.coordinates.find((item) => item.id === id);
    const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({ id });

    const [springStyle, springApi] = useSpring(() => ({ opacity: 0 }));

    useEffect(() => {
        springApi.start({ opacity: 1 });
        if (conf.orbitControlBehavior) {
            springApi.start({ opacity: 0 });
        }
    }, [springApi, conf]);

    // Memoized style object
    const handleStyle = React.useMemo(
        () => ({
            opacity: springStyle.opacity,
            top: `${item?.y}px`,
            left: `${item?.x}px`,
            transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
        }),
        [item?.x, item?.y, transform, springStyle.opacity],
    );

    return (
        <animated.div
            className={clsx('absolute z-10 cursor-grab', { 'cursor-grabbing': isDragging })}
            {...listeners}
            ref={setNodeRef}
            {...attributes}
            style={handleStyle}
        >
            {children}
        </animated.div>
    );
};

export default Wrapper;
