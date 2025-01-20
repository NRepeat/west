import { Dialog, DialogContent, } from '@/components/ui/dialog'
import { ProductT } from '@/components/ui/product-card'
import DLoader from '@/components/ui/skeletons/3d'
import { useConfiguratorStore } from '@/store/configurator-store'
import { useBoxStore } from '@/store/disk-store'
import { Html, useGLTF, } from '@react-three/drei'
import { Canvas, } from '@react-three/fiber'
import { LoaderCircle, Scaling } from 'lucide-react'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import React, { createContext, FC, Suspense, useEffect, useState, } from 'react'
import Container from '@/components/ui/fullscreen/container'
import Wrapper from '@/components/ui/fullscreen/wrapper'
import Controls from '@/components/ui/fullscreen/controls'
import CarModels from '@/components/ui/fullscreen/car-models'
import Disks from '@/components/ui/fullscreen/disks'
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
						<DialogContent className=' overflow-hidden flex w-screen h-screen items-center justify-center p-2.5'>
							<Container >
							<div className='rounded-md overflow-hidden h-full w-full flex justify-center items-center'>
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
								{showCanvas && <>
									<Wrapper id='controls' >
										<Controls />
									</Wrapper>
									<Wrapper id='disks' >
										<Disks/>
									</Wrapper>
									<Wrapper id='models' >
										<CarModels/>
									</Wrapper>
								</>}
							</div>
				
							</Container>

							<DialogPrimitive.Close className="absolute right-4 top-4 z-20 bg-white rounded-md ">
								<Scaling />
								<span className="sr-only">Close</span>
							</DialogPrimitive.Close>
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