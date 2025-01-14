import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {}

const Wrapper: FC<WrapperProps> = (props) => {
    return (
        <div
            {...props}
            className={clsx(
                props.className,
                'w-full  p-2.5 grid  gap-5 grid-cols-12  grid-rows-12  h-full',
            )}
        >
            {props.children}
        </div>
    );
};

export default Wrapper;
