import { ProductT } from '@/components/ui/product-card'
import DLoader from '@/components/ui/skeletons/3d'
import { useBoxStore } from '@/store/disk-store'
import { Html, useGLTF, useProgress } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import React, { createContext, FC, Suspense, } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
interface Model {
	path: string
	name: string

}

export interface DiskModel extends Model, ProductT {
	uuid?: string

}

type ConfiguratorState = {
	disks: DiskModel[] | null
}
interface ConfiguratorProps {
	children: React.ReactNode
}
const ConfiguratorContext = createContext<ConfiguratorState>({ disks: null })

const Configurator: FC<ConfiguratorProps> = ({ children }) => {
	const disks: DiskModel[] = useBoxStore((state) => state.disks)
	return (
		<ConfiguratorContext.Provider value={{ disks: null }} >

			<div className='rounded-sm
			 overflow-hidden h-full'>

				<Canvas camera={{ near: 10.1, far: 1200, position: [54, 53, 50] }}
					gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
				>
					<Suspense fallback={<Loader />}>
						{
							disks.map((disk) => <Preload model={disk.path} />)
						}
						{children}
					</Suspense>
				</Canvas>

			</div>
		</ConfiguratorContext.Provider>
	)
}
function Loader() {
	// const { progress } = useProgress();
	return <Html fullscreen className='bg-white text-white '>
		<DLoader isResponsive >
		</DLoader>
	</Html>;
}
export default Configurator
const Preload = ({ model }: { model: string }) => {
	const loader = useGLTF(model)
	return (<mesh visible={false}>
		<primitive object={loader.scene} />
	</mesh>)
}