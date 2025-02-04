export interface IUser {
	provider: string
	email: string
	password?: string
	name?: string
}

export type ProductProps = {
	width: string;
	weight: string;
	diameter: string;
	et: string;
	pcd: string;
	color: string;
}

type ProductVariant = {
	uuid: string;
	description: string;
	slug: string;
	images: string[];
	thumbnail: string;
	price: number;
} & ProductProps

export interface ProductT {
	slug: string;
	uuid: string;
	variants: ProductVariant[]
}