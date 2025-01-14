import { meshBounds, } from '@react-three/drei'
import { Interpolation } from "@react-spring/core"
import { a } from "@react-spring/three"
import type { Group, Object3DEventMap } from 'three'
import { useChain, useSpring, useSpringRef } from "@react-spring/core"
import useCanvasDashboard from '@/hooks/canvas-dashboard'
export type PositionType = [number, number, number]
type DiskGroupProps = {
    position: PositionType;
    rotation?: PositionType;
    rX: Interpolation<number, number>;
    pZ: Interpolation<number, number>;
    pX: Interpolation<number, number>;
    scene: Group<Object3DEventMap>
}
export const DiskGroup = ({
    position,
    rotation,
    scene,
    rotationX,
    pozitionZ,
    pozitionX
}: DiskGroupProps) => {
    const { wheels } = useCanvasDashboard();
    const toggle = wheels.isRotate
    const transApi = useSpringRef();
    const springApi = useSpringRef();
    const rotationApi = useSpringRef();
    console.log('toggle', toggle)
    const [{ x }] = useSpring(
        { x: toggle ? 1 : 0, config: { mass: 5, tension: 100, friction: 50 }, ref: springApi },
        [toggle]
    );
    const [{ rotX }] = useSpring(
        {
            rotX: toggle ? 1 : 0,
            config: { mass: 5, tension: 100, friction: 50 },
            ref: rotationApi,
        },

        [toggle]
    );

    const [{ z }] = useSpring(
        { z: toggle ? 1 : 0, config: { mass: 5, tension: 100, friction: 50 }, ref: rotationApi },
        [toggle]
    );

    const pZ = z.to([0, 1], [0, 0]);
    const pX = x.to([0, 1], [0, 0]);
    const rX = rotX.to([0, 1], [0, Math.PI * 1.3]);
    useChain(
        toggle ? [rotationApi, springApi] : [springApi, rotationApi,],
        [0, 1], 1000
    );
    return (
        <a.group position={position} rotation={rotation} >
            <a.mesh
                receiveShadow
                castShadow
                raycast={meshBounds}
                rotation-x={rX}
                position-z={pZ}
                position-x={pX}
            >
                <mesh scale={10}>
                    <primitive object={scene} />
                </mesh>
            </a.mesh>
        </a.group>
    );
};

