import { meshBounds, } from '@react-three/drei'
import { a, SpringValue, useSpring } from "@react-spring/three"
import { useLayoutEffect } from 'react'
import type { GLTF } from 'three-stdlib';
import { applyProps, type ObjectMap } from '@react-three/fiber'
import { MathUtils } from 'three';
export type PositionType = [number, number, number]
export type DiskPosition = {
    position: PositionType;
    rotation?: PositionType;
    rotationX: SpringValue<number>
    positionZ: SpringValue<number>
    positionX: SpringValue<number>
}
type DiskGroupProps = {
    model: GLTF & ObjectMap
} & DiskPosition
export const DiskGroup = ({
    position,
    rotation,
    model,
    // isNewModel,
    rotationX,
    positionX,
    positionZ,
}: DiskGroupProps) => {

    const { scene } = model

    const rX = rotationX.to([0, 1], [0, MathUtils.degToRad(320)]);
    useLayoutEffect(() => {
        Object.values(model.nodes).forEach((node) => {
            if (node) {
                node.castShadow = true
                node.receiveShadow = true
            }
        })
        applyProps(model.materials['Tyre_Rim_Texture.006'], { color: '#00809C', roughness: 0.2, })
    }, [model.nodes, model.materials]);
    return (
        <a.group position={position}
            rotation={rotation}
        >
            <a.mesh
                receiveShadow
                castShadow
                raycast={meshBounds}
                rotation-x={rX}
            // position-z={pZ}
            // position-x={pX}
            >
                <mesh scale={10}>
                    <primitive object={scene.clone()} />
                </mesh>
            </a.mesh>
        </a.group>
    );
};

