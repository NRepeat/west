import ActiveFilterButton from '../ui/active-filter-button';
import { Carousel, CarouselContent } from '../ui/carousel';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { FilterState, useFilterStore } from '@/store/filter-store';
const FilterActiveBar = ({ activeFilters }: {
    activeFilters: { group: string, value: string[] }[], price: {
        min: number;
        max: number;
    }
}) => {

    const { resetFilters } = useFilterStore();
    const ActiveButtons = () => {
        return activeFilters.flatMap((filter) => (
            filter.value.map((value) => (<ActiveFilterButton key={value} slug={value} name={filter.group as keyof FilterState["selectedFilters"]} />))
        ));
    }
    const handleClearFilters = () => {
        resetFilters()
    }
    const isFilterActive = activeFilters.flatMap((filter) => (
        filter.value.map((value) => value)))


    return (
        <div className="items-center gap-2   w-full   px-2.5  md:flex hidden ">
            <div className="flex items-center gap-2 py-2 flex-1  overflow-hidden ">
                <Carousel className={clsx("w-full")} opts={{ dragFree: true, }}>
                    <CarouselContent className=" lg:max-w-[200px] xl:max-w-[200px] 2xl:w-[100%] max-w-[100px]">
                        <ActiveButtons />
                    </CarouselContent>
                </Carousel>
            </div>
            {isFilterActive.length > 0 &&
                <Button onClick={handleClearFilters} variant={'ghost'} className="flex items-center p-1">
                    <X />
                </Button>
            }
        </div>
    );
};

export default FilterActiveBar;
