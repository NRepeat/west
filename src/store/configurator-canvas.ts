import { PositionType } from '@/components/Models/Disk';
import { create } from 'zustand'
type Vehicle = 'porsche' | 'audi';

type PositionByVehicle<T extends Vehicle> = {
	[key in T]: Array<[number, number, number]>;
}
type RotationByVehicle<T extends Vehicle> = {
	[key in T]: Array<[number, number, number]>;
}
type AxisType = 'x' | 'y' | 'z'
type AnimationRange = [0, 1]
type AxisPositionType<T extends AxisType> = {
	[key in T]: [AnimationRange, [number, number]];
}
type AxisPositionByVehicleType<T extends Vehicle> = {
	[key in T]: AxisPositionType<AxisType>
}

export type VehicleModalType = { isRotate: boolean, color: string, position: PositionType }
export type WheelsModalType = { isRotate: boolean, color: string, position: PositionByVehicle<Vehicle>, rotation: RotationByVehicle<Vehicle>, axisPosition: AxisPositionByVehicleType<Vehicle> }

interface ConfiguratorStoreState {
	vehicle: VehicleModalType
	wheels: WheelsModalType
}

const positions: PositionByVehicle<Vehicle> = {
	porsche: [
		[-30, 9, 38],
		[30, 9, 38],
		[-30, 9, -28],
		[30, 9, -28],
	],
	audi: [
		[-30, 9, 20],
		[0, 9, 0],
		[0, 9, 0],
		[0, 9, 0],
	],
};
const defaultAnimationRange: AnimationRange = [0, 1]
const rotation: RotationByVehicle<Vehicle> = {
	porsche: [
		[0, 0, 0],
		[0, 3.125, 0],
		[0, 0, 0],
		[0, 3.125, 0],
	],
	audi: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	],
};
const axisPosition: AxisPositionByVehicleType<Vehicle> = {
	porsche: { x: [defaultAnimationRange, [0, 0]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
	audi: { x: [defaultAnimationRange, [0, 0]], y: [defaultAnimationRange, [0, 0]], z: [defaultAnimationRange, [0, 0]] },
};
const useConfiguratorStore = create<ConfiguratorStoreState>((set) => ({
	vehicle: { isRotate: false, color: 'white', position: [0, 0, 0] },
	wheels: { isRotate: false, color: 'black', position: positions, rotation, axisPosition },

}));
export default useConfiguratorStore