import { create } from 'zustand'

interface DashboardControlState {
	vehicle: { isRotate: boolean, color: string }
	wheels: { isRotate: boolean, color: string }
	setVehicleRotation: (isRotate: boolean) => void;
	setVehicleColor: (color: string) => void;
	setWheelsRotation: (isRotate: boolean) => void;
	setWheelsColor: (color: string) => void;
}

const useDashboardControlStore = create<DashboardControlState>((set) => ({
	vehicle: { isRotate: false, color: 'white' },
	wheels: { isRotate: false, color: 'black' },
	setVehicleRotation: (isRotate) =>
		set((state) => ({
			vehicle: { ...state.vehicle, isRotate },
		})),
	setVehicleColor: (color) =>
		set((state) => ({
			vehicle: { ...state.vehicle, color },
		})),
	setWheelsRotation: (isRotate) =>
		set((state) => ({
			wheels: { ...state.wheels, isRotate },
		})),
	setWheelsColor: (color) =>
		set((state) => ({
			wheels: { ...state.wheels, color },
		})),
}));
export default useDashboardControlStore