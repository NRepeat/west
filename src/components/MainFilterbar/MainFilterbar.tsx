import FilterBar from '../ui/filter-bar'
import { withZod } from '@rvf/zod';
import { z } from "zod";
import { useForm } from '@rvf/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ColorPalette from '../ui/color-palette';
import CheckboxPalate from '../ui/checkbox-palate';
import { Audi } from '@/assets';
import PriceSlider from '../PriceSlider/PriceSlider';
import RVForm from '../ui/form';

const MainFilterBar = () => {
	const validator = withZod(
		z.object({
			min: z.string().optional(),
			max: z.string().optional()
		}),
	)
	const form = useForm({
		validator,
		defaultValues: { min: 0, max: 100 }
	});
	return (
		<FilterBar className="col-span-3  gap-5 box-content ">
			{/* <Search label="search" /> */}
			<RVForm form={form} >
				<Accordion type="single" collapsible className='px-2.5 box-content'>
					<AccordionItem value="item-1" >
						<AccordionTrigger className='pt-2.5'>Color</AccordionTrigger>
						<AccordionContent>
							<ColorPalette colors={[{ code: '999999', name: "Gray", slug: "gray" }, { code: 'FFD966', name: "Yellow", slug: "yellow" }, { code: '000000', name: "Black", slug: "black" }]} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2" >
						<AccordionTrigger>Material</AccordionTrigger>
						<AccordionContent>
							<ColorPalette colors={[{ code: '43464B', name: "Gray", slug: "gray" }, { code: 'FFD966', name: "Yellow", slug: "yellow" }, { code: '000000', name: "Black", slug: "black" }]} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3" >
						<AccordionTrigger>Manufacturer</AccordionTrigger>
						<AccordionContent>
							<CheckboxPalate variants={[{ disabled: false, id: '1', name: "BMW", slug: "BMW", value: 'bmv', icon: Audi }, { disabled: false, id: '2', name: "Mercedes", slug: "Mercedes", value: 'mercedes', icon: Audi }, { disabled: true, id: '3', name: "Audi", slug: "audi", value: 'audi', icon: Audi }]} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4" >
						<AccordionTrigger>Price</AccordionTrigger>
						<AccordionContent>
							<PriceSlider form={form} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</RVForm>

		</FilterBar>
	)
}

export default MainFilterBar