import { AudiImg, Bitcoin, Paypal } from '@/assets'
import UiComponentContainer from '../ui/ui-component-container'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from '../ui/carousel/withchildren/Carousel'
import CharacteristicsCard from '../ui/characteristics-card'
import Icon from '../ui/icon'
import { Button } from '../ui/button'
const ProductSingleCard = () => {
	const OPTIONS: EmblaOptionsType = { loop: true }
	const SLIDE_COUNT = 5
	const SLIDES = Array.from(Array(SLIDE_COUNT).fill(<div className='flex w-full justify-center items-center'>
		<img src={AudiImg} alt='audi' className=' ' />
	</div>))
	console.log('SLIDES', SLIDES)
	const product = { title: "Anthracite 8.5 J x 20 Audi Q5", props: { color: { code: '43464B', name: "Gray", slug: "gray" }, diameter: 'R20', et: "ER35", pcd: "5x114.3", weight: "200", width: "8.5" }, slug: "Anthracite-8.5-J-x-20-Audi-Q5" }
	return (
		<UiComponentContainer>
			<div className='grid gap-4 grid-cols-12 grid-row-6 p-2.5'>
				<div className='col-span-3 '>
					<EmblaCarousel slides={SLIDES} options={OPTIONS} />
				</div>
				<div className='col-start-5 col-span-4 grid-flow-col'>
					<h2 className='font-bold text-lg'>Anthracite 8.5 J x 20 Audi Q5</h2>
					<div className='pt-4 '>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia labore excepturi magnam earum aspernatur sed ut officia reiciendis impedit iure, porro id rerum repellendus explicabo mollitia cumque autem! Esse, laudantium.
					</div>
				</div>

				<div className='flex flex-col gap-4 col-start-9 col-span-4'>
					<h3 className='font-bold text-lg'>Characteristics</h3>
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
						<Button variant={'ghost'} className='text-xl font-bold'> Add to cart </Button>
						<Button variant={'success'} className='text-xl font-bold bg-[#325039] text-white'> Buy </Button>

					</div>
				</div>
			</div>

		</UiComponentContainer>
	)
}

export default ProductSingleCard