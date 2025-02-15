import { fetchProducts } from "@/api/query/products";
import { ProductT } from "@/shared/types";
import { useFilterStore } from "@/store/filter-store";
import { useQuery } from "@tanstack/react-query";

// Сериализуем фильтры в массивы
const serializeFilters = (filters: {
	widths: Set<string>;
	diameters: Set<string>;
	colors: Set<string>;
	et: Set<string>;
	pcd: Set<string>;
}) => ({
	widths: Array.from(filters.widths),
	diameters: Array.from(filters.diameters),
	colors: Array.from(filters.colors),
	et: Array.from(filters.et),
	pcd: Array.from(filters.pcd),
});

export const useProducts = () => {
	const { selectedFilters, price, page, selectedSort } = useFilterStore();

	const serializedFilters = serializeFilters(selectedFilters);



	const res = useQuery({
		queryKey: ['getProducts', { page, selectedSort, serializedFilters, price }],
		queryFn: fetchProducts,
	});


	const data = res.data as { products: ProductT[], total: number, page: number, totalPages: number };

	return { ...res, data }
};


