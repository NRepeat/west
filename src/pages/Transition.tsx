import React, { useState, CSSProperties, useEffect } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef, config, useChain, useSpring, SpringValue, to, } from '@react-spring/three'
import { Canvas } from '@react-three/fiber'
import { Button } from '@/components/ui/button'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import Porsche from '@/components/Models/Porshe'
import { DiskGroup } from '@/components/Models/Disk'
import DiskScenes from '@/components/Scenes/DiskScenes'
import { useBoxStore } from '@/store/disk-store'


const pages: ((props: { style: { color: string, position: SpringValue<number[]>, opacity: SpringValue<number>, model: string, }, onClick: () => void, disksPosition: SpringValue<number[]>[], axisRotation: SpringValue<number>[] }) => React.ReactElement)[] = [
	({ style, disksPosition, axisRotation }) => <DiskScenes modelPosition={{ position: style.position }} model={style.model} disksPosition={disksPosition} opacity={style.opacity} axisRotation={axisRotation} />,
	({ style, disksPosition, axisRotation }) => <DiskScenes modelPosition={{ position: style.position }} model={style.model} disksPosition={disksPosition} opacity={style.opacity} axisRotation={axisRotation} />,


]

export default function Transition() {
	const [index, set] = useState(0)

	// Creates a spring with predefined animation slots
	const disks = useBoxStore((state) => state.disks)
	const onClick = (index) => set(index)
	const transRef = useSpringRef()
	const view = useSpringRef()
	const start = useSpringRef()
	const end = useSpringRef()

	const transitions = useTransition(index, {
		ref: transRef,
		keys: null,

		config: { ...config.stiff },

		from: {
			opacity: 1,
			position: [0, 0, 0],
			disks1: [-140, 9, -27],
			disks2: [-140, 9, 37],
			disks3: [140, 9, -27],
			disks4: [140, 9, 37],

			rotX: 0,
			// from: { rotX: 0 }, to: { rotX: 1 },
			ref: start,
		},
		enter: [
			{
				from: {
					position: [0, 0, 0],
				},
				to: {
					position: [0, 0, 0],
				},
				opacity: 0,
				ref: view,
				delay: 1100,
				config: { duration: 1000, bounce: 0 },
			},
			{
				from: {
					disks1: [-140, 9, -27],
					disks2: [-140, 9, 37],
					disks3: [140, 9, -27],
					disks4: [140, 9, 37],

				},
				to: {
					disks1: [-20, 9, -27],
					disks2: [-20, 9, 37],
					disks3: [20, 9, -27],
					disks4: [20, 9, 37],
				},
				opacity: 1,

				ref: view,
				config: { duration: 700, bounce: 0.6, mass: 4, tension: 270, friction: 126 },
			},
		],

		leave: [
			{
				from: {
					disks1: [-20, 9, -27],
					disks2: [-20, 9, 37],
					disks3: [20, 9, -27],
					disks4: [20, 9, 37],
				},
				to: {
					disks1: [-40, 9, -27],
					disks2: [-40, 9, 37],
					disks3: [40, 9, -27],
					disks4: [40, 9, 37],

				},
				config: { duration: 1000, bounce: 0.2 },
				opacity: 1,
				ref: end,
			},
			{
				from: {
					position: [0, 0, 0],
					rotX: 0

				},
				to: {
					position: [0, 0, 200],
					rotX: 1

				},
				config: { duration: 1000, bounce: 0.2, mass: 1, tension: 170, friction: 26 },
				opacity: 0,
				ref: end,
			},
		],

	})
	useChain([start, view, end], [0, 1, 2], 2100)
	useEffect(() => {
		transRef.start()
	}, [index, transRef])

	return (
		<>
			<div className="absolute gap-2 p-4 flex z-10">
				{pages.map((_, i) => {
					return <Button key={i} onClick={() => onClick(i)}>Add {i} </Button>

				})}
			</div>
			<Canvas camera={{ near: 10.1, far: 1200, position: [54, 53, 50] }}
				gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}

			>
				<Porsche scale={10} />
				{transitions((style, i) => {

					const Scene = pages[i]
					const disk = disks[i]
					const disksPosition = [style.disks1, style.disks2, style.disks3, style.disks4]
					const axisRotation = [style.rotX]
					return <Scene style={{ color: disk.color, model: disk.path, opacity: style.opacity, position: style.position }} key={i} disksPosition={disksPosition} axisRotation={axisRotation} />
				})}
				<OrbitControls />
				<Environment files={['/enviroment/Warehouse-with-lights.hdr']} background />
				<ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={0.6} far={100} />
				<OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} makeDefault />

			</Canvas>
		</>



	)
}
