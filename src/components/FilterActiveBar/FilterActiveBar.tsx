import ActiveFilterButton from '../ui/active-filter-button'

const FilterActiveBar = ({ activeFilters }: { activeFilters: { slug: string }[] }) => {
	const ActiveButtons = () => activeFilters.map(filter => <ActiveFilterButton key={filter.slug} slug={filter.slug} />)
	return (
		<div className='flex items-center gap-2'>
			<ActiveButtons />
		</div>
	)
}

export default FilterActiveBar