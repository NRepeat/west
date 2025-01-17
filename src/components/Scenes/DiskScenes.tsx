import { FC, } from 'react'
import { DiskGroup, DiskPosition } from '../Models/Disk'
import { useGLTF } from '@react-three/drei'
import { SpringValue, a } from '@react-spring/three'
type DiskScenesProps = {
	model: string
	modelPosition: CurrentModelPosition,
	disksPosition: SpringValue<number[]>[]
	opacity: SpringValue<number>
	axisRotation: SpringValue<number>[],
}
export type CurrentModelPosition = {
	// rotation: WheelsPosition,
	// axisPosition: AxisPositionType<AxisType>[],

	position: SpringValue<number[]>

}

const DiskScenes: FC<DiskScenesProps> = ({ model, modelPosition, isNewModel, disksPosition, opacity, axisRotation }) => {
	console.log('opacity', opacity)
	const diskModel = useGLTF(model);
	const { position, rotation, axisPosition, } = modelPosition
	const visible = opacity.to((value) => value > 0);
	console.log('visible', visible)
	return (
		<a.mesh position={position} visible={visible}>
			<group dispose={null}>
				<DiskGroup
					position={disksPosition[0]}
					rotationX={axisRotation[0]}
					// rotation={rotation[0]}
					// positionZ={axisPosition[0].z}
					// positionX={axisPosition[0].x}

					model={diskModel}
				/>
				<DiskGroup
					position={disksPosition[1]}
					// rotation={configuratorState.wheels.rotation['porsche'][1]}
					rotationX={axisRotation[0]}
					model={diskModel}
				/>
				<DiskGroup
					position={disksPosition[2]}
					rotation={[0, 3.15, 0]}
					rotationX={axisRotation[0]}
					model={diskModel}
				/>
				<DiskGroup
					position={disksPosition[3]}
					rotation={[0, 3.15, 0]}
					rotationX={axisRotation[0]}
					model={diskModel}
				/>
			</group>
		</a.mesh>

	)
}

export default DiskScenes