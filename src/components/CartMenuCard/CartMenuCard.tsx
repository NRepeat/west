import React, { FC } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import ImageWrapper from '../ui/image-wrapper'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'

type CartMenuCardProps = {
	title: string,
	quantity: number,
	slug: string
	img: string
	price: number
}

const CartMenuCard: FC<CartMenuCardProps> = ({ quantity, slug, title, img, price }) => {
	const nav = useNavigate()
	const handleNav = (path: string) => {
		nav("/product/" + path)
	}
	return (
		<Card onClick={() => handleNav(slug)} className='rounded-md p-2.5 border-2 hover:border-inputBorderHover cursor-pointer'>
			<CardContent className='flex justify-center items-center '>
				<ImageWrapper src={img} options={{
					delayTime: 100,
					effect: 'opacity',
					wrapperProps: {
						style: { transitionDelay: '100' },
					},
				}} alt={slug} />
				<div className='flex flex-shrink flex-col w-3/4 gap-2.5'>
					<CardTitle className='text-2xl pb-2.5'>{title}</CardTitle>
					<div className='flex gap-1'>
						<Button>+</Button>
						<Input value={quantity} />
						<Button>-</Button>

					</div>
					<p className='bg-black text-white font-bold rounded-sm p-2.5 text-center'>
						{price * quantity}

					</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default CartMenuCard