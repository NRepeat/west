import { FilterState, useFilterStore } from '@/store/filter-store';
import { Button } from './button';
import { CarouselItem } from './carousel';
import { X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const ActiveFilterButton = ({ slug, name }: { slug: string; name: keyof FilterState["selectedFilters"] }) => {
    const { selectedFilters, setSelectedFilters } = useFilterStore();
    const queryClient = useQueryClient()
    const handleFilterSelect = (filterCategory: keyof FilterState["selectedFilters"], slug: string) => {
        const updatedSelectedFilters = { ...selectedFilters };
        const selectedSet = updatedSelectedFilters[filterCategory];
        selectedSet.delete(slug);
        setSelectedFilters(updatedSelectedFilters);
        queryClient.invalidateQueries({ queryKey: ['getProducts'] })
    };

    return (
        <CarouselItem >
            <Button
                onClick={() => handleFilterSelect(name, slug)}
                variant={'ghost'}
                className="capitalize rounded-sm items-center flex gap-4 hover:border-input border-[2px] border-white px-2.5 py-2 "
            >
                <span className="text-[1rem]">{slug}</span>
                <X />
            </Button>
        </CarouselItem>
    );
};

export default ActiveFilterButton;
