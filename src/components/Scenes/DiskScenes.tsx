import { FC, } from 'react'
import { DiskGroup, DiskPosition } from '../Models/Disk'
import { useGLTF } from '@react-three/drei'
import { CurrentModelPosition } from '@/store/configurator-canvas'
type DiskScenesProps = {
	model: string
	modelPosition: CurrentModelPosition,
	isNewModel: boolean
}

const DiskScenes: FC<DiskScenesProps> = ({ model, modelPosition, isNewModel }) => {
	const diskModel = useGLTF(model);
	const { position, rotation, axisPosition, axisRotation } = modelPosition

	return (
		<group dispose={null}>
			<DiskGroup
				isNewModel={isNewModel}
				position={position[0]}
				rotation={rotation[0]}
				positionZ={axisPosition[0].z}
				positionX={axisPosition[0].x}
				rotationX={axisRotation[0].x}
				model={diskModel}
			/>
			{/* <DiskGroup
				position={configuratorState.wheels.position['porsche'][1]}
				rotation={configuratorState.wheels.rotation['porsche'][1]}
				positionZ={configuratorState.wheels.axisPosition['porsche'][1].z}
				positionX={configuratorState.wheels.axisPosition['porsche'][1].x}
				rotationX={configuratorState.wheels.axisRotation['porsche'][1].x}
				model={tempModel}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][2]}
				rotation={configuratorState.wheels.rotation['porsche'][2]}
				positionZ={configuratorState.wheels.axisPosition['porsche'][2].z}
				positionX={configuratorState.wheels.axisPosition['porsche'][2].x}
				rotationX={configuratorState.wheels.axisRotation['porsche'][2].x}
				model={tempModel}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][3]}
				rotation={configuratorState.wheels.rotation['porsche'][3]}
				positionZ={configuratorState.wheels.axisPosition['porsche'][3].z}
				positionX={configuratorState.wheels.axisPosition['porsche'][3].x}
				rotationX={configuratorState.wheels.axisRotation['porsche'][3].x}
				model={tempModel}
			/> */}
		</group>
	)
}

export default DiskScenes