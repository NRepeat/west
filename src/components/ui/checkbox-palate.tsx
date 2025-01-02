import CheckboxFilterVariant, { FilterVariant } from './checkbox-filter-variant'
import { Card, CardContent } from './card'

const CheckboxPalate = ({ variants }: { variants: FilterVariant[] }) => {
	const MappedVariants = () => variants.map(variant => <CheckboxFilterVariant key={variant.id} variant={variant} />)
	return (
		<Card>
			<CardContent className='grid grid-cols-2 gap-4'>
				{variants && <MappedVariants />}
			</CardContent>
		</Card>
	)
}

export default CheckboxPalate