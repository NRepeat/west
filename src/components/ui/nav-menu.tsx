import { useNavigate } from 'react-router';
import { MenuIcon } from '../../assets';
import SheetMenu from '../Menu/Menu';
import { Button } from './button';
import Icon from './icon';
import { useSheetMenu } from '@/hooks/use-sheet-menu';
const NavMenu = () => {
    const [isOpen, setIsOpen] = useSheetMenu();
    const nav = useNavigate()
    const handleNav = (path: string) => {
        setIsOpen(false)
        nav('/' + path);
    };
    return (
        <SheetMenu
            onOpenChange={setIsOpen}
            open={isOpen}
            side={'left'}
            header="Menu"
            trigger={
                <div className="font-SignPainter flex justify-start items-center px-2.5">
                    <Button variant={'ghost'} className="">
                        <Icon src={MenuIcon} height="40" width="40" alt="menu-icon" />
                    </Button>
                </div>
            }
        >
            <Button onClick={() => handleNav('favorite')} variant={'success'}>Wish list</Button>
            <Button onClick={() => handleNav('configuration')} variant={'success'}>Configuration</Button>
            <Button onClick={() => handleNav('favorite')} variant={'success'}>FAQ</Button>
        </SheetMenu>
    );
};

export default NavMenu;
