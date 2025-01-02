import UiComponentContainer from '../ui/ui-component-container'
import FilterActiveBar from '../FilterActiveBar/FilterActiveBar'
import clsx from 'clsx'

const MainStoreGrid = () => {
	return (
		<UiComponentContainer className={clsx(' col-span-9 col-start-4 flex justify-start items-center  max-h-12 box-content ')}>
			<FilterActiveBar activeFilters={[{ slug: "Gray" }, { slug: "Cast" }, { slug: "Audi" }, { slug: "Min" }, { slug: "Max" }]} />
		</UiComponentContainer>
	)
}

export default MainStoreGrid