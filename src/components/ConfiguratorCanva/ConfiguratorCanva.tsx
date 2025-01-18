import Porsche from "../Models/Porshe"
import Configurator, { DiskModel } from "@/context/Configurator"
import { SpringValue } from '@react-spring/three'
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { useWheelChangeAnimation } from "@/hooks/animations/wheel-change-transition"
import { useConfiguratorStore } from "@/store/configurator-store"
import { useBoxStore, } from "@/store/disk-store"
import DiskScenes from "../Scenes/DiskScenes"
import { Button } from "../ui/button"
import { Vector3 } from "three"
import CameraRig from "../ui/helpers/CameraRig"

type DiskSceneProps =
	{
		style: {
			position: SpringValue<number[]>,
			opacity: SpringValue<number>,
			model: string,
		},
		disksPosition: SpringValue<number[]>[],
		axisRotation: SpringValue<number>[]
	}

export type TierButtonsProps = { position: Vector3, defaultAnimation: boolean, textValue?: string | undefined }


const ConfiguratorCanvas = () => {
	const index = useConfiguratorStore(state => state.selectedIndex)
	const isAnimationStarted = useConfiguratorStore(state => state.isAnimationStarted)
	const setSelectedIndex = useConfiguratorStore(state => state.setSelectedIndex)
	const cameraConfig = useConfiguratorStore(state => state.cameraConfig)
	const orbitControlBehaviorConfig = useConfiguratorStore(state => state.orbitControlBehaviorConfig)
	const disks: DiskModel[] = useBoxStore((state) => state.disks)
	const transitions = useWheelChangeAnimation({ index })
	const handleOrbitControlRotationStart = () => {
		orbitControlBehaviorConfig.setOrbitControlBehavior(true)
		cameraConfig.setIsDefaultAnimation(false)
	}

	const handleOrbitControlRotationStop = () => {
		orbitControlBehaviorConfig.setOrbitControlBehavior(false)
		setTimeout(() => {
			cameraConfig.setIsDefaultAnimation(true)
		}, cameraConfig.timeoutTime)
	}

	const handleChangePosition = ({ position, defaultAnimation }: TierButtonsProps) => {
		cameraConfig.setCameraPosition(new Vector3(...position))
		cameraConfig.setIsDefaultAnimation(defaultAnimation)
	}
	const handleClick = (index: number, position: Vector3) => {
		handleChangePosition({ defaultAnimation: false, position })
		setSelectedIndex(index)
	}

	const scenes: ((props: DiskSceneProps) => React.ReactElement)[] = disks.map(() => {
		return ({ axisRotation, disksPosition, style }: DiskSceneProps) => (
			<DiskScenes
				modelPosition={{ position: style.position }}
				model={style.model}
				disksPosition={disksPosition}
				opacity={style.opacity}
				axisRotation={axisRotation}
			/>
		);
	});
	const DiskAnimationScene = () => {
		return (<>
			{transitions((style, i) => {
				const Scene = scenes[i]
				const disk = disks[i]
				const disksPosition = [style.disks1, style.disks2, style.disks3, style.disks4]
				const axisRotation = [style.rotX]
				return <Scene style={{ model: disk.path, opacity: style.opacity, position: style.position }} key={i} disksPosition={disksPosition} axisRotation={axisRotation} />
			})}
		</>)
	}
	return (
		<>
			<div className="absolute gap-2 p-4 flex z-10">
				{scenes.map((_, i) => {
					return <Button disabled={isAnimationStarted} key={i} onClick={() => handleClick(i, cameraConfig.defaultCameraPosition)}>Add {i} </Button>
				})}
			</div>
			<Configurator>
				<DiskAnimationScene />
				<OrbitControls onStart={handleOrbitControlRotationStart} onEnd={handleOrbitControlRotationStop} enableZoom={false} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} makeDefault />
				<CameraRig position={cameraConfig.cameraPosition} defaultAnimation={cameraConfig.defaultAnimation} orbitControlBehavior={orbitControlBehaviorConfig.orbitControlBehavior} />
				<Environment files={['/enviroment/Warehouse-with-lights.hdr']} background />
				<ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={0.6} far={100} />
				<Porsche scale={10} />
			</Configurator>
		</>
	)
}

export default ConfiguratorCanvas