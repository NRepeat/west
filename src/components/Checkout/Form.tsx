import React, { FC } from 'react'
import RVForm from '../ui/form'
import { useForm } from '@rvf/react'
import { withZod } from '@rvf/zod'
import { z } from 'zod';
import { useBoxStore } from '@/store/disk-store';
import ProductCard from '../ui/product-card';
import { ProductT } from '@/shared/types';
export enum Steps {
	products,
	info,
	payment,
}
type FormPros = {
	param: string | undefined
}
const Form: FC<FormPros> = ({ param }) => {
	const step = Steps[param as keyof typeof Steps]
	const validator = withZod(
		z.object({
			value: z.string().min(1),
		}),
	);
	const form = useForm({
		validator,
	});
	return (
		<RVForm form={form} className='flex gap-2.5'>
			{step === Steps.products && <Products />}
			{step === Steps.info && <div>Delivery Info</div>}
			{step === Steps.payment && <div>Payment</div>}
			<Recept />
		</RVForm>
	)
}
const Recept = () => {

	return <div>Recept</div>
}
const Products = () => {
	const products: ProductT[] = useBoxStore((state) => state.disks);
	return <div className="grid  grid-cols-12 justify-start w-full gap-4  pt-2 ">
		{products.map((product) => (
			<ProductCard
				isWishCard={true}
				key={product.slug}
				isHorizontal={true}
				product={product}
			/>
		))}
	</div>
}

const Payment = () => {
	return <div>Payment</div>
}
export default Form