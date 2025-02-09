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
const MainStoreGrid = ({ isWishCard = false }: { isWishCard?: boolean }) => {
    const data = useQuery({
        queryKey: ['getProducts'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/product/products/`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json() as ProductT[]
            console.log('data', data)
            if (!data) {
                throw new Error('Product not found');
            }

            return data
        }
    })
    console.log('data', data)

    const [scrolled] = useStickyScroll({ option: { scrollStart: 165 } });
    const [gridView, setGridView] = useState<boolean>(false);
    const handleGridView = () => {
        setGridView((prev) => !prev);
    };
    return (
        <UiComponentContainer
            className={clsx(' flex justify-start items-center   box-content flex-col')}
        >
            <div
                className={clsx('flex items-center w-full sticky top-0 z-10 bg-white', {
                    'shadow-md rounded-sm': scrolled,
                })}
            >
                <FilterActiveBar
                    activeFilters={[
                        { slug: 'Gray' },
                        { slug: 'Cast' },
                        { slug: 'Audi' },
                        { slug: 'Min' },
                        { slug: 'Max' },
                    ]}
                />
                <div className="flex  justify-end gap-4 pl-2.5">
                    <Select>
                        <SelectTrigger className="w-[180px]">
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

                <div className="grid  grid-cols-12 justify-start w-full gap-4  pt-2 ">
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
