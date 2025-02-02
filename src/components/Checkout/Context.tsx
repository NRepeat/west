import React, { createContext } from 'react'
import { create } from 'zustand'
import { ProductT } from '../ui/product-card'



type CheckoutContextType = {
	products: ProductT[] | null,
	contactInfo: {
		telephone: string,
		email: string,
		name: string,
		lastName: string,
	} | null,
	deliveryInfo: {
		address: string,
		postalCode: string,
		city: string,
		country: string,
	} | null
	shipping: {
		method: string,
		department: string,
		pickUpPoint: string,
	} | null
}
type Actions = {
	setContactInfo: (contactInfo: CheckoutContextType['contactInfo']) => void,
	setAddress: (address: CheckoutContextType['deliveryInfo']) => void,
	setShipping: (shipping: CheckoutContextType['shipping']) => void,
	addProduct: (product: ProductT) => void,
	removeProduct: (product: ProductT) => void,

}
const useCheckoutState = create<CheckoutContextType & Actions>((set) => ({
	setContactInfo: (contactInfo) => set({ contactInfo }),
	setAddress: (deliveryInfo) => set({ deliveryInfo }),
	setShipping: (shipping) => set({ shipping }),
	addProduct: (product) => set((state) => ({ products: [...state.products!, product] })),
	removeProduct: (product) => set((state) => ({ products: state.products!.filter((p) => p.slug !== product.slug) })),
	contactInfo: null,
	deliveryInfo: null,
	products: null,
	shipping: null,
}))
const CheckoutContext = createContext<CheckoutContextType | null>(null)

const Context = ({ children }: { children: React.ReactNode }) => {

	return (
		<CheckoutContext.Provider value={useCheckoutState.getState()}>
			{children}
		</CheckoutContext.Provider>
	)
}

export default Context