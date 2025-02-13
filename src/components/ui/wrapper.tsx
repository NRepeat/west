import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

interface WrapperProps extends HTMLAttributes<HTMLDivElement> { }

const Wrapper: FC<WrapperProps> = (props) => {
    return (
        <div
            {...props}
            className={clsx(
                props.className,
                ' flex ',
            )}
        >
            {props.children}
        </div>
    );
};

export default Wrapper;
