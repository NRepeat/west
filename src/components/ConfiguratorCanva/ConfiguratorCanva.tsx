import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import Porsche from '../Models/Porshe'
import { Environment, ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Dashboard from './Dashboard'
import DiskScenes from '../Scenes/DiskScenes'
const ConfiguratorCanvas = () => {
	const { mapping, exposure } = useControls({
		posix: 110,
		exposure: { value: 0.85, min: 0, max: 4 },
		mapping: { value: 'ACESFilmic', options: ['No', 'Linear', 'AgX', 'ACESFilmic', 'Reinhard', 'Cineon', 'Custom'] },
	})

	const [currentModel, setCurrentModel] = useState('/model/Disk1/disk.gltf'); // Состояние для выбранной модели

	const models = [
		{ name: 'Disk 1', path: '/model/Disk1/disk.gltf' },
		{ name: 'Disk 2', path: 'model/Disk2/disk.gltf' },
	];
	return (
		<>
			<div className='absolute z-10'>
				{models.map((model) => (
					<button
						key={model.path}
						onClick={() => setCurrentModel(model.path)}
						style={{
							padding: '10px 20px',
							backgroundColor: currentModel === model.path ? 'green' : 'gray',
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
			<Canvas camera={{ fov: 45, near: 0.1, far: 2000, position: [4, 3, 10] }}
				gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}

			>
				{/* <Perf /> */}
				<Porsche scale={10} />
				<DiskScenes model={currentModel} />
				<OrbitControls />
				<Environment files={['/enviroment/Warehouse-with-lights.hdr']} ground={{ height: 35, radius: 300, scale: 300 }} />
				<ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={0.6} far={100} />
				<OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} makeDefault />
				<PerspectiveCamera makeDefault position={[25, 25, 10]} fov={100} />
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