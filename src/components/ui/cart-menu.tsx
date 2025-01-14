import { AudiImg, CartIcon } from '../../assets';
import CartMenuCard from '../CartMenuCard/CartMenuCard';
import SheetMenu from '../Menu/Menu';
import { Button } from './button';
import Icon from './icon';
const CartMenu = () => {
    return (
        <div className="flex gap-4 justify-end px-2.5">
            <SheetMenu
                className="bg-input overflow-auto min-w-[500px]"
                side={'right'}
                header="Cart"
                footer={<CartButton price={4 * 200} />}
                trigger={
                    <div className="font-SignPainter flex justify-start items-center">
                        <Button variant={'ghost'}>
                            <Icon src={CartIcon} height="30" width="30" alt="cart-icon" />
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
const CartButton = ({ price }: { price: number }) => (
    <div className="w-full flex items-center justify-center ">
        <Button
            className="flex p-0 gap-0 w-4/5 rounded-sm overflow-hidden h-16"
            variant={'success'}
        >
            <p className="flex text-center justify-center w-full">Process checkout</p>
            <div className="bg-black flex text-left w-full h-full justify-center items-center ">
                {price}$
            </div>
        </Button>
    </div>
);
export default CartMenu;
