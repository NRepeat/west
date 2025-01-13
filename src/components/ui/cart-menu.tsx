import { CartIcon, WishListIcon } from '../../assets'
import { Button } from './button'
import Icon from './icon'
const CartMenu = () => {
  return (
    <div className='flex gap-4 justify-end'>
      <Button variant={'ghost'}>
        <Icon src={WishListIcon} height='30' width='30' alt='wish-list-icon' />
      </Button>
      <Button variant={'ghost'}>
        <Icon src={CartIcon} height='30' width='30' alt='cart-icon' />
      </Button>
    </div>
  )
}

export default CartMenu
