import { FC } from 'react';
import { Card, CardContent } from './card';
import clsx from 'clsx';
import { Color } from '@/shared/types';
import { FilterState, useFilterStore } from '@/store/filter-store';
import { useQueryClient } from '@tanstack/react-query';

interface ColorPaletteProps {
    colors: Color[];
}

export const Pallet = ({ color, className, selected }: { color: Color; className?: string, selected: boolean }) => {
    const { setSelectedFilters, selectedFilters } = useFilterStore();
    const queryClient = useQueryClient()
    const handleFilterSelect = (filterCategory: keyof FilterState["selectedFilters"], slug: string) => {
        // Create a copy of the selectedFilters object
        const updatedSelectedFilters = { ...selectedFilters };

        // Get the set of selected filters for the specific category
        const selectedSet = updatedSelectedFilters[filterCategory];

        if (selectedSet.has(slug)) {
            selectedSet.delete(slug); // Remove if already selected
        } else {
            selectedSet.add(slug); // Add if not selected
        }

        // Update the store with the updated selectedFilters object
        setSelectedFilters(updatedSelectedFilters);
        queryClient.invalidateQueries({ queryKey: ['getProducts'] });
    };


    return (
        <div
            onClick={() => handleFilterSelect('colors', color.slug)}
            className={clsx(
                'flex flex-col cursor-pointer gap-2.5 border-[2px] border-backgroundComponentContainer hover:border-input rounded-sm p-2.5',
                { 'border-input': selected },
                className
            )}
        >
            <div
                style={{ backgroundColor: color.code }}
                className="min-w-12 min-h-10 rounded-sm"
            ></div>
            <div className="inline-flex items-center justify-between w-full">
                <span className="text-lg">
                    {color.name ? color.name : color.slug.toUpperCase()}
                </span>
            </div>
        </div>
    );
};

const ColorPalette: FC<ColorPaletteProps> = ({ colors }) => {
    const { selectedFilters } = useFilterStore();
    const Palets = colors.map((color) => <Pallet key={color.code} color={color} selected={selectedFilters.colors.has(color.slug)} />);

    return (
        <Card>
            <CardContent className="grid grid-cols-2 gap-4">{colors && Palets}</CardContent>
        </Card>
    );
};

export default ColorPalette;
