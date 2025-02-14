import CheckboxFilterVariant, { FilterVariant } from './checkbox-filter-variant';
import { Card, CardContent } from './card';
import { FilterState, useFilterStore } from '@/store/filter-store';

const CheckboxPalate = ({ variants, filterCategory }: { variants: FilterVariant[], filterCategory: keyof FilterState["selectedFilters"] }) => {
    const { selectedFilters } = useFilterStore();
    if (!variants.length) return null;
    return (
        <Card>
            <CardContent className="grid grid-cols-2 gap-4">
                {variants.map((variant) => (
                    <CheckboxFilterVariant key={variant.id} variant={variant} selected={selectedFilters[filterCategory].has(variant.slug)} filterCategory={filterCategory} />
                ))}
            </CardContent>
        </Card>
    );
};

export default CheckboxPalate;
