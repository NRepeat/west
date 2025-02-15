
export async function fetchProducts({ queryKey }: {
	queryKey: [string, {
		page: number, selectedSort: string, serializedFilters: {
			widths: string[];
			diameters: string[];
			colors: string[];
			et: string[];
			pcd: string[];
		}, price: {
			min: number;
			max: number;
		}
	}]
}) {
	const [_, { page, price, selectedSort, serializedFilters }] = queryKey;
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const response = await fetch(
		`http://localhost:3000/product/products?page=${page}&sort=${selectedSort}&filters=${JSON.stringify(serializedFilters)}&price=${JSON.stringify(price)}`
	);

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const data = await response.json();
	return data;
}