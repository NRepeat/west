import { MenuIcon } from '../../assets';
import SheetMenu from '../Menu/Menu';
import { Button } from './button';
import Icon from './icon';
const NavMenu = () => {
    return (
        <>
            <SheetMenu
                side={'left'}
                header="Menu"
                trigger={
                    <div className="font-SignPainter flex justify-start items-center px-2.5">
                        <Button variant={'ghost'} className="">
                            <Icon src={MenuIcon} height="40" width="40" alt="menu-icon" />
                            {/* <span className='text-2xl text-center'>Menu</span> */}
                        </Button>
                    </div>
                }
            >
                <Button variant={'success'}>Wish list</Button>
                <Button variant={'success'}>Configuration</Button>
                <Button variant={'success'}>Faq</Button>
            </SheetMenu>
        </>
    );
};

export default NavMenu;
