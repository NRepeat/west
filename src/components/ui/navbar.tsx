import React, { FC, HTMLAttributes } from 'react';
import Menu from './nav-menu';
import CartMenu from './cart-menu';
import { NavLink } from 'react-router';

interface NavbarProps extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const Navbar: FC<NavbarProps> = (props) => {
    return (
        <nav
            {...props}
            className={`w-full  py-2.5 grid grid-cols-3 h-[100px] items-center ${props.className}`}
        >
            <Menu />
            <NavLink to={'/'} className="text-[42px] font-Playwrite text-center ">West custom</NavLink>
            <CartMenu />
            {props.children}
        </nav>
    );
};

export default Navbar;
