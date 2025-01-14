import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { LayerMaterial, Color, Depth } from 'lamina';
import {
    AccumulativeShadows,
    Environment,
    Lightformer,
    OrbitControls,
    PerformanceMonitor,
    RandomizedLight,
} from '@react-three/drei';
import Porsche from '@/components/Models/Porshe';

const MainCanvas = () => {
    return (
        <div className="canvas relative w-full h-screen">
            <Canvas
                shadows
                camera={{ position: new THREE.Vector3(15, 0, 12), fov: 30 }}
                dpr={[1, 22]}
            >
                <OrbitControls />
                <spotLight
                    position={[2, 12, 3]}
                    angle={2}
                    penumbra={1}
                    castShadow
                    intensity={2}
                    shadow-bias={-0.02}
                />
                <ambientLight intensity={12} />
                <Porsche />
                <AccumulativeShadows position={[0, -1.14, 0]} frames={100} alphaTest={1} scale={30}>
                    <RandomizedLight amount={2} radius={21} ambient={21} position={[12, 52, -12]} />
                </AccumulativeShadows>
                {/** PerfMon will detect performance issues */}
                <PerformanceMonitor />
                {/* Renders contents "live" into a HDRI environment (scene.environment). */}
                <Environment frames={Infinity} resolution={156} background blur={1}>
                    <Lightformers />
                </Environment>
                {/* <CameraRig position={canvasState.cameraPosition} defaultAnimation={canvasState.defaultAnimation} orbitControlBehavior={canvasState.orbitControlBehavior} /> */}
            </Canvas>
        </div>
    );
};

function CameraRig({
    position: [targetX, targetY, targetZ],
    defaultAnimation,
    orbitControlBehavior,
}: {
    position: THREE.Vector3;
    defaultAnimation: boolean;
    orbitControlBehavior: boolean;
}) {
    const frame = useFrame((state) => {
        if (!orbitControlBehavior) {
            if (defaultAnimation) {
                const v = new THREE.Vector3();
                const t = state.clock.elapsedTime;
                state.camera.position.lerp(
                    v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2),
                    0.05,
                );
                state.camera.lookAt(0, 0, 0);
                return;
            }
            const camera = state.camera;
            const x = THREE.MathUtils.damp(camera.position.x, targetX, 4, 0.1);
            const y = THREE.MathUtils.damp(camera.position.y, targetY, 4, 0.1);
            const z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, 0.1);
            camera.position.lerp({ x, y, z }, 0.1);

            camera.lookAt(0, 0, 0);
        }
    });

    return frame;
}
function Lightformers({ positions = [0, 0, 3, 0, 0, 0, 0, 0] }) {
    const group = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

    useFrame((_, delta) => {
        if (group.current) {
            if (group.current.position)
                return (
                    (group.current.position.z += delta * 10) > 20 &&
                    (group.current.position.z = -60)
                );
        }
    });

    return (
        <>
            <Lightformer
                intensity={0.75}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={[10, 10, 1]}
            />
            <group rotation={[0, 0.5, 0]}>
                <group ref={group}>
                    {positions.map((x, i) => (
                        <Lightformer
                            key={i}
                            form="circle"
                            intensity={10}
                            rotation={[Math.PI / 2, 0, 0]}
                            position={[x, 4, i * 4]}
                            scale={[3, 1, 1]}
                        />
                    ))}
                </group>
            </group>
            {/* Sides */}
            <Lightformer
                intensity={12}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={[20, 0.1, 1]}
            />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
            {/* Accent (red) */}

            {/* Background */}
            <mesh scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Color color="#1F037A" alpha={1} mode="subtract" />
                    <Depth
                        colorA="#211A1F"
                        colorB=""
                        alpha={0.5}
                        mode="normal"
                        near={10}
                        far={400}
                        origin={[100, 100, 100]}
                    />
                </LayerMaterial>
            </mesh>
        </>
    );
}
export default MainCanvas;
