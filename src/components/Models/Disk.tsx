import { meshBounds } from '@react-three/drei';
import { a, SpringValue, useSpring, useSpringRef } from '@react-spring/three';
import { useLayoutEffect } from 'react';
import type { GLTF } from 'three-stdlib';
import { applyProps, type ObjectMap } from '@react-three/fiber';
import { EulerOrder, MathUtils } from 'three';

import useDashboardControlStore from '@/store/daschboard-control';
export type PositionType = SpringValue<number[]>;
export type DiskPosition = {
    position: PositionType;
    rotation?: [x: number, y: number, z: number, order?: EulerOrder | undefined];
    rotationX: SpringValue<number>;
};
type DiskGroupProps = {
    model: GLTF & ObjectMap;
} & DiskPosition;
export const DiskGroup = (props: DiskGroupProps) => {
    const { model, rotationX, rotation } = props;
    const { scene } = model;
    const position = props.position as unknown as SpringValue<[x: number, y: number, z: number]>;
    const { wheels } = useDashboardControlStore((state) => state);
    const { rotX } = useSpring({
        from: { rotX: 0 },
        to: { rotX: 1 },
        loop: true,
        config: { duration: 1000 },
    });

    const rX = rotationX.to([0, 1], [0, MathUtils.degToRad(920)]);
    const handleRotation = rotX.to([0, 1], [0, MathUtils.degToRad(920)]);
    useLayoutEffect(() => {
        Object.values(model.nodes).forEach((node) => {
            if (node) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        applyProps(model.materials['Tyre_Rim_Texture.006'], { color: '#00809C', roughness: 0.2 });
    }, [model.nodes, model.materials]);
    return (
        <a.group position={position}>
            <a.mesh
                receiveShadow
                castShadow
                rotation={rotation}
                raycast={meshBounds}
                rotation-x={wheels.isRotate ? handleRotation : rX}
            >
                <mesh scale={10}>
                    <primitive object={scene.clone()} />
                </mesh>
            </a.mesh>
        </a.group>
    );
};
