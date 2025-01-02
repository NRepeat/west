import UiComponentContainer from '../ui/ui-component-container'
import FilterActiveBar from '../FilterActiveBar/FilterActiveBar'
import clsx from 'clsx'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import Icon from '../ui/icon'
import { Grid } from '@/assets'
import { Button } from '../ui/button'
import ProductCard, { ProductT } from '../ui/product-card'
const MainStoreGrid = () => {
	const products: ProductT[] = [{ title: "Anthracite 8.5 J x 20 Audi Q5", props: { color: { code: '43464B', name: "Gray", slug: "gray" }, diameter: 'R20', et: "ER35", pcd: "5x114.3", weight: "200", width: "8.5" }, slug: "Anthracite-8.5-J-x-20-Audi-Q5" }, { title: "Anthracite 8.5 J x 20 Audi Q5", props: { color: { code: '43464B', name: "Gray", slug: "gray" }, diameter: 'R20', et: "ER35", pcd: "5x114.3", weight: "200", width: "8.5" }, slug: "Anthracite-8.5-J-x-20-Audi-Q5" }, { title: "Anthracite 8.5 J x 20 Audi Q5", props: { color: { code: '43464B', name: "Gray", slug: "gray" }, diameter: 'R20', et: "ER35", pcd: "5x114.3", weight: "200", width: "8.5" }, slug: "Anthracite-8.5-J-x-20-Audi-Q5" }, { title: "Anthracite 8.5 J x 20 Audi Q5", props: { color: { code: '43464B', name: "Gray", slug: "gray" }, diameter: 'R20', et: "ER35", pcd: "5x114.3", weight: "200", width: "8.5" }, slug: "Anthracite-8.5-J-x-20-Audi-Q5" }]
	return (
		<UiComponentContainer className={clsx(' col-span-9 col-start-4 flex justify-start items-center   box-content flex-col')}>
			<div className='flex items-center w-full'>
				<FilterActiveBar activeFilters={[{ slug: "Gray" }, { slug: "Cast" }, { slug: "Audi" }, { slug: "Min" }, { slug: "Max" }]} />
				<div className='flex  justify-end gap-4 pl-2.5'>
					<Select >
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
					<Button variant={'ghost'} className='flex items-center p-1'>
						<Icon src={Grid} width='30' height='30' />
					</Button>
				</div>

			</div>
			<div className='grid  grid-cols-12 justify-start w-full gap-4  pt-2'>
				{products.map(product => <ProductCard key={product.slug} isHorizontal product={product} />)}
			</div>
		</UiComponentContainer>
	)
}

export default MainStoreGrid