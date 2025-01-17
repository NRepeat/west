import { useFrame } from "@react-three/fiber"
import { MathUtils, Vector3 } from "three"

const CameraRig = ({ position: [targetX, targetY, targetZ], defaultAnimation, orbitControlBehavior }: { position: Vector3, defaultAnimation: boolean, orbitControlBehavior: boolean }) => {
	const frame = useFrame((state) => {
		if (!orbitControlBehavior) {
			if (defaultAnimation) {
				const v = new Vector3()
				// const t = state.clock.elapsedTime
				state.camera.position.lerp(v.set(100, 80, 22), 1.05)
				state.camera.lookAt(0, 0, 0)
				return
			}
			const camera = state.camera
			const x = MathUtils.damp(
				camera.position.x,
				targetX,
				4,
				0.1
			);
			const y = MathUtils.damp(
				camera.position.y,
				targetY,
				4,
				0.1
			);
			const z = MathUtils.damp(
				camera.position.z,
				targetZ,
				4,
				0.1
			);
			camera.position.lerp({ x, y, z }, 0.1)
			camera.lookAt(0, 0, 0)
		}
	})
	return frame
}
export default CameraRig