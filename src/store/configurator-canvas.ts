import { create } from 'zustand'
type Vehicle = 'porsche';
type WheelsPosition = [number, number, number]
type PositionByVehicle<T extends Vehicle> = {
	[key in T]: { default: WheelsPosition, new: WheelsPosition, old: WheelsPosition };
}
type RotationByVehicle<T extends Vehicle> = {
	[key in T]: WheelsPosition;
}
type AxisType = 'x' | 'y' | 'z'
type AnimationRange = [0, 1]
type AxisPositionType<T extends AxisType> = {
	[key in T]: AxisAnimationType;
}
type AxisPositionByVehicleType<T extends Vehicle> = {
	[key in T]: { default: AxisPositionType<AxisType>[], new: AxisPositionType<AxisType>[], old: AxisPositionType<AxisType>[] }
}
export type AxisAnimationType = [AnimationRange, [number, number]]
type AxisRotationType<T extends AxisType> = {
	[key in T]: AxisAnimationType;
}
type AxisRotationByVehicleType<T extends Vehicle> = {
	[key in T]: AxisRotationType<AxisType>[]
}
export type VehicleModalType = { isRotate: boolean, color: string, position: [number, number, number] }
export type WheelsModalType = { isRotate: boolean, color: string, position: PositionByVehicle<Vehicle>, rotation: RotationByVehicle<Vehicle>, axisPosition: AxisPositionByVehicleType<Vehicle>, axisRotation: AxisRotationByVehicleType<Vehicle> }

export type CurrentModelType = { currentPosition: CurrentModelPosition, newPosition: CurrentModelPosition | null, isAnimated: boolean }
interface ConfiguratorStoreState {
	vehicle: VehicleModalType
	wheels: WheelsModalType
	currentModel: { name: string, path: string, model: CurrentModelType }
	newModel: { name: string, path: string, model: CurrentModelType } | null
	setNewModel: (value: { name: string, path: string, model: CurrentModelType } | null) => void
	setCurrentModel: (value: { name: string, path: string, model: CurrentModelType }) => void
	models: { name: string, path: string, model: CurrentModelType }[]
	isNewWheelModelSet: boolean,
	setIsNewWheelModelSet: (value: boolean) => void
}

const positions: PositionByVehicle<Vehicle> = {
	porsche: {
		default: [
			[-21, 9, 37.5],
			[30, 9, 37.5],
			[-30, 9, -27.5],
			[30, 9, -27.5],
		],
		new: [
			[-30, 9, -147.5],
			[30, 9, 37.5],
			[-30, 9, -27.5],
			[30, 9, -27.5],
		],
		old: [
			[-30, 9, 30],
			[30, 9, 37.5],
			[-30, 9, -27.5],
			[30, 9, -27.5],
		],
	}

};
const defaultAnimationRange: AnimationRange = [0, 1]
const rotation: RotationByVehicle<Vehicle> = {
	porsche: [
		[0, 0, 0],
		[0, 3.125, 0],
		[0, 0, 0],
		[0, 3.125, 0],
	],

};
const axisPosition: AxisPositionByVehicleType<Vehicle> = {
	porsche: {
		default: [
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 120]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [-140, 0]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [140, 0]] }],
		new: [
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 185.5]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [-140, 0]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [140, 0]] }],
		old: [
			{ x: [defaultAnimationRange, [0, 0]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 185.5]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [-140, 0]] },
			{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [140, 0]] }]
	},

};
const axisRotation: AxisRotationByVehicleType<Vehicle> = {
	porsche: [
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] }],

};
const newWheelsPosition: CurrentModelPosition = {
	rotation: [
		[0, 0, 0],
		[0, 3.125, 0],
		[0, 0, 0],
		[0, 3.125, 0],
	], position: [
		[-21, 9, 37.5],
		[30, 9, 37.5],
		[-30, 9, -27.5],
		[30, 9, -27.5],
	], axisPosition: [
		{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 120]] },
		{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
		{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [-140, 0]] },
		{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [140, 0]] }],
	axisRotation: [
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
		{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] }]
}
const models: { name: string, path: string, model: CurrentModelType }[] = [
	{
		name: 'Disk 1', path: 'model/Disk1/disk.gltf', model: {
			isAnimated: false,
			currentPosition: {
				rotation: [
					[0, 0, 0],
					[0, 3.125, 0],
					[0, 0, 0],
					[0, 3.125, 0],
				], position: [
					[-30, 9, 37.5],
					[30, 9, 37.5],
					[-30, 9, -27.5],
					[30, 9, -27.5],
				], axisPosition: [
					{ x: [defaultAnimationRange, [10, 0]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [10, 10]] },
					{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [-140, 0]] },
					{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [140, 0]] }],
				axisRotation: [
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] }]
			},
			newPosition: null
		},
	},
	{
		name: 'Disk 2', path: 'model/Disk2/disk.gltf', model: {
			isAnimated: false,
			currentPosition: {
				rotation: [
					[0, 0, 0],
					[0, 3.125, 0],
					[0, 0, 0],
					[0, 3.125, 0],
				], position: [
					[-30, 9, 37.5],
					[30, 9, 37.5],
					[-30, 9, -27.5],
					[30, 9, -27.5],
				], axisPosition: [
					{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [-140, 0]] },
					{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [-140, 0]] },
					{ x: [defaultAnimationRange, [0, 9]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [140, 0]] }],
				axisRotation: [
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
					{ x: [defaultAnimationRange, [0, Math.PI * 1.3]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] }]
			},
			newPosition: null
		},
	},
];
const useConfiguratorStore = create<ConfiguratorStoreState>((set) => ({
	models,
	setIsNewWheelModelSet: (value) => set(() => ({
		isNewWheelModelSet: value,
	})),
	isNewWheelModelSet: false,
	vehicle: { isRotate: false, color: 'white', position: [0, 0, 0] },
	wheels: { isRotate: false, color: 'black', position: positions, rotation, axisPosition, axisRotation },
	currentModel: models[0],
	newModel: null,
	setCurrentModel: (value) =>
		set(() => ({
			currentModel: value,
		})),
	setNewModel: (value) =>
		set(() => ({
			newModel: value,
		})),
}));
export default useConfiguratorStore