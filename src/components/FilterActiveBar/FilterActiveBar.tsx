import { CloseIcon } from '@/assets'
import ActiveFilterButton from '../ui/active-filter-button'
import Icon from '../ui/icon'

const FilterActiveBar = ({ activeFilters }: { activeFilters: { slug: string }[] }) => {
	const ActiveButtons = () => activeFilters.map(filter => <ActiveFilterButton key={filter.slug} slug={filter.slug} />)
	return (
		<div className='flex justify-between items-center gap-2 w-full px-2.5'>
			<div className='flex   items-center gap-2 w-full '>
				<ActiveButtons />
			</div>
			<Icon src={CloseIcon} width="25" height="25" />
		</div>
	)
}

export default FilterActiveBar