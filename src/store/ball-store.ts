import { create } from "zustand";


type useBoxStore = {
	boxs: { name: string; color: string; defaultPosition: [number, number, number], opacity: number }[]
	setBoxs: (boxs: { name: string; color: string; defaultPosition: [number, number, number] }[]) => void
}
export const useBoxStore = create<useBoxStore>((set) => ({
	boxs: [
		{ name: '1', color: 'green', defaultPosition: [0, 0, 0], opacity: 1 },
		{ name: '2', color: 'red', defaultPosition: [-4, 0, 0], opacity: 0 },
		{ name: '3', color: 'black', defaultPosition: [-4, 0, 0], opacity: 0 },
	],

	// setBoxs: () =>
	// 	set((state) => {
	// 		const lastb = state.boxs[state.boxs.length - 1];
	// 		const newArr = [lastb, ...state.boxs.slice(0, -1)];
	// 		return ({
	// 			boxs: [...newArr],
	// 		})
	// 	}),
	setBoxs: (boxs) => set({ boxs }),
}));