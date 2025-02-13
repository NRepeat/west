import { useSheetMenu } from '@/hooks/use-sheet-menu';
import CartMenuCard from '../CartMenuCard/CartMenuCard';
import SheetMenu from '../Menu/Menu';
import { Button } from './button';
import { LoaderIcon, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSessionStore } from '@/store/user-store';
import { useQuery } from '@tanstack/react-query';
import { ProductT } from '@/shared/types';
const CartMenu = () => {
    const state = useSessionStore((state) => state);
    const [isOpen, setIsOpen] = useSheetMenu();

    const cartQuery = useQuery({
        queryKey: ['getCart'], queryFn: async () => {
            const response = await fetch('http://localhost:3000/cart?cartId=' + state.userSession?.cartId)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json()
            state.setCart({ id: data.id, items: data.items })
            return data
        },
        enabled: isOpen
    })
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
                            <ShoppingCart className="w-8 h-8" />
                        </Button>
                    </div>
                }
            >
                {cartQuery.isFetching && <LoaderIcon className='animate-spin' />}
                {cartQuery.isSuccess && cartQuery.data.items.map((item: { uuid: string, quantity: number, product: ProductT, }) => <CartMenuCard key={item.uuid} quantity={item.quantity} img={item.product.thumbnail} price={item.product.price} slug={item.product.slug} title={item.product.slug} />)}
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
