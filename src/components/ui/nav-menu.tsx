import Button from "./button"
import MenuIcon from '../../assets/Menu.svg'
const NavMenu = () => {
	return (
		<div className='font-Porsche flex justify-start items-center'>
			<Button className="gap-2">
				<img className="w-12 h-12" src={MenuIcon} alt="menu-icon" />
				<span className="text-2xl text-center">Menu</span>
			</Button>
		</div>
	)
}

export default NavMenu