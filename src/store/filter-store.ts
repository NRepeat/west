import { create } from "zustand";

type Color = { code: string; name: string; slug: string };

export type FilterState = {
	filters: {
		colors: Color[];
		widths: number[];
		diameters: number[];
		et: number[];
		pcd: number[];
	};
	sort: {
		[key: string]: { name: string, value: string };
	}
	selectedFilters: {
		widths: Set<string>;
		diameters: Set<string>;
		colors: Set<string>;
		et: Set<string>;
		pcd: Set<string>;
	};
	price: { min: number; max: number };
	setPrice: (price: FilterState["price"]) => void;
	setSelectedFilters: (newFilters: FilterState["selectedFilters"]) => void;
	setFilters: (newFilters: FilterState["filters"]) => void;
	updateFilter: <T extends keyof FilterState["filters"]>(
		filterName: T,
		value: FilterState["filters"][T]
	) => void;
	resetFilters: () => void;
	mobileFilterOpen: boolean;
	setMobileFilterOpen: (open: boolean) => void;
	setSort: (sort: string) => void;
	selectedSort: string
	page: number
	setPage: (page: number) => void
	startFetching: boolean,
	setStartFetching: (start: boolean) => void
};

export const useFilterStore = create<FilterState>((set) => ({
	page: 1,
	setStartFetching: (start) => set({ startFetching: start }),
	startFetching: false,
	setPage: (page) => set({ page }),
	selectedSort: "price-asc",
	setSort: (sort) => set({ selectedSort: sort }),
	sort: {
		"price-asc": { name: "Price: Low to High", value: "price-asc" },
		"price-desc": { name: "Price: High to Low", value: "price-desc" },
		"newest": { name: "Newest", value: "newest" },
		"oldest": { name: "Oldest", value: "oldest" },
	},
	mobileFilterOpen: false,
	setMobileFilterOpen: (open) => set({ mobileFilterOpen: open }),
	price: { min: 0, max: 0 },

	filters: {
		colors: [],
		widths: [],
		diameters: [],
		et: [],
		pcd: [],

	},
	selectedFilters: {
		widths: new Set(),
		diameters: new Set(),
		colors: new Set(),
		et: new Set(),
		pcd: new Set(),
	},
	setSelectedFilters: (newFilters) => set({ selectedFilters: newFilters }),

	setFilters: (newFilters) => set({ filters: newFilters }),

	updateFilter: (filterName, value) =>
		set((state) => ({
			filters: {
				...state.filters,
				[filterName]: value,
			},
		})),
	setPrice: (price) => set({ price }),
	resetFilters: () =>
		set({
			price: { min: 0, max: 0 },
			selectedFilters: {
				widths: new Set(),
				diameters: new Set(),
				colors: new Set(),
				et: new Set(),
				pcd: new Set(),
			},
		}),
}));
