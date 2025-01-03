import { MenuIcon } from "../../assets"
import { Button } from "./button"
import Icon from "./icon"
const NavMenu = () => {
	return (
		<div className='font-SignPainter flex justify-start items-center px-2.5'>
			<Button variant={'ghost'} className="gap-2 px-0 hover:bg-transparent">
				<Icon src={MenuIcon} height="40" width="40" alt="menu-icon" />
				<span className="text-2xl text-center">Menu</span>
			</Button>
		</div>
	)
}

export default NavMenu