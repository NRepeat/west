import { PositionType } from "@/components/Models/Disk";
import { create } from "zustand";
import { AxisAnimationType } from "./configurator-canvas";

type Args = [number, number, number]
export type Position = {
	position: PositionType;
	// rotation: PositionType;
	// rotationX: AxisAnimationType;
	// positionZ: AxisAnimationType;
	// positionX: AxisAnimationType;
}
type ModelType = {
	position: Position
	color: string
	name: string
	opacity: number
	scale: number,
	args: Args,
	path: string,
	onClick?: () => void
}

interface DiskModelType extends ModelType {
	material?: string
}
type UseDiskStoreT = {
	disks: DiskModelType[]
	selectedIndex: number,
	setIndex: (index: number) => void,

}
export const useBoxStore = create<UseDiskStoreT>((set) => ({
	disks: [
		{ name: '1', color: 'green', position: { position: [0, 0, 0] }, opacity: 0, args: [1, 1, 1], scale: 1, path: 'model/Disk1/disk.gltf' },
		{ name: '2', color: 'red', position: { position: [0, 0, 0] }, opacity: 0, args: [1, 1, 1], scale: 1, path: "model/Disk2/disk.gltf" },

	],
	selectedIndex: 0,
	setIndex: (index) => set(() => ({ selectedIndex: index }))
}));