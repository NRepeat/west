import { useBoxStore } from '@/store/disk-store'
import { useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { createContext, FC, } from 'react'

interface Model {
	path: string
	name: string
}

export interface DiskModel extends Model {
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
		<ConfiguratorContext.Provider value={{ disks: null }}>
			<Canvas camera={{ near: 10.1, far: 1200, position: [54, 53, 50] }}
				gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
			>
				{
					disks.map((disk) => <Preload model={disk.path} />)
				}
				{children}
			</Canvas>
		</ConfiguratorContext.Provider>
	)
}

export default Configurator
const Preload = ({ model }: { model: string }) => {
	const loader = useGLTF(model)
	return (<mesh visible={false}>
		<primitive object={loader.scene} />
	</mesh>)
}