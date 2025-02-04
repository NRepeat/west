import React, { FC, HTMLAttributes, useContext } from 'react';
import Menu from './nav-menu';
import CartMenu from './cart-menu';
import { NavLink } from 'react-router';
import { SessionContext } from '@/context/StoreSession';
import { Button } from './button';
import ImageWrapper from './image-wrapper';
import Icon from './icon';
import { WishListIcon } from '@/assets';
import { User } from 'lucide-react';

interface NavbarProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const Navbar: FC<NavbarProps> = (props) => {
    const context = useContext(SessionContext);
    return (
        <nav
            {...props}
            className={`w-full  py-2.5 grid grid-cols-3 h-[100px] items-center ${props.className}`}
        >
            <Menu />
            <NavLink to={'/'} className="text-[42px] font-Playwrite text-center ">
                West custom
            </NavLink>
            <div className='flex justify-end'>
                {context?.isAuthenticated ? (
                    <>
                        <Button variant={'link'}>
                            <Icon src={WishListIcon} />
                        </Button>
                        <NavLink to={'/acount'} className="">
                            <Button variant={'link'}>
                                Acount
                            </Button>
                        </NavLink>
                    </>
                ) : (
                    <NavLink to={'/auth'} className="">
                        <Button>
                            <User />
                        </Button>
                    </NavLink>

                )}
                <CartMenu />

            </div>

            {props.children}
        </nav>
    );
};

export default Navbar;
