import { create } from 'zustand';

interface DashboardControlState {
    vehicle: { isRotate: boolean; color: string; defaultColor: string };
    wheels: { isRotate: boolean; color: string; isChange: boolean; defaultColor: string };
    setVehicleRotation: (isRotate: boolean) => void;
    setVehicleColor: (color: string) => void;
    setWheelsRotation: (isRotate: boolean) => void;
    setWheelsColor: (color: string) => void;
    setWheelsChange: (isRotate: boolean) => void;
}

const useDashboardControlStore = create<DashboardControlState>((set) => ({
    vehicle: { isRotate: false, color: 'black', defaultColor: 'black' },
    wheels: { isRotate: false, color: 'black', defaultColor: 'black', isChange: false },
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
    setWheelsChange: (isChange) =>
        set((state) => ({
            wheels: { ...state.wheels, isChange },
        })),
    setWheelsColor: (color) =>
        set((state) => ({
            wheels: { ...state.wheels, color },
        })),
}));
export default useDashboardControlStore;
