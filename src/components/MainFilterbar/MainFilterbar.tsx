import React from 'react'
import FilterBar from '../ui/filter-bar'
import { withZod } from '@rvf/zod';
import { z } from "zod";
import { useForm } from '@rvf/react';
import Search from '../ui/search';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ColorPalette from '../ui/color-palette';
import CheckboxPalate from '../ui/checkbox-palate';
import { Audi } from '@/assets';

const MainFilterBar = () => {
	const validator = withZod(
		z.object({
			value: z.string().min(1),
		}),
	)
	const form = useForm({
		validator,
	});
	return (
		<FilterBar className="col-start-1 row-start-2 gap-5 max-w-[400px]">
			<Search form={form} label="search" type="value" />
			<Accordion type="single" collapsible className='px-2.5'>
				<AccordionItem value="item-1" >
					<AccordionTrigger>Color</AccordionTrigger>
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
			</Accordion>

		</FilterBar>
	)
}

export default MainFilterBar