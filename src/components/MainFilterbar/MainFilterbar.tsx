import FilterBar from '../ui/filter-bar';
import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { useForm } from '@rvf/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ColorPalette from '../ui/color-palette';
import CheckboxPalate from '../ui/checkbox-palate';
import { Audi } from '@/assets';
import PriceSlider from '../PriceSlider/PriceSlider';
import RVForm from '../ui/form';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { f } from 'node_modules/react-router/dist/development/fog-of-war-BhhVTjSZ.d.mts';
import { Color } from '@/shared/types';

const MainFilterBar = () => {
    const validator = withZod(
        z.object({
            min: z.string().optional(),
            max: z.string().optional(),
        }),
    );



    const [filters, setFilter] = useState<{
        colors: Color[];
        widths: number[];
        diameters: number[];
        et: number[];
        pcd: number[];
        price: { min: number; max: number };
    }>({ colors: [], widths: [], diameters: [], et: [], pcd: [], price: { min: 0, max: 0 } });
    console.log('filters', filters)
    const form = useForm({
        validator,
        defaultValues: { min: 1, max: 0 },
    });

    const { data, isFetching } = useQuery({
        queryKey: ['getProductsFilters'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/product/products/filters`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('result', result)
            const colors = result.colors.map((color: string) => {
                return JSON.parse(color);
            })
            setFilter({ colors, widths: result.widths, diameters: result.diameters, et: result.et, pcd: result.pcd, price: result.price });
            form.setValue({ max: result.price.max });
            return result;
        },
    });

    return (
        <FilterBar className="rounded-t-sm border-r-[1px] border-dashed">
            <RVForm form={form} className='sticky h-fit top-[70px] '>
                <Accordion type="single" collapsible className='w-[300px]'>
                    <AccordionItem value="price">
                        <AccordionTrigger>Price</AccordionTrigger>
                        <AccordionContent className='pt-10'>
                            <PriceSlider form={form} min={filters.price.min} max={filters.price.max} />
                        </AccordionContent>
                    </AccordionItem>
                    {filters.colors?.length > 0 && (
                        <AccordionItem value="colors">
                            <AccordionTrigger>Color</AccordionTrigger>
                            <AccordionContent>
                                <ColorPalette colors={filters.colors}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )}

                    {filters.widths.length > 0 && (
                        <AccordionItem value="widths">
                            <AccordionTrigger>Width</AccordionTrigger>
                            <AccordionContent>
                                <CheckboxPalate
                                    variants={filters.widths.map((width, index) => ({
                                        id: index.toString(),
                                        name: `${width}`,
                                        value: width.toString(),
                                        disabled: false,
                                        slug: width.toString(),
                                    }))}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )}

                    {filters.diameters.length > 0 && (
                        <AccordionItem value="diameters">
                            <AccordionTrigger>Diameter</AccordionTrigger>
                            <AccordionContent>
                                <CheckboxPalate
                                    variants={filters.diameters.map((diameter, index) => ({
                                        id: index.toString(),
                                        name: `${diameter}`,
                                        disabled: false,
                                        value: diameter.toString(),
                                        slug: diameter.toString(),
                                    }))}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )}

                    {filters.et.length > 0 && (
                        <AccordionItem value="et">
                            <AccordionTrigger>ET</AccordionTrigger>
                            <AccordionContent>
                                <CheckboxPalate
                                    variants={filters.et.map((et, index) => ({
                                        id: index.toString(),
                                        name: `${et}`,
                                        disabled: false,
                                        value: et.toString(),
                                        slug: et.toString(),
                                    }))}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )}

                    {filters.pcd.length > 0 && (
                        <AccordionItem value="pcd">
                            <AccordionTrigger>PCD</AccordionTrigger>
                            <AccordionContent>
                                <CheckboxPalate
                                    variants={filters.pcd.map((pcd, index) => ({
                                        id: index.toString(),
                                        disabled: false,
                                        name: `${pcd}`,
                                        value: pcd.toString(),
                                        slug: pcd.toString(),
                                    }))}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )}



                </Accordion>
            </RVForm>
        </FilterBar>
    );
};

export default MainFilterBar;
