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
	position: SpringValue<number[]>
}

const DiskScenes: FC<DiskScenesProps> = ({ model, modelPosition, disksPosition, axisRotation }) => {
	const diskModel = useGLTF(model);
	const position = modelPosition.position as unknown as SpringValue<[x: number, y: number, z: number]>

	return (
		<a.mesh position={position} >
			<group dispose={null}>
				<DiskGroup
					position={disksPosition[0]}
					rotationX={axisRotation[0]}
					rotation={[0, 0, 0]}
					// positionZ={axisPosition[0].z}
					// positionX={axisPosition[0].x}

					model={diskModel}
				/>
				<DiskGroup
					position={disksPosition[1]}
					rotation={[190, 0, 0]}
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