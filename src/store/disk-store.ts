import { create } from "zustand";
import { DiskModel } from "@/context/Configurator";



type UseDiskStoreT = {
	disks: DiskModel[]
	selectedIndex: number,
	setIndex: (index: number) => void,

}


export const useBoxStore = create<UseDiskStoreT>((set) => ({
	disks: [
		{ name: 'Anthracite-8.5-J-x-20-Audi-Q1', path: 'model/Disk1/disk.gltf',   title: 'Anthracite 8.5 J x 20 Audi Q1',
			props: {
							color: { code: '43464B', name: 'Gray', slug: 'gray' },
							diameter: 'R20',
							et: 'ER35',
							pcd: '5x114.3',
							weight: '200',
							width: '8.5',
			},
			slug: 'Anthracite-8.5-J-x-20-Audi-Q1',},
		{ name: 'Anthracite-8.5-J-x-20-Audi-Q2', path: "model/Disk2/disk.gltf",   title: 'Anthracite 8.5 J x 20 Audi Q2',
			props: {
							color: { code: '43464B', name: 'Gray', slug: 'gray' },
							diameter: 'R20',
							et: 'ER35',
							pcd: '5x114.3',
							weight: '200',
							width: '8.5',
			},
			slug: 'Anthracite-8.5-J-x-20-Audi-Q2', },
		{ name: 'Anthracite-8.5-J-x-20-Audi-Q6', path: "model/Disk2/disk.gltf" ,   title: 'Anthracite 8.5 J x 20 Audi Q6',
			props: {
							color: { code: '43464B', name: 'Gray', slug: 'gray' },
							diameter: 'R20',
							et: 'ER35',
							pcd: '5x114.3',
							weight: '200',
							width: '8.5',
			},
			slug: 'Anthracite-8.5-J-x-20-Audi-Q6',},
	],
	selectedIndex: 0,
	setIndex: (index) => set(() => ({ selectedIndex: index }))
}));
