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
	slug: string;
	images: string[];
	thumbnail: string;
	price: number;
} & ProductProps

export interface ProductT extends ProductVariant {
	uuid: string;
	slug: string;
	id: number;

	images: string[];
	thumbnail: string;
	"price": number,
	"width": string,
	"weight": string,
	"diameter": string,
	"et": string,
	"pcd": string,
	"created_at": string,
	"updated_at": string,
	products: [{
		"productId": number,
		"productVariantId": number,
		"product": {
			"id": number,
			"uuid": string,
			"slug": string,
			"description": string,
			"title": string,
			"created_at": string,
			"updated_at": string
		}
	}]
}

export interface Image {
	base64: string;
	originalName: string;
	isThumbnail: boolean;
}