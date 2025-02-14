import { CloseIcon } from '@/assets';
import { Button } from './button';
import Icon from './icon';
import { CarouselItem } from './carousel';
import clsx from 'clsx';
import { X } from 'lucide-react';

const ActiveFilterButton = ({ slug, isCarousel }: { slug: string; isCarousel: boolean }) => {
    return (
        <CarouselItem className={clsx({ '': isCarousel }, '  ')}>
            <Button
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
