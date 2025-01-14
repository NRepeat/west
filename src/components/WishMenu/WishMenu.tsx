import React from 'react';
import SheetMenu from '../Menu/Menu';
import { Button } from '../ui/button';
import Icon from '../ui/icon';
import { WishListIcon } from '@/assets';

const WishMenu = () => {
    return (
        <SheetMenu
            side={'right'}
            header="Cart"
            trigger={
                <div className="font-SignPainter flex justify-start items-center">
                    <Button variant={'ghost'}>
                        <Icon src={WishListIcon} height="30" width="30" alt="wish-list-icon" />
                    </Button>
                </div>
            }
        ></SheetMenu>
    );
};

export default WishMenu;
