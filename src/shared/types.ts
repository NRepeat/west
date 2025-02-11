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
	color: Color
}
export type Color = { code: string; slug: string; name: string };
type ProductVariant = {
	uuid: string;
	description: string;
	slug: string;
	images: string[];
	thumbnail: string;
	price: number;
} & ProductProps

export interface ProductT extends ProductVariant {
	slug: string;
	title: string;
	uuid: string;
	description: string;
	variants: ProductVariant[]

}

export interface Image {
	base64: string;
	originalName: string;
	isThumbnail: boolean;
}