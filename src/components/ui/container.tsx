import React, { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children, ...props }) => {

    return (
        <div
            className={cn(
                'bg-backgroundContainer xl:px-[200px] md:px-10 lg:px-10 ',
                props.className,
            )}
        >
            {children}
        </div>

    );
};

export default Container;
