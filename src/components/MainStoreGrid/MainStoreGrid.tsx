import UiComponentContainer from '../ui/ui-component-container';
import FilterActiveBar from '../FilterActiveBar/FilterActiveBar';
import clsx from 'clsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import ProductCard from '../ui/product-card';
import { useState } from 'react';
import { GripIcon } from '../ui/grip';
import { LayoutPanelTopIcon } from '../ui/layout-panel-top';
import useStickyScroll from '@/hooks/sticky-scroll';
import { useQuery } from '@tanstack/react-query';
import { ProductT } from '@/shared/types';
import { useFilterStore } from '@/store/filter-store';
import { Filter } from 'lucide-react';
const MainStoreGrid = ({ isWishCard = false }: { isWishCard?: boolean }) => {
    const data = useQuery({
        queryKey: ['getProducts'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/product/products`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json() as ProductT[]
            if (!data) {
                throw new Error('Product not found');
            }

            return data
        }
    })
    const { selectedFilters, price, setMobileFilterOpen, mobileFilterOpen } = useFilterStore();
    const [scrolled, setScrolled] = useState<boolean>(false)
    useStickyScroll({ option: { scrollStart: 50 }, setScrolled });
    const [gridView, setGridView] = useState<boolean>(false);
    const handleGridView = () => {
        setGridView((prev) => !prev);
    };
    const activeFilters = [...Array.from(selectedFilters.colors), ...Array.from(selectedFilters.diameters), ...Array.from(selectedFilters.et), ...Array.from(selectedFilters.pcd), ...Array.from(selectedFilters.widths)];
    const handleMobileFilter = () => {
        setMobileFilterOpen(true)
    }
    return (
        <UiComponentContainer
            className={clsx(' flex justify-start items-center  flex-col w-full px-2.5 py-2')}
        >
            <div
                className={clsx('flex items-center w-full justify-between sticky top-[70px] z-10 p-2 bg-white  ', {
                    'shadow-md rounded-sm': scrolled,
                })}
            >
                <Button className='lg:hidden block  ' variant={'ghost'} onClick={handleMobileFilter}>
                    <Filter />
                </Button>

                <FilterActiveBar
                    price={price}
                    activeFilters={activeFilters}
                />

                <div className="flex  justify-end gap-4 pl-2.5 ">
                    <Select>
                        <SelectTrigger className="sm:w-[100px] w-full flex gap-4 items-center">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleGridView}
                        variant={'ghost'}
                        className="flex items-center p-1"
                    >
                        {!gridView ? <GripIcon /> : <LayoutPanelTopIcon />}
                    </Button>
                </div>
            </div>
            {data.isSuccess &&
                <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-2 justify-start w-full gap-4  pt-2  ">
                    {data.data.map((product) => (
                        <ProductCard
                            isWishCard={isWishCard}
                            key={product.slug}
                            isHorizontal={gridView}
                            product={product}
                        />
                    ))}
                </div>
            }

        </UiComponentContainer>
    );
};

export default MainStoreGrid;
