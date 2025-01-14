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

	return (
		<group dispose={null}>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][0]}
				rotation={configuratorState.wheels.rotation['porsche'][0]}
				pZ={pZ}
				pX={pX}
				rX={rX}
				scene={scene.clone()}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][1]}
				rotation={configuratorState.wheels.rotation['porsche'][1]}
				pZ={pZ}
				pX={pX}
				rX={rX}
				scene={scene.clone()}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][2]}
				rotation={configuratorState.wheels.rotation['porsche'][2]}
				pZ={pZ}
				pX={pX}
				rX={rX}
				scene={scene.clone()}
			/>
			<DiskGroup
				position={configuratorState.wheels.position['porsche'][3]}
				rotation={configuratorState.wheels.rotation['porsche'][3]}
				pZ={pZ}
				pX={pX}
				rX={rX}
				scene={scene.clone()}
			/>
		</group>
	)
}

export default DiskScenes