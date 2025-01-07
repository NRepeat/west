import React from 'react'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Card, CardContent } from '../ui/card'
import ImageWrapper from '../ui/image-wrapper'
import { AudiImg } from '@/assets'
import { ProductT } from '../ui/product-card'
import { products } from '../MainStoreGrid/MainStoreGrid'
import CharacteristicsCard from '../ui/characteristics-card'
import { NavLink, useNavigate } from 'react-router'
const SimilarProducts = () => {
	const Cards = () => products.map(product => <SimilarProductsCard product={product} />)
	return (
		<div className='flex flex-wrap gap-2'><Cards /></div>
	)
}

export default SimilarProducts

const SimilarProductsCard = ({ product }: { product: ProductT }) => {
	const nav = useNavigate()
	const handleNav = (slug: string) => {
		console.log('slug', slug)
		nav(`/product/${slug}`)
	}
	return <>
		<HoverCard >
			<HoverCardTrigger asChild>
				<NavLink to={`/product/${product.slug}`} className={'flex-1'} prefetch={'intent'}>
					<Card onClick={() => handleNav(product.slug)} className='flex-1 min-h-[200px] hover:border-input border-2 border-white rounded-sm overflow-hidden p-2.5'>
						<CardContent className='flex flex-col items-center gap-2.5 '>
							<ImageWrapper src={AudiImg} alt='img' imgWidth='200' className='min-h-[200px] ' />
							<p className='w-full text-lg text-center'>
								{product.title}
							</p>
						</CardContent>
					</Card>
				</NavLink>

			</HoverCardTrigger>
			<HoverCardContent className='w-[350px]'>
				<CharacteristicsCard isHorizontal={false} props={product.props} />
			</HoverCardContent>
		</HoverCard>
	</>
}