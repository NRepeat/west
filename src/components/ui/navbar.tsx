import React, { FC, HTMLAttributes, useContext } from 'react';
import Menu from './nav-menu';
import CartMenu from './cart-menu';
import { NavLink } from 'react-router';
import { SessionContext } from '@/context/StoreSession';
import { Button } from './button';
import { Bookmark, User } from 'lucide-react';
import clsx from 'clsx';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './navigation-menu';
import { MenuIconA } from './menu';

interface NavbarProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const Navbar: FC<NavbarProps> = (props) => {
    const context = useContext(SessionContext);
    return (
        <nav
            {...props}
            className={clsx(props.className, 'flex  items-center  ')}
        >
            <Menu />
            <NavLink to={'/'} className="text-[42px] text-center  font-elianto">
                West custom
            </NavLink>
            {/* <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger >
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu> */}
            <div className=''>
                {context?.isAuthenticated ? (
                    <div>
                        <Button variant={'link'}>
                            <Bookmark className='h-8 w-8' />
                        </Button>
                        <NavLink to={'/account'} >
                            <Button variant={'link'}>
                                <User className='h-8 w-8' />
                            </Button>
                        </NavLink>
                    </div>
                ) : (
                    <NavLink to={'/auth'} >
                        <Button>
                            <User />
                        </Button>
                    </NavLink>

                )}
                <CartMenu />
            </div>
        </nav>
    );
};

export default Navbar;
