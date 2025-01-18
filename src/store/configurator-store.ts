import { Vector3 } from 'three'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
	isAnimationStarted: boolean
	selectedIndex: number
	fullScreen: boolean
	cameraConfig: {
		defaultCameraPosition: Vector3
		cameraPosition: Vector3
		timeoutTime: number
		defaultAnimation: boolean,
		setCameraPosition: (position: Vector3) => void
		setIsDefaultAnimation: (isDefault: boolean) => void
	}
	orbitControlBehaviorConfig: {
		orbitControlBehavior: boolean,
		setOrbitControlBehavior: (is: boolean) => void
	}

}

type Actions = {
	setAnimationState: (isAnimationStarted: boolean) => void
	setSelectedIndex: (index: number) => void
	setFullScreen: (isFullScreen: boolean) => void
}

export const useConfiguratorStore = create<State & Actions>()(
	immer((set) => ({
		fullScreen: false,
		setFullScreen: (isFullScreen) => set((state) => { state.fullScreen = isFullScreen }),
		cameraConfig: {
			defaultCameraPosition: new Vector3(60, 19, 80),
			cameraPosition: new Vector3(60, 19, 80),
			defaultAnimation: true,
			setCameraPosition: (position) => set((state) => { state.cameraConfig.cameraPosition = position }),
			setIsDefaultAnimation: (isDefault) => set((state) => { state.cameraConfig.defaultAnimation = isDefault }),
			timeoutTime: 1400
		},
		orbitControlBehaviorConfig: {
			orbitControlBehavior: false,
			setOrbitControlBehavior: (is) => set((state) => { state.orbitControlBehaviorConfig.orbitControlBehavior = is }),
		},
		selectedIndex: 0,
		setSelectedIndex: (index) => set((state) => { state.selectedIndex = index }),
		isAnimationStarted: false,
		setAnimationState: (isAnimationStarted: boolean) => set((state) => { state.isAnimationStarted = isAnimationStarted }),
	})),
)
