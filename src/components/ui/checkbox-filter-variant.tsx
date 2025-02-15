import { FC, HTMLAttributes } from 'react';
import { Checkbox } from './checkbox';
import clsx from 'clsx';
import Icon from './icon';
import { FilterState, useFilterStore } from '@/store/filter-store';
import { useQueryClient } from '@tanstack/react-query';

export type FilterVariant = {
    id: string;
    value: string;
    name: string;
    slug: string;
    disabled: boolean;
    icon?: string;
};
type CheckboxFilterVariant = HTMLAttributes<HTMLDivElement>;

const CheckboxFilterVariant: FC<CheckboxFilterVariant & { variant: FilterVariant, selected: boolean, filterCategory: keyof FilterState["selectedFilters"] }> = ({
    variant,
    ...props
}) => {
    const { setSelectedFilters, selectedFilters } = useFilterStore();
    const queryClient = useQueryClient()
    const handleFilterSelect = (filterCategory: keyof FilterState["selectedFilters"], slug: string) => {
        // Create a copy of the selectedFilters object
        const updatedSelectedFilters = { ...selectedFilters };

        // Get the set of selected filters for the specific category
        const selectedSet = updatedSelectedFilters[filterCategory];

        console.log('variant.slug', slug);
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
        <div className="flex items-center">
            <label
                htmlFor={variant.slug}
                className={clsx(
                    'flex items-center space-x-2 w-full justify-between border-[2px] border-backgroundComponentContainer hover:border-input rounded-sm p-2.5 cursor-pointer',
                    props.className,
                    { 'border-input': props.selected } // Highlight when selected
                )}
            >
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={variant.slug}
                        disabled={variant.disabled}
                        value={variant.slug}
                        checked={props.selected}
                        onCheckedChange={() => handleFilterSelect(props.filterCategory, variant.slug)}

                    />
                    <span className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">
                        {variant.name}
                    </span>
                </div>
                {variant.icon && (
                    <Icon
                        className={clsx({ 'opacity-60': variant.disabled })}
                        src={variant.icon}
                        width="40"
                        height="40"
                    />
                )}
            </label>
        </div>
    );
};

export default CheckboxFilterVariant;
