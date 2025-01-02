import UiComponentContainer from '../ui/ui-component-container'
import FilterActiveBar from '../FilterActiveBar/FilterActiveBar'
import clsx from 'clsx'

const MainStoreGrid = () => {
	return (
		<UiComponentContainer className={clsx('col-span-10 row-start-2 col-start-3 row-span-2 flex justify-start items-center  max-h-12 box-content')}>
			<FilterActiveBar activeFilters={[{ slug: "Gray" }, { slug: "Cast" }, { slug: "Audi" }, { slug: "Min" }, { slug: "Max" }]} />
		</UiComponentContainer>
	)
}

export default MainStoreGrid