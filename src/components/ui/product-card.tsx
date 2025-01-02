import { FC, HTMLAttributes } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import ImageWrapper from './image-wrapper'
import { AudiImg } from '@/assets'
import { Color, Pallet } from './color-palette'

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
	isHorizontal: boolean
}
type ProductProps = {
	color: Color,
	width: string,
	weight: string,
	diameter: string,
	et: string,
	pcd: string
}
export type ProductT = {
	title: string,
	description?: string,
	slug: string,
	props: ProductProps

}
const ProductCard: FC<ProductCardProps & { product: ProductT }> = ({ isHorizontal, product, ...props }) => {
	return (
		<Card {...props} className='p-4  col-span-4 rounded-sm hover:store-cad-shadow' >
			<CardHeader className='p-0'>
				<ImageWrapper src={AudiImg} alt='audi' className='min-w-full justify-center flex items-center w-full' imgHeight='190' imgWidth='230' />
				<CardTitle className='text-lg pt-3.5'>{product.title}</CardTitle>
				{product.description &&
					<CardDescription>{product.description}</CardDescription>
				}
			</CardHeader>
			<CardContent className='mt-3.5 flex w-full'>
				<div className="flex flex-col w-full gap-2.5 first-letter:uppercase">
					{Object.keys(product.props).map((key) => {
						const typedKey = key as keyof typeof product.props;
						return (
							<div key={typedKey} className="flex ">
								<div className="w-24 flex  items-center font-bold ">
									<span className='first-letter:uppercase'>
										{typedKey}
									</span>
								</div>
								{typedKey === 'color' && <div className='w-full flex justify-center'>  <Pallet className='w-[200px]' color={product.props[typedKey]} />  </div>}
								{typedKey !== 'color' && <div className='w-full text-center'>   {String(product.props[typedKey])} </div>}

							</div>
						);
					})}
				</div>


			</CardContent>
		</Card >
	)
}

export default ProductCard