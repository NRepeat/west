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
import { useFilterStore } from '@/store/filter-store';
import { Filter } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { useProducts } from '@/hooks/useProducts';



const MainStoreGrid = ({ isWishCard = false }: { isWishCard?: boolean }) => {
    const { selectedFilters, price, setMobileFilterOpen, sort, setSort, setPage } = useFilterStore();
    const [scrolled, setScrolled] = useState<boolean>(false)
    useStickyScroll({ option: { scrollStart: 50 }, setScrolled });
    const [gridView, setGridView] = useState<boolean>(false);
    const { data, isLoading, isError } = useProducts();
    const handleGridView = () => {
        setGridView((prev) => !prev);
    };

    const filtersKeys = Object.keys(selectedFilters);
    const filters = filtersKeys.flatMap((key) => ({ group: key, value: Array.from(selectedFilters[key as keyof typeof selectedFilters]) }));

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
                    activeFilters={filters}
                />

                <div className="flex  justify-end gap-4 pl-2.5 ">
                    <Select onValueChange={(value) => setSort(value)}>
                        <SelectTrigger className="lg:w-[200px] sm:w-[200px] flex gap-4 items-center">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(sort).map((key) => (
                                <SelectItem
                                    key={key}
                                    value={sort[key as keyof typeof sort].value}
                                >
                                    {sort[key as keyof typeof sort].name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleGridView}
                        variant={'ghost'}
                        className="flex items-center p-1"
                    >
                        {gridView ? <GripIcon /> : <LayoutPanelTopIcon />}
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <div className="grid h-screen lg:grid-cols-3 md:grid-cols-2 grid-cols-2 justify-start w-full gap-4 pt-2 animate-pulse">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="bg-gray-200 h-64 w-full rounded-lg"></div>
                    ))}
                </div>
            ) : (
                data && (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 justify-start w-full gap-4 pt-2 transition-opacity duration-300">
                        {data.products.map((product) => (
                            <ProductCard
                                isWishCard={isWishCard}
                                key={product.slug}
                                isHorizontal={gridView}
                                product={product}
                            />
                        ))}
                    </div>
                )
            )}
            <Pagination>
                <PaginationContent>
                    {data && data?.totalPages > 1 && <>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        {Array.from({ length: data.totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink onClick={() => setPage(index + 1)}>{index + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </>}
                </PaginationContent>
            </Pagination>
        </UiComponentContainer>
    );
};

export default MainStoreGrid;
