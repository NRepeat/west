import { FC, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { Button } from '@/components/ui/button';
import { create } from 'zustand';
import { useBoxStore } from '@/store/ball-store';

type BoxProps = {
    name: string;
    defaultPosition: [number, number, number];
    opacity: number;
    color: string;
};

const Box: FC<BoxProps> = ({ name, defaultPosition, opacity, color }) => {
    console.log('defaultPosition', defaultPosition)
    console.log('opacity', opacity)
    const state = useBoxStore((state) => state)
    const [springs, api] = useSpring(() => ({
        defaultPosition,
        opacity,
        onRest: () => {
            const n = state.boxs.findIndex(f => f.defaultPosition[0] === 5)
            console.log('n', n)
            if (n !== -1) {
                const newBalls = [...state.boxs];
                newBalls[n].defaultPosition = [-4, 0, 0]
                state.setBoxs(newBalls)
            }

        },
    }), [defaultPosition]);

    return (
        <animated.mesh
            name={name}
            position={springs.defaultPosition}
            scale={1}
            visible={springs.opacity.to(o => o > 0)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <animated.meshStandardMaterial color={color} transparent />
        </animated.mesh>
    );
};

export default function Test() {

    const state = useBoxStore((state) => state)
    const [selectedModel, setSelectedModel] = useState<{ name: string; color: string; defaultPosition: [number, number, number]; }>()
    console.log('selectedModel', selectedModel)
    const changeBoxArr = (key: string) => {
        if (key === selectedModel?.name) {
            return
        }
        // Find clicked ball and the next ball to swap
        const middleBox = state.boxs.findIndex((ball) => ball.defaultPosition[0] === 0)
        const currentIndex = state.boxs.findIndex((ball) => ball.name === key);
        console.log('currentIndex', currentIndex)
        const nextIndex = middleBox

        // Swap positions of the selected balls
        const newBalls = [...state.boxs];
        setSelectedModel(newBalls[currentIndex])
        newBalls[currentIndex].opacity = 1
        newBalls[currentIndex].defaultPosition = [0, 0, 0];
        newBalls[nextIndex].defaultPosition = [5, 0, 0];
        newBalls[nextIndex].opacity = 0;
        console.log('newBalls', newBalls)

        state.setBoxs(newBalls);
    };
    const handleAdd = () => {
        const n = [...state.boxs, { name: `${state.boxs.length + 1}`, color: 'green', defaultPosition: [-4, 0, 0], opacity: 1 }]
        state.setBoxs(n)
    }
    return (
        <>
            <div className="absolute gap-2 p-4 flex z-10">
                <Button onClick={handleAdd}>Add </Button>
                {state.boxs.map(d => <Button onClick={() => changeBoxArr(d.name)}>Change {d.name}</Button>)}
            </div>
            <Canvas>
                <ambientLight intensity={1.5} />
                <group>
                    {state.boxs.map((b, i) => (
                        <Box
                            key={i}
                            name={b.name}
                            opacity={b.opacity}
                            color={b.color}
                            defaultPosition={[b.defaultPosition[0], b.defaultPosition[1], b.defaultPosition[2]]}
                        />
                    ))}
                </group>
                <OrbitControls />
            </Canvas>
        </>
    );
}
