import { useFrame } from "@react-three/fiber"
import { MathUtils, Vector3 } from "three"

const CameraRig = ({ position: [targetX, targetY, targetZ], defaultAnimation, orbitControlBehavior }: { position: Vector3, defaultAnimation: boolean, orbitControlBehavior: boolean }) => {
	const frame = useFrame((state) => {
		const camera = state.camera
		if (!orbitControlBehavior) {
			if (defaultAnimation) {
				const v = new Vector3()
				const t = state.clock.elapsedTime
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
					Math.sin(t / 2) + 60,
					4,
					0.1
				);
				camera.position.lerp(v.set(x, y, z), 0.05)
				camera.lookAt(0, 0, 0)
				return
			}

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