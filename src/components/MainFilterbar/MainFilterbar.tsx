import FilterBar from '../ui/filter-bar';
import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { useForm } from '@rvf/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ColorPalette from '../ui/color-palette';
import CheckboxPalate from '../ui/checkbox-palate';
import PriceSlider from '../PriceSlider/PriceSlider';
import RVForm from '../ui/form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FilterState, useFilterStore } from '@/store/filter-store';
import SheetMenu from '../Menu/Menu';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const MainFilterBar = () => {
    const validator = withZod(
        z.object({
            min: z.string().optional(),
            max: z.string().optional(),
        }),
    );



    const { filters, setFilters, setPrice, mobileFilterOpen, setMobileFilterOpen, selectedFilters, setSelectedFilters } = useFilterStore();
    const queryClient = useQueryClient()
    const form = useForm({
        validator,
        defaultValues: { min: 1, max: 0 },
    });
    const filtersKeys = Object.keys(selectedFilters);
    const activeFilters = filtersKeys.flatMap((key) => ({ group: key, value: Array.from(selectedFilters[key as keyof typeof selectedFilters]) }));
    const { data, isFetching } = useQuery({
        queryKey: ['getProductsFilters'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/product/products/filters`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            const colors = result.colors.map((color: string) => {
                return JSON.parse(color);
            })
            setFilters({ colors, widths: result.widths, diameters: result.diameters, et: result.et, pcd: result.pcd });
            setPrice({ min: result.price.min, max: result.price.max });
            return result;
        },
    });

    const handleFilterSelect = (filterCategory: keyof FilterState["selectedFilters"], slug: string) => {
        const updatedSelectedFilters = { ...selectedFilters };
        const selectedSet = updatedSelectedFilters[filterCategory];
        selectedSet.delete(slug);
        setSelectedFilters(updatedSelectedFilters);
        queryClient.invalidateQueries({ queryKey: ['getProducts'] })
    };


    const ActiveButtons = () => {
        return activeFilters.flatMap((filter) => (
            filter.value.map((value) => (<Button
                onClick={() => handleFilterSelect(filter.group as keyof FilterState["selectedFilters"], value)}
                variant={'ghost'}
                className="capitalize rounded-sm items-center flex gap-4 hover:border-input border-[2px] border-white px-2.5 py-2 "
            >
                <span className="text-[1rem]">{value}</span>
                <X />
            </Button>))
        ));
    }
    return (
        <>
            <SheetMenu
                onOpenChange={setMobileFilterOpen}
                open={mobileFilterOpen}
                className="bg-input overflow-auto pr-2.5"
                side={'left'}
                header="Filters"
                footer={<></>}

            >
                <FilterBar className="rounded-t-sm  min-w-[250px] ">
                    <RVForm form={form} className='sticky h-fit top-[70px] flex-1 '>
                        <Accordion type="single" collapsible className='w-full '>
                            <AccordionItem value="active" >
                                <AccordionTrigger className=''>Active filters</AccordionTrigger>
                                <AccordionContent className='flex flex-wrap '>
                                    <ActiveButtons />
                                </AccordionContent>
                            </AccordionItem>
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
            </SheetMenu>
            <FilterBar className="rounded-t-sm border-r-[1px] border-dashed min-w-[250px] lg:flex hidden">
                <RVForm form={form} className='sticky h-fit top-[70px] flex-1 '>
                    <Accordion type="single" collapsible className='w-full max-w-[250px]'>
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
        </>

    );
};

export default MainFilterBar;
