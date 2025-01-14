import { useGLTF } from '@react-three/drei';
import { applyProps, PrimitiveProps, useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function Porsche(props: Omit<PrimitiveProps, 'object'>) {
    const { scene, nodes, materials } = useGLTF('/model/scene.gltf');
    const disk = useGLTF('/model/disk/disk_3.gltf');
    console.log('disk', disk)
    console.log('materials', materials);
    useLayoutEffect(() => {
        Object.values(nodes).forEach((node) => {
            if (node) {
                node.castShadow = true
                node.receiveShadow = true
            }
        })

    }, [nodes, materials]);
    // useFrame(() => {
    //     disk.nodes.
    // })
    return <group position={[0, 0, 0]} >
        <mesh position={[4, 0.31, 1.4]} scale={0.3}>
            <primitive object={disk.scene} />;
        </mesh>
        <mesh>
            <primitive {...props} object={scene} />;
        </mesh>
    </group>
}
export default Porsche;
