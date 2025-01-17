import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import Porsche from '../Models/Porshe'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import useConfiguratorStore, { CurrentModelType } from '@/store/configurator-canvas'
import DiskScenes from '../Scenes/DiskScenes'
import useCanvasDashboard from '@/hooks/canvas-dashboard'


const ConfiguratorCanvas = () => {
	const { models, currentModel, newModel, setCurrentModel, setNewModel, isNewWheelModelSet, setIsNewWheelModelSet } = useConfiguratorStore();
	const { vehicleControl, wheelControl, vehicle, wheels } = useCanvasDashboard();

	useEffect(() => {
		if (newModel && isNewWheelModelSet) {
			setCurrentModel(newModel)
			setNewModel(null)
			setIsNewWheelModelSet(false)
			// wheelControl.handleChangeWheels(false)
		}
	}, [isNewWheelModelSet, newModel, setCurrentModel])
	const handleChangeModel = (model: {
		name: string;
		path: string;
		model: CurrentModelType;
	}) => {
		if (model.path !== currentModel.path && model.path !== newModel?.path) {
			setNewModel(model)
			setTimeout(() => {
				wheelControl.handleChangeWheels(true)

			}, 1100)
		}
	}

	return (
		<>
			<div className='absolute z-10 flex gap-2'>
				{models.map((model) => (
					<button
						key={model.path}
						onClick={() => handleChangeModel(model)}
						style={{
							padding: '10px 20px',
							backgroundColor: currentModel.path === model.path ? 'green' : 'gray',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}
					>
						{model.name}
					</button>
				))}
			</div>
			<Canvas camera={{ near: 10.1, far: 1200, position: [54, 53, 50] }}
				gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}

			>
				{/* <Perf /> */}
				<Porsche scale={10} />
				{newModel && <DiskScenes model={newModel.path} modelPosition={newModel.model.currentPosition} isNewModel />}
				<DiskScenes model={currentModel.path} modelPosition={currentModel.model.currentPosition} isNewModel={false} />
				{/* <DiskScenes model={newModel} isNew={true} isOld={false} /> */}
				{/* {isVisible &&
					<DiskScenes model={newModel} isNew={true} />
				} */}
				<OrbitControls />
				<Environment files={['/enviroment/Warehouse-with-lights.hdr']} background />
				<ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={0.6} far={100} />
				<OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} makeDefault />
				{/* <PerspectiveCamera makeDefault position={[25, 25, 10]} fov={100} /> */}
			</Canvas>
		</>

	)
}
function Tone({ mapping, exposure }) {
	const gl = useThree((state) => state.gl)
	useEffect(() => {
		const prevFrag = THREE.ShaderChunk.tonemapping_pars_fragment
		const prevTonemapping = gl.toneMapping
		const prevTonemappingExp = gl.toneMappingExposure
		// Model viewers "commerce" tone mapping
		// https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/Renderer.ts#L141
		THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment.replace(
			'vec3 CustomToneMapping( vec3 color ) { return color; }',
			`float startCompression = 0.8 - 0.04;
						float desaturation = 0.15;
						vec3 CustomToneMapping( vec3 color ) {
								color *= toneMappingExposure;
								float x = min(color.r, min(color.g, color.b));
								float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
								color -= offset;
								float peak = max(color.r, max(color.g, color.b));
								if (peak < startCompression) return color;
								float d = 1. - startCompression;
								float newPeak = 1. - d * d / (peak + d - startCompression);
								color *= newPeak / peak;
								float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
								return mix(color, vec3(1, 1, 1), g);
						}`,
		)
		gl.toneMapping = THREE[mapping + 'ToneMapping']
		gl.toneMappingExposure = exposure
		return () => {
			// Retore on unmount or data change
			gl.toneMapping = prevTonemapping
			gl.toneMappingExposure = prevTonemappingExp
			THREE.ShaderChunk.tonemapping_pars_fragment = prevFrag
		}
	}, [mapping, exposure])
}

export default ConfiguratorCanvas