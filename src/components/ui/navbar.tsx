import React, { FC, HTMLAttributes, useContext, useEffect, useState } from 'react';
import CartMenu from './cart-menu';
import { NavLink } from 'react-router';
import { SessionContext } from '@/context/StoreSession';
import { Button } from './button';
import { Bookmark, LogIn, MenuIcon, Package, Rotate3d, User } from 'lucide-react';
import clsx from 'clsx';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from './navigation-menu';
import { ListItem } from './list-item';
import useStickyScroll from '@/hooks/sticky-scroll';

interface NavbarProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const Navbar: FC<NavbarProps> = (props) => {
    const [scrolled, setScrolled] = useState<boolean>(false)
    console.log('scrolled', scrolled)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const context = useContext(SessionContext);
    return (
        <nav
            {...props}
            className={clsx(props.className, 'flex   bg-white  items-center  rounded-sm  rounded-t-none justify-between p-2.5 sticky top-0  z-50', { "transition-all shadow-sm": scrolled })}
        >
            <NavLink to={'/'} className="text-4xl text-center  font-elianto">
                West custom
            </NavLink>
            <div className='flex items-center gap-2'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger >
                                <MenuIcon className='h-8 w-8' />
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className='gap-4'>
                                {context?.isAuthenticated ? (<>
                                    <ListItem href="/wish" title="Wish list" className='w-96'>
                                        <div className='flex gap-4 items-center pt-4'>
                                            <div className='h-full'>
                                                <Bookmark />
                                            </div>
                                            <p className='w-full' >
                                                Here you can find all the products you have saved for later
                                            </p>
                                        </div>
                                    </ListItem>
                                    <ListItem href="/account" title="Profile" className='w-96'>
                                        <div className='flex gap-4 items-center pt-4'>
                                            <div className='h-full'>
                                                <User className='h-8 w-8' />
                                            </div>
                                            <p className='w-full' >
                                                Account settings
                                            </p>
                                        </div>
                                    </ListItem>
                                </>) : (<>
                                    <ListItem href="/auth" title="Login" className='w-96'>
                                        <div className='flex gap-4 items-center pt-4'>
                                            <div className='h-full'>
                                                <LogIn className='h-8 w-8' />
                                            </div>
                                            <p className='w-full' >
                                                Login
                                            </p>
                                        </div>
                                    </ListItem>
                                </>)}
                                <ListItem href="/orders" title="Orders" className='w-96'>
                                    <div className='flex gap-4 items-center pt-4'>
                                        <div className='h-full'>
                                            <Package className='h-8 w-8' />
                                        </div>
                                        <p className='w-full' >
                                            Orders
                                        </p>
                                    </div>
                                </ListItem>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Button variant='ghost' className='px-4 py-2'>
                    <Rotate3d className='h-8 w-8' />
                </Button>

                <CartMenu />
            </div>

        </nav>
    );
};

export default Navbar;
