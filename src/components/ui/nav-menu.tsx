import { useNavigate } from 'react-router';
import SheetMenu from '../Menu/Menu';
import { Button } from './button';
import { useSheetMenu } from '@/hooks/use-sheet-menu';
import { Menu } from 'lucide-react';
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
                <div className="font-SignPainter flex justify-start items-center px-2.5">
                    <Button variant={'ghost'} className="h-12 w-12 p-0 hover:bg-transparent">
                        {/* <Icon src={MenuIcon}  alt="menu-icon" /> */}
                        <Menu className="w-full h-full" />
                    </Button>
                </div>
            }
        >
            <Button onClick={() => handleNav('wish')} variant={'success'}>
                Wish list
            </Button>
            <Button onClick={() => handleNav('configuration')} variant={'success'}>
                Configuration
            </Button>
            <Button onClick={() => handleNav('favorite')} variant={'success'}>
                FAQ
            </Button>
        </SheetMenu>
    );
};

export default NavMenu;
