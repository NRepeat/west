// VariantForm.tsx
import React from 'react'
import { useForm } from '@rvf/react'
import { withZod } from '@rvf/zod'
import z from 'zod'
import RVForm from './ui/form'
import { FromInput } from './ui/form-input'

const variantValidator = withZod(z.object({
	description: z.string().min(3).max(255),
	slug: z.string().min(3).max(255),
	images: z.array(z.string().url()),
	thumbnail: z.string().url(),
	price: z.coerce.number().min(0),
	width: z.coerce.number().min(3).max(255),
	weight: z.coerce.number().min(3).max(255),
	diameter: z.coerce.number().min(3).max(255),
	et: z.coerce.number().min(3).max(255),
	pcd: z.coerce.number().min(3).max(255),
	color: z.string().min(3).max(255),
}))

type VariantFormProps = {
	index: number
	variant: any
	onRemove: (index: number) => void
	onChange: (index: number, newVariant: any) => void
}

const VariantForm: React.FC<VariantFormProps> = ({ index, variant, onRemove, onChange }) => {
	const variantForm = useForm({
		validator: variantValidator,
		defaultValues: variant
	})

	return (
		<div className="variant-form">
			<RVForm form={variantForm}>
				<FromInput name={`description`} label="Variant Description" scope={variantForm.scope('description')} />
				<FromInput name={`slug`} label="Slug" scope={variantForm.scope('slug')} />
				<FromInput name={`thumbnail`} label="Thumbnail" scope={variantForm.scope('thumbnail')} />
				<FromInput name={`price`} label="Price" type="number" scope={variantForm.scope('price')} />
				<FromInput name={`width`} label="Width" type="number" scope={variantForm.scope('width')} />
				<FromInput name={`weight`} label="Weight" type="number" scope={variantForm.scope('weight')} />
				<FromInput name={`diameter`} label="Diameter" type="number" scope={variantForm.scope('diameter')} />
				<FromInput name={`et`} label="ET" type="number" scope={variantForm.scope('et')} />
				<FromInput name={`pcd`} label="PCD" type="number" scope={variantForm.scope('pcd')} />
				<FromInput name={`color`} label="Color" scope={variantForm.scope('color')} />
			</RVForm>
			{/* Remove variant button */}
			<button type="button" onClick={() => onRemove(index)} className="mt-2 text-red-600">Remove Variant</button>
		</div>
	)
}

export default VariantForm
