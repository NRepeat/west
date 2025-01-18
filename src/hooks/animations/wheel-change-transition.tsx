
import { useConfiguratorStore } from '@/store/configurator-store'
import { useTransition, useSpringRef, config, useChain, } from '@react-spring/three'
import { useEffect } from 'react'
type UseWheelChangeTransitionAnimationType = {
	index: number
}
export const useWheelChangeAnimation = ({ index }: UseWheelChangeTransitionAnimationType) => {
	// const isAnimationStarted = useConfiguratorStore(state => state.isAnimationStarted)
	const setAnimationState = useConfiguratorStore(state => state.setAnimationState)
	const setIsDefaultAnimation = useConfiguratorStore(state => state.cameraConfig.setIsDefaultAnimation)
	const transRef = useSpringRef()
	const view = useSpringRef()
	const start = useSpringRef()
	const end = useSpringRef()
	const transitions = useTransition(index, {
		ref: transRef,
		keys: null,
		config: { ...config.stiff },
		onStart: () => {
			setAnimationState(true)
		},
		from: {
			opacity: 1,
			position: [0, 0, 0],
			disks1: [-140, 9, -27],
			disks2: [-140, 9, 37],
			disks3: [140, 9, -27],
			disks4: [140, 9, 37],

			rotX: 0,
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
				opacity: 1,
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
					rotX: 0
				},
				to: {
					disks1: [-20, 9, -27],
					disks2: [-20, 9, 37],
					disks3: [20, 9, -27],
					disks4: [20, 9, 37],
					rotX: 1
				},
				opacity: 1,
				ref: view,
				config: { duration: 700, bounce: 0.6, mass: 4, tension: 270, friction: 126 },
				onRest: () => {
					setAnimationState(false)
				}
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
				opacity: 1,
				ref: end,
				onRest: () => {
					setAnimationState(false)
					setIsDefaultAnimation(true)
				}
			},
		],

	})
	useChain([start, view, end], [0, 1, 2], 2100)
	useEffect(() => {
		transRef.start()
	}, [index, transRef])
	return transitions
}

export default useWheelChangeAnimation