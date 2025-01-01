import React, { FC, HtmlHTMLAttributes } from 'react'
import Menu from './nav-menu'
import CartMenu from './cart-menu'

interface NavbarProps extends HtmlHTMLAttributes<HTMLDivElement> {
	children?:React.ReactNode
}


const Navbar:FC<NavbarProps> = (props) => {
		return (
				<nav {...props} className={`w-full px-2.5 py-2.5 grid grid-cols-3 h-[100px] items-center ${props.className}`}>
					<Menu/>
					<h1 className='text-[52px] font-SignPainter text-center '>West custom</h1>
					<CartMenu/>
					{props.children}
				</nav>
		)
}

export default Navbar