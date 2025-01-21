import { useSheetMenu } from '@/hooks/use-sheet-menu';
import { AudiImg } from '../../assets';
import CartMenuCard from '../CartMenuCard/CartMenuCard';
import SheetMenu from '../Menu/Menu';
import { Button } from './button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
const CartMenu = () => {
    const [isOpen, setIsOpen] = useSheetMenu();
    return (
        <div className="flex gap-4 justify-end px-2.5">
            <SheetMenu
                onOpenChange={setIsOpen}
                open={isOpen}
                className="bg-input overflow-auto min-w-[500px]"
                side={'right'}
                header="Cart"
                footer={<CartButton price={4 * 200} onClick={setIsOpen} />}
                trigger={
                    <div className="font-SignPainter flex justify-start items-center px-2.5">
                        <Button variant={'ghost'} className="h-8 w-8 p-0 hover:bg-transparent">
                            {/* <Icon src={CartIcon} height="30" width="30" alt="cart-icon" /> */}
                            <ShoppingCart className="w-full h-full" />
                        </Button>
                    </div>
                }
            >
                <CartMenuCard
                    img={AudiImg}
                    price={200}
                    quantity={4}
                    slug="Anthracite-8.5-J-x-20-Audi-Q6"
                    title="Audi"
                />
                <CartMenuCard img={AudiImg} price={200} quantity={4} slug="Audi" title="Audi" />
                <CartMenuCard
                    img={AudiImg}
                    price={200}
                    quantity={4}
                    slug="Anthracite-8.5-J-x-20-Audi-Q6"
                    title="Audi"
                />
                <CartMenuCard
                    img={AudiImg}
                    price={200}
                    quantity={4}
                    slug="Anthracite-8.5-J-x-20-Audi-Q6"
                    title="Audi"
                />
                <CartMenuCard img={AudiImg} price={200} quantity={4} slug="Audi" title="Audi" />
            </SheetMenu>
        </div>
    );
};
const CartButton = ({ price, onClick }: { price: number; onClick: (value: false) => void }) => {
    const nav = useNavigate();
    const handleClick = () => {
        onClick(false);
        nav('/checkout');
    };
    return (
        <div className="w-full flex  bg-white">
            <Button
                className="flex p-0 gap-0  rounded-none overflow-hidden h-16  w-full"
                variant={'success'}
                onClick={() => handleClick()}
            >
                <p className="flex text-center flex-1 justify-center w-full">Process checkout</p>
                <div className="bg-black flex  flex-1 text-left w-full h-full justify-center items-center ">
                    {price}$
                </div>
            </Button>
        </div>
    );
};
export default CartMenu;
