import React, { FC, useCallback } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import clsx from 'clsx';
type SHEET_SIDES = 'top' | 'right' | 'bottom' | 'left';

interface MenuProps {
    trigger: React.ReactNode;
    header?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    side?: SHEET_SIDES;
    className?: string;
    open?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

const SheetMenu: FC<MenuProps> = ({
    trigger,
    header,
    children,
    footer,
    side = 'right',
    className,
    open = false,
    onOpenChange,
}) => {
    const handleOpenChange = useCallback(() => {
        if (onOpenChange) {
            onOpenChange(!open);
        }
    }, [onOpenChange, open]);

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side={side} className={clsx(className)}>
                <SheetHeader>
                    <SheetTitle className="w-full flex justify-center text-2xl">{header}
                    </SheetTitle>
                </SheetHeader>
                <div className="w-full flex flex-col gap-2 pt-5">{children}</div>
                {footer && (
                    <SheetFooter className="w-full pt-5">
                        <SheetClose asChild>{footer}</SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};


export default SheetMenu;
