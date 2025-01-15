import { meshBounds, } from '@react-three/drei'
import { a } from "@react-spring/three"
import { useChain, useSpring, useSpringRef } from "@react-spring/core"
import useCanvasDashboard from '@/hooks/canvas-dashboard'
import { AxisAnimationType } from '@/store/configurator-canvas'
import { useLayoutEffect } from 'react'
import type { GLTF } from 'three-stdlib';
import { applyProps, type ObjectMap } from '@react-three/fiber'
import useWheelChangeAnimation, { useNewWheelChangeAnimation } from '@/hooks/animations/wheel-change'
export type PositionType = [number, number, number]
export type DiskPosition = {
    position: PositionType;
    rotation?: PositionType;
    rotationX: AxisAnimationType;
    positionZ: AxisAnimationType;
    positionX: AxisAnimationType;
}
type DiskGroupProps = {
    model: GLTF & ObjectMap
    isNewModel: boolean
} & DiskPosition
export const DiskGroup = ({
    position,
    rotation,
    model,
    isNewModel,
    rotationX,
    positionX,
    positionZ,
}: DiskGroupProps) => {
    const { wheels } = useCanvasDashboard();

    const { scene } = model
    const isRotation = wheels.isRotate
    const wheelChangeAnimation = useWheelChangeAnimation({ isNew: isNewModel, toggle: wheels.isChange })
    // const wheelFullRotation = useWheelFullRotation()
    const newWheelChangeAnimation = useNewWheelChangeAnimation({ isNew: isNewModel, toggle: wheels.isChange })


    const pZ = isNewModel ? newWheelChangeAnimation.positionZ.to(positionZ[0], positionZ[1]) : wheelChangeAnimation.positionZ.to(positionZ[0], positionZ[1]);
    const pX = isNewModel ? newWheelChangeAnimation.positionX.to(positionX[0], positionX[1]) : wheelChangeAnimation.positionZ.to(positionX[0], positionX[1])
    const rX = isNewModel ? newWheelChangeAnimation.rotationX.to(rotationX[0], rotationX[1]) : wheelChangeAnimation.positionZ.to(rotationX[0], rotationX[1])

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
                    <primitive object={scene.clone()} />
                </mesh>
            </a.mesh>
        </a.group>
    );
};

