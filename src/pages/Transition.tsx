import React, { useState, CSSProperties, useEffect } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef, config, useChain, } from '@react-spring/three'
import { Canvas } from '@react-three/fiber'
import { Button } from '@/components/ui/button'
import { OrbitControls } from '@react-three/drei'


const pages: ((props: { style: { color: string, position: [number, number, number], opacity: number }, onClick: () => void }) => React.ReactElement)[] = [
	({ style, onClick }) => <animated.mesh position={style.position} onClick={onClick}>
		<boxGeometry args={[1, 1, 1]} />
		<animated.meshStandardMaterial color={'green'} transparent />
	</animated.mesh>,
	({ style, onClick }) => <animated.mesh position={style.position} onClick={onClick}>
		<boxGeometry args={[1, 1, 1]} />
		<animated.meshStandardMaterial color={'yellow'} transparent />
	</animated.mesh>,
	({ style, onClick }) => <animated.mesh position={style.position} onClick={onClick}>
		<boxGeometry args={[1, 1, 1]} />
		<animated.meshStandardMaterial color={'red'} transparent />
	</animated.mesh>,

]

export default function Transition() {
	const [index, set] = useState(0)

	// Creates a spring with predefined animation slots

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

			opacity: 0, position: [-5, 0, 0],
			ref: start,
		},
		enter: [
			{
				from: { position: [-5, 0, 0] }, to: { position: [0, 0, 0] }, opacity: 1,
				ref: view, delay: 1100
			},
			{
				from: { position: [0, 0, 0] }, to: { position: [0, 2, 0] }, opacity: 1,
				ref: view
			},

		],
		leave: [{
			from: { position: [0, 2, 0] }, to: { position: [0, 0, 0] }, opacity: 1,
			ref: end
		},
		{

			from: { position: [0, 0, 0] }, to: { position: [5, 0, 0] }, opacity: 0,
			ref: end

		},
		]

	})
	useChain([start, view, end], [0, 1, 2], 100)
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
			<Canvas>
				<OrbitControls />
				<ambientLight intensity={1.5} />
				{transitions((style, i) => {
					const Page = pages[i]
					return <Page style={style} key={i} />
				})}
			</Canvas>
		</>



	)
}
