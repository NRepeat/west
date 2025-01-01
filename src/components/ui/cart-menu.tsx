import WishListIcon from '../../assets/Bookmark.svg'
import CartIcon from '../../assets/Cart.svg'
import Button from './button'
const CartMenu = () => {
	return (
		<div className='flex gap-4 justify-end'>
			<Button className="gap-2">
				<img className="w-8 h-8" src={WishListIcon} alt="wish-list-icon" />
			</Button>
			<Button className="gap-2">
				<img className="w-8 h-8" src={CartIcon} alt="cart-icon" />
			</Button>
		</div>
	)
}

export default CartMenu