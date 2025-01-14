import { useGLTF } from '@react-three/drei';
import { PrimitiveProps } from '@react-three/fiber';
import { useLayoutEffect, } from 'react';

function Porsche(props: Omit<PrimitiveProps, 'object'>) {
    const { scene, nodes, materials } = useGLTF('model/Car/car.gltf');
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
        <mesh>
            <primitive {...props} object={scene} />;
        </mesh>
    </group>
}
export default Porsche;
