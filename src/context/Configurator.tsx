import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ProductT } from '@/components/ui/product-card'
import DLoader from '@/components/ui/skeletons/3d'
import { useConfiguratorStore } from '@/store/configurator-store'
import { useBoxStore } from '@/store/disk-store'
import { Html, useGLTF, useProgress } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { LoaderCircle } from 'lucide-react'
import React, { createContext, FC, Suspense, useEffect, useState, } from 'react'
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
	const setFullScreen = useConfiguratorStore(state => state.setFullScreen)
	const fullScreen = useConfiguratorStore(state => state.fullScreen)
	const [showCanvas, setShowCanvas] = useState(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (fullScreen) {
			timer = setTimeout(() => setShowCanvas(true), 500); // 500ms delay
		} else {
			setShowCanvas(false);
		}
		return () => clearTimeout(timer);
	}, [fullScreen]);

	return (
		<ConfiguratorContext.Provider value={{ disks: null }} >

			<div className='rounded-sm
			 overflow-hidden h-full'>
				<div className='absolute top-0 right-0 z-10'>
					<Dialog open={fullScreen} onOpenChange={() => setFullScreen(!fullScreen)} >
						{/* <DialogTrigger>Open</DialogTrigger> */}
						<DialogContent className=' overflow-hidden flex w-screen h-screen items-center justify-center'>
							{showCanvas ? (
								<Canvas camera={{ near: 10.1, far: 1200, position: [54, 53, 50] }}
									gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
								>
									<Suspense fallback={<Loader />}>
										{disks.map((disk) => <Preload key={disk.path} model={disk.path} />)}
										{children}
									</Suspense>
								</Canvas>
							) : <LoaderCircle className='h-10 w-10 animate-spin' />}
						</DialogContent>
					</Dialog>
				</div>
				{!fullScreen &&
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
				}

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