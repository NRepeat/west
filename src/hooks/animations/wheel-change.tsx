import useConfiguratorStore from "@/store/configurator-canvas"
import { useChain, useSpring, useSpringRef } from "@react-spring/core"
type UseWheelChangeAnimationType = {
	toggle?: boolean
	isNew?: boolean
}
export const useNewWheelChangeAnimation = ({ toggle, isNew }: UseWheelChangeAnimationType) => {
	const newXApi = useSpringRef();
	const { setIsNewWheelModelSet } = useConfiguratorStore();
	const newZApi = useSpringRef();
	const [{ x }] = useSpring(
		{
			from: { x: 0 }, to: { x: 1 }, config: { mass: 5, tension: 100, friction: 50 }, ref: newXApi, onRest: () => {
				setIsNewWheelModelSet(true)
			},
		},
		[toggle]
	);
	const [{ rotX }] = useSpring(
		{
			from: { rotX: 0 }, to: { rotX: 1 },
			config: { mass: 5, tension: 100, friction: 50 },
			ref: newZApi,
		},

		[toggle]
	);
	const [{ z }] = useSpring(

		{ from: { z: 0 }, to: { z: 1 }, config: { mass: 5, tension: 100, friction: 50 }, ref: newZApi },
		[toggle]
	);
	useChain(
		[newZApi, newXApi],
		[0, 1], 1500
	);
	return { rotationX: rotX, positionX: x, positionZ: z }
}
const useWheelChangeAnimation = ({ toggle, isNew }: UseWheelChangeAnimationType) => {

	const springApi = useSpringRef();
	const ZApi = useSpringRef();
	const [{ x }] = useSpring(
		{
			from: { x: 0 }, to: { x: 1 }, config: { mass: 5, tension: 100, friction: 50 }, ref: springApi, onRest: () => {
				console.log('Z animation ended');
			},
		},
		[toggle]
	);
	const [{ rotX }] = useSpring(
		{
			from: { rotX: 0 }, to: { rotX: 1 },
			config: { mass: 5, tension: 100, friction: 50 },
			ref: ZApi,
		},

		[toggle]
	);
	const [{ z }] = useSpring(
		{ from: { z: 0 }, to: { z: 1 }, config: { mass: 5, tension: 100, friction: 50 }, ref: ZApi },
		[toggle]
	);

	useChain(
		[ZApi, springApi],
		[0, 1], 1500
	);
	return { rotationX: rotX, positionX: x, positionZ: z }
}

export default useWheelChangeAnimation