import { FC } from 'react'
import { DiskGroup } from '../Models/Disk'
import { useGLTF } from '@react-three/drei'

import useCanvasDashboard from '@/hooks/canvas-dashboard'
import useConfiguratorStore from '@/store/configurator-canvas'
type DiskScenesProps = {
	model: string
}

const DiskScenes: FC<DiskScenesProps> = ({ model }) => {
	const { wheels } = useCanvasDashboard();
	const { scene } = useGLTF(model);
	const configuratorState = useConfiguratorStore()
	console.log('configuratorState.wheels.axisPosition[\'porsche\'][0]', configuratorState.wheels.axisPosition['porsche'][0].x)
	return (
		<group dispose={null}>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][0]}
				rotation={configuratorState.wheels.rotation['porsche'][0]}
				positionZ={configuratorState.wheels.axisPosition['porsche'][0].z}
				positionX={configuratorState.wheels.axisPosition['porsche'][0].x}
				rotationX={configuratorState.wheels.axisRotation['porsche'][0].x}
				scene={scene.clone()}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][1]}
				rotation={configuratorState.wheels.rotation['porsche'][1]}
				positionZ={configuratorState.wheels.axisPosition['porsche'][1].z}
				positionX={configuratorState.wheels.axisPosition['porsche'][1].x}
				rotationX={configuratorState.wheels.axisRotation['porsche'][1].x}
				scene={scene.clone()}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][2]}
				rotation={configuratorState.wheels.rotation['porsche'][2]}
				positionZ={configuratorState.wheels.axisPosition['porsche'][2].z}
				positionX={configuratorState.wheels.axisPosition['porsche'][2].x}
				rotationX={configuratorState.wheels.axisRotation['porsche'][2].x}
				scene={scene.clone()}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][3]}
				rotation={configuratorState.wheels.rotation['porsche'][3]}
				positionZ={configuratorState.wheels.axisPosition['porsche'][3].z}
				positionX={configuratorState.wheels.axisPosition['porsche'][3].x}
				rotationX={configuratorState.wheels.axisRotation['porsche'][3].x}
				scene={scene.clone()}
			/>
		</group>
	)
}

export default DiskScenes