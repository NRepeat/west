import CheckboxFilterVariant, { FilterVariant } from './checkbox-filter-variant';
import { Card, CardContent } from './card';

const CheckboxPalate = ({ variants }: { variants: FilterVariant[] }) => {
    if (!variants.length) return null; // Если нет вариантов, не рендерим компонент

    return (
        <Card>
            <CardContent className="grid grid-cols-2 gap-4">
                {variants.map((variant) => (
                    <CheckboxFilterVariant key={variant.id} variant={variant} />
                ))}
            </CardContent>
        </Card>
    );
};

export default CheckboxPalate;
