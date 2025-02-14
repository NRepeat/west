import { FormApi } from '@rvf/react';
import { Card, CardContent } from '../ui/card';
import { FromInput } from '../ui/form-input';
import { FC, useEffect, useState } from 'react';
import { DualRangeSlider } from '../ui/slider';
import { useFilterStore } from '@/store/filter-store'; // Import store
import { z } from 'zod';

interface PriceSliderProps {
    form: FormApi<any>;
    min: number;
    max: number;
}

const PriceSlider: FC<PriceSliderProps> = ({ form, max, min }) => {
    const { price, setPrice } = useFilterStore(); // Get filters and updateFilter
    console.log('price', price)
    const [values, setValues] = useState([price.min, price.max]); // Use the values from the store

    useEffect(() => {
        form.setValue('min', values[0]);
        form.setValue('max', values[1]);

        setPrice({ min: values[0], max: values[1] });
    }, [values, form, setPrice]);

    const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = z.coerce.number().safeParse(e.target.value);
        if (value.success) {
            setValues((prev) => [value.data, prev[1]]);
        }
    };

    const handleChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = z.coerce.number().safeParse(e.target.value);
        if (value.success) {
            setValues((prev) => [prev[0], value.data]);
        }
    };

    return (
        <Card>
            <CardContent className="h-auto flex flex-col gap-2">
                <div className="h-full flex items-center p-2">
                    <DualRangeSlider
                        label={(value) => <span>{value}</span>} // Adjust label if needed
                        value={values}
                        onValueChange={setValues}
                        min={min}
                        max={max}
                        step={1}
                    />
                </div>
                <div className="flex w-full box-border p-2 gap-4 justify-between items-center">
                    <FromInput
                        scope={form.scope('min')}
                        label={'From'}
                        islabelvisible={true}
                        placeholder=""
                        name="min"
                        min={0}
                        handleChangeValue={handleChangeMin}
                    />
                    <FromInput
                        scope={form.scope('max')}
                        label={'To'}
                        islabelvisible={true}
                        placeholder=""
                        name="max"
                        value={values[1]}
                        max={max}
                        handleChangeValue={handleChangeMax}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default PriceSlider;
