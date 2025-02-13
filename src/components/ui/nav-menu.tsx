import { useNavigate } from 'react-router';
import SheetMenu from '../Menu/Menu';
import { Button } from './button';
import { useSheetMenu } from '@/hooks/use-sheet-menu';
import { MenuIcon } from './menu';
const NavMenu = () => {
    const [isOpen, setIsOpen] = useSheetMenu();
    const nav = useNavigate();
    const handleNav = (path: string) => {
        setIsOpen(false);
        nav('/' + path);
    };
    return (
        <SheetMenu
            onOpenChange={setIsOpen}
            open={isOpen}
            side={'left'}
            header="Menu"
            trigger={
                <Button variant={'ghost'} className=" hover:bg-transparent">
                    <MenuIcon />
                </Button>
            }
        >
            <Button onClick={() => handleNav('wish')} >
                Wish list
            </Button>
            <Button onClick={() => handleNav('configuration')} >
                Configuration
            </Button>
            <Button onClick={() => handleNav('favorite')} >
                FAQ
            </Button>
        </SheetMenu>
    );
};

export default NavMenu;
