import FilterBar from '../ui/filter-bar';
import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { useForm } from '@rvf/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ColorPalette from '../ui/color-palette';
import CheckboxPalate from '../ui/checkbox-palate';
import PriceSlider from '../PriceSlider/PriceSlider';
import RVForm from '../ui/form';
import { useQuery } from '@tanstack/react-query';
import { useFilterStore } from '@/store/filter-store';

const MainFilterBar = () => {
    const validator = withZod(
        z.object({
            min: z.string().optional(),
            max: z.string().optional(),
        }),
    );



    const { filters, setFilters, selectedFilters, setPrice } = useFilterStore();
    console.log('selectedFilters', selectedFilters)

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
            setFilters({ colors, widths: result.widths, diameters: result.diameters, et: result.et, pcd: result.pcd });
            setPrice({ min: result.price.min, max: result.price.max });
            return result;
        },
    });

    return (
        <FilterBar className="rounded-t-sm border-r-[1px] border-dashed">
            <RVForm form={form} className='sticky h-fit top-[70px] '>
                <Accordion type="single" collapsible className='w-[300px]'>
                    {data && !isFetching && <AccordionItem value="price">
                        <AccordionTrigger>Price</AccordionTrigger>
                        <AccordionContent className='pt-10'>
                            <PriceSlider form={form} min={data.price.min} max={data.price.max} />
                        </AccordionContent>
                    </AccordionItem>}
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
                                    filterCategory='widths'
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
                                    filterCategory='diameters'
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
                                    filterCategory='et'
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
                                    filterCategory='pcd'
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
