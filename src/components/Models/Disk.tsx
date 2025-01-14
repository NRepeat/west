import { meshBounds, } from '@react-three/drei'
import { a } from "@react-spring/three"
import type { Group, Object3DEventMap } from 'three'
import { useChain, useSpring, useSpringRef } from "@react-spring/core"
import useCanvasDashboard from '@/hooks/canvas-dashboard'
import { AxisAnimationType } from '@/store/configurator-canvas'
export type PositionType = [number, number, number]
type DiskGroupProps = {
    position: PositionType;
    rotation?: PositionType;
    rotationX: AxisAnimationType;
    positionZ: AxisAnimationType;
    positionX: AxisAnimationType;
    scene: Group<Object3DEventMap>
}
export const DiskGroup = ({
    position,
    rotation,
    scene,
    rotationX,
    positionX,
    positionZ
}: DiskGroupProps) => {
    const { wheels } = useCanvasDashboard();
    const toggle = wheels.isChange
    console.log('toggle', toggle)
    const isRotation = wheels.isRotate
    const transApi = useSpringRef();
    const springApi = useSpringRef();
    const rotationApi = useSpringRef();
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
    const infRotation = useSpring({
        // rotX: isRotation ? 1 : 0,
        from: { rotate: 0 },
        to: { rotate: -360 },
        loop: { reverse: false },
        config: { duration: 30500 },
        ref: transApi,
    });

    // const rInf = infRotation.rotX.to((rotX) => rotX); // Full 360-degree rotation

    const [{ z }] = useSpring(
        { z: toggle ? 1 : 0, config: { mass: 5, tension: 100, friction: 50 }, ref: rotationApi },
        [toggle]
    );

    const pZ = z.to(positionZ[0], positionZ[1]);
    const pX = x.to(positionX[0], positionX[1]);
    const rX = rotX.to(rotationX[0], rotationX[1]);

    useChain(
        toggle ? [rotationApi, springApi] : [springApi, rotationApi],
        [0, 1], toggle ? 1500 : 1000
    );
    useChain(isRotation ? [transApi] : [transApi], [0, 1], isRotation ? 1500 : 1000)
    return (
        <a.group position={position} rotation={rotation} >
            <a.mesh
                receiveShadow
                castShadow
                raycast={meshBounds}
                rotation-x={isRotation ? infRotation.rotate : rX}
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

