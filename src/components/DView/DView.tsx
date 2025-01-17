import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, OrbitControls } from '@react-three/drei';
import { FC } from 'react';

type DViewProps = {
    setPointerDown: (isDown: boolean) => void;
};

const DView: FC<DViewProps> = ({ setPointerDown }) => {
    return (
        <Canvas
            shadows
            camera={{ position: new THREE.Vector3(1, 1, 2), fov: 30 }}
            dpr={[1, 22]}
            onMouseDown={() => setPointerDown(true)}
            onMouseUp={() => setPointerDown(false)}
            onMouseOut={() => setPointerDown(false)}
        >
            {/* <Disk /> */}
            <OrbitControls />
            <Environment preset="sunset" background />
        </Canvas>
    );
};

export default DView;
