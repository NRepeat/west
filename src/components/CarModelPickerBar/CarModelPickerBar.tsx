import { useState } from 'react';
import clsx from 'clsx';
import UiComponentContainer from '../ui/ui-component-container';
import { Button } from '../ui/button';

const CarModelPickerBar = () => {
    const [activeSlug, setActiveSlug] = useState<string>('porsche'); // Track the active button by its slug
    const buttons = [
        { name: 'Porsche', slug: 'porsche' },
        { name: 'Audi', slug: 'audi' },
    ];

    return (
        <UiComponentContainer className="gap-2 flex">
            {buttons.map((button) => (
                <CarModelPickerBarButton
                    key={button.slug}
                    name={button.name}
                    slug={button.slug}
                    active={activeSlug === button.slug}
                    onClick={() => setActiveSlug(button.slug)} // Update active button on click
                />
            ))}
        </UiComponentContainer>
    );
};

const CarModelPickerBarButton = ({
    name,
    slug,
    active,
    onClick,
}: {
    name: string;
    slug: string;
    active: boolean;
    onClick: () => void;
}) => {
    return (
        <Button
            variant="secondary"
            className={clsx('rounded-sm', {
                'cursor-default text-white bg-success hover:bg-success': active,
            })}
            onClick={onClick}
        >
            {name}
        </Button>
    );
};

export default CarModelPickerBar;
