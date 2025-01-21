import useDashboardControlStore from '@/store/daschboard-control';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';

const CameraRig = ({
    position: [targetX, targetY, targetZ],
    defaultAnimation,
    orbitControlBehavior,
}: {
    position: Vector3;
    defaultAnimation: boolean;
    orbitControlBehavior: boolean;
}) => {
    const { vehicle } = useDashboardControlStore((state) => state);

    useFrame((state) => {
        const camera = state.camera;
        const elapsedTime = state.clock.elapsedTime;

        if (!orbitControlBehavior) {
            if (vehicle.isRotate) {
                const radius = 100;

                const speed = 0.5;

                const angle = elapsedTime * speed;

                const x = radius * Math.cos(angle);
                console.log('x', x);
                const z = radius * Math.sin(angle);
                const y = camera.position.y;
                const v = new Vector3();

                camera.position.lerp(v.set(x, y, z), 0.01);

                camera.lookAt(0, 0, 0);
            } else if (defaultAnimation) {
                const v = new Vector3();
                const t = elapsedTime;

                const x = MathUtils.damp(camera.position.x, targetX, 4, 0.1);
                const y = MathUtils.damp(camera.position.y, targetY, 4, 0.1);
                const z = MathUtils.damp(camera.position.z, Math.sin(t / 2) + 60, 4, 0.1);

                camera.position.lerp(v.set(x, y, z), 0.05);
                camera.lookAt(0, 0, 0);
            } else {
                const x = MathUtils.damp(camera.position.x, targetX, 4, 0.1);
                const y = MathUtils.damp(camera.position.y, targetY, 4, 0.1);
                const z = MathUtils.damp(camera.position.z, targetZ, 4, 0.1);

                camera.position.lerp({ x, y, z }, 0.1);
                camera.lookAt(0, 0, 0);
            }
        }
    });

    return null;
};

export default CameraRig;
