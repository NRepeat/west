import { DiskModel } from '@/context/Configurator'
import clsx from 'clsx'
import React, { FC } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import CharacteristicsCard from '../ui/characteristics-card'
import { Card, CardContent } from '../ui/card'
import ImageWrapper from '../ui/image-wrapper'
import { AudiImg } from '@/assets'
import { useConfiguratorStore } from '@/store/configurator-store'
import { Vector3 } from 'three'
import { TierButtonsProps } from './ConfiguratorCanva'
import Search from '../ui/search'

const Sidebar: FC<{ products: DiskModel[] }> = ({ products }) => {

	return (
		<div className='flex gap-2 flex-col overflow-auto  '>
			<Search label='' />
			<div className={clsx('grid  grid-cols-2  gap-2')}>
				{products.map((product: DiskModel, index: number) => <ProductsCard product={product} index={index} />)}
			</div>
		</div>
	)
}

export default Sidebar

const ProductsCard = ({ product, index }: { product: DiskModel, index: number }) => {
	const setSelectedIndex = useConfiguratorStore(state => state.setSelectedIndex)
	const isAnimationStarted = useConfiguratorStore(state => state.isAnimationStarted)
	const selectedIndex = useConfiguratorStore(state => state.selectedIndex)
	const cameraConfig = useConfiguratorStore(state => state.cameraConfig)
	const handleChangePosition = ({ position, defaultAnimation }: TierButtonsProps) => {
		cameraConfig.setCameraPosition(new Vector3(...position))
		cameraConfig.setIsDefaultAnimation(defaultAnimation)
	}
	const handleClick = (index: number, position: Vector3) => {
		if (selectedIndex === index || isAnimationStarted) return
		handleChangePosition({ defaultAnimation: false, position })
		setSelectedIndex(index)
	}
	return <HoverCard>
		<HoverCardTrigger asChild>
			<Card
				onClick={() => handleClick(index, cameraConfig.defaultCameraPosition)}
				className={clsx("hover:border-input border-2 border-white rounded-sm overflow-hidden p-2.5 cursor-pointer", { 'border-input cursor-default': index === selectedIndex })}
			>
				<CardContent className="flex flex-col items-center gap-2.5 ">
					<ImageWrapper
						options={{
							delayTime: 100,
							effect: 'opacity',
							wrapperProps: {
								style: { transitionDelay: '100' },
							},
						}}
						src={AudiImg}
						alt="img"
						imgWidth="200"
						className="min-h-[100px] w-full"
					/>
					<p className="w-full text-lg text-center">{product.title}</p>
				</CardContent>
			</Card>
		</HoverCardTrigger>
		<HoverCardContent className="w-[350px]">
			<CharacteristicsCard isHorizontal={false} props={product.props} />
		</HoverCardContent>
	</HoverCard>
}