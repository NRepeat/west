import { AudiImg, Bitcoin, DepthEffect, Paypal } from '@/assets'
import UiComponentContainer from '../ui/ui-component-container'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from '../ui/carousel/withchildren/Carousel'
import CharacteristicsCard from '../ui/characteristics-card'
import Icon from '../ui/icon'
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Button } from '../ui/button'
import { lazy, startTransition, Suspense, useState } from 'react'
import clsx from 'clsx'
import DLoader from '../ui/skeletons/3d'
import ImageWrapper from '../ui/image-wrapper'
const DView = lazy(() =>
	import('../DView/DView')
)
const ProductSingleCard = () => {
	const [isPointerDown, setPointerDown] = useState<boolean>(false)
	const [isComponentVisible, setComponentVisible] = useState(false);
	const OPTIONS: EmblaOptionsType = { loop: true }
	const SLIDE_COUNT = 5


	const SLIDES = Array.from(Array(SLIDE_COUNT).fill(<div className='flex w-full justify-center items-center'>
		<ImageWrapper src={AudiImg} alt='audi' options={{
			delayTime: 100,
			effect: "opacity",
			wrapperProps: {
				style: { transitionDelay: "100" },
			}
		}}
		/>
	</div>))



	const handleShowComponent = () => {
		startTransition(() => {
			setComponentVisible(prev => !prev);
		});
	};


	const product = { title: "Anthracite 8.5 J x 20 Audi Q5", props: { color: { code: '43464B', name: "Gray", slug: "gray" }, diameter: 'R20', et: "ER35", pcd: "5x114.3", weight: "200", width: "8.5" }, slug: "Anthracite-8.5-J-x-20-Audi-Q5" }
	return (
		<UiComponentContainer className={clsx('min-h-s', { 'select-none': isPointerDown })}>
			<div className='grid gap-4 grid-cols-12 grid-row-6 p-2.5'>
				<div className='col-span-4 relative max-w-[650px] rounded-md overflow-hidden'>
					{<Button onClick={() => handleShowComponent()} variant={'link'} className='absolute right-0 p-0 z-50'>
						<Icon src={DepthEffect} width='40' height='40' />
					</Button>
					}
					{
						isComponentVisible ?
							<Suspense fallback={<DLoader height={400} width={200} isResponsive />}>
								<DView setPointerDown={setPointerDown} />
							</Suspense> :
							<LazyLoadComponent onLoad={() => handleShowComponent()} placeholder={<DLoader height={400} width={200} isResponsive />}>
								<EmblaCarousel slides={SLIDES} options={OPTIONS} setPointerDown={setPointerDown} />
							</LazyLoadComponent>
					}
				</div>
				<div className='col-start-5 col-span-4 grid-flow-col min-w-[300px]'>
					<h2 className='font-bold text-2xl'>Anthracite 8.5 J x 20 Audi Q5</h2>
					<div className='pt-4 text-lg'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia labore excepturi magnam earum aspernatur sed ut officia reiciendis impedit iure, porro id rerum repellendus explicabo mollitia cumque autem! Esse, laudantium.
					</div>
				</div>

				<div className='flex flex-col gap-10 col-start-9 col-span-4'>
					<h3 className='font-bold text-2xl'>Characteristics</h3>
					<div className='flex flex-col gap-2'>
						<CharacteristicsCard props={product.props} isHorizontal={false} />
					</div>
					<div className='inline-flex items-center p-2.5  justify-between w-full px-2.5'>
						<p className='font-bold text-2xl flex items-center h-full'>
							300 $
						</p>
						<div className='flex gap-1'>
							<Button variant={'link'} className='p-0'>
								<Icon src={Paypal} width='40' height='40' />
							</Button>
							<Button variant={'link'} className='p-0'>
								<Icon src={Bitcoin} width='40' height='40' />
							</Button>
						</div>

					</div>
					<div className='flex flex-col w-full gap-2 rounded-sm'>
						<Button variant={'ghost'} className='text-xl font-bold h-[50px]'> Add to cart </Button>
						<Button variant={'success'} className='text-xl font-bold h-[50px]'> Buy </Button>

					</div>
				</div>
			</div>

		</UiComponentContainer>
	)
}

export default ProductSingleCard

