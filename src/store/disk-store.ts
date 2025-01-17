import { create } from "zustand";
import { Vector3 } from "three";
import { DiskModel } from "@/context/Configurator";



type UseDiskStoreT = {
	disks: DiskModel[]
	selectedIndex: number,
	setIndex: (index: number) => void,

}
interface CanvasState {
	cameraPosition: Vector3
	defaultCameraPosition: Vector3,
	setCameraPosition: (position: Vector3) => void
	orbitControlBehavior: boolean,
	defaultAnimation: boolean,
	setIsDefaultAnimation: (isDefault: boolean) => void
	setOrbitControlBehavior: (is: boolean) => void
}

export const useBoxStore = create<UseDiskStoreT>((set) => ({
	disks: [
		{ name: '1', path: 'model/Disk1/disk.gltf' },
		{ name: '2', path: "model/Disk2/disk.gltf" },
		{ name: '2', path: "model/Disk2/disk.gltf" },
	],
	selectedIndex: 0,
	setIndex: (index) => set(() => ({ selectedIndex: index }))
}));
export const useStore = create<CanvasState>(set => ({
	cameraPosition: new Vector3(60, 19, 80),
	defaultCameraPosition: new Vector3(60, 19, 80),
	defaultAnimation: true,
	setIsDefaultAnimation: (isDefault) => set(() => ({ defaultAnimation: isDefault })),
	setCameraPosition: (position) => set(() => ({ cameraPosition: position })),
	setOrbitControlBehavior: (is) => set(() => ({ orbitControlBehavior: is })),
	orbitControlBehavior: false,
}))