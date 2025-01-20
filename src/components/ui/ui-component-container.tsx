import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

interface UiComponentContainer extends HTMLAttributes<HTMLDivElement> { }
const UiComponentContainer: FC<UiComponentContainer> = (props) => {
    return (
        <div
            {...props}
            className={clsx(`p-2.5 bg-backgroundComponentContainer rounded-componentContainerRadius `, props.className,)}
        >
            {props.children}
        </div>
    );
};

export default UiComponentContainer;
