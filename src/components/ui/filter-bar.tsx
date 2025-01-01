import { FC, HTMLAttributes } from "react"
import UiComponentContainer from "./ui-component-container"

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {

}

const FilterBar: FC<FilterBarProps> = (props) => {
	return (
		<UiComponentContainer className={` ${props.className}`}>
			FilterBar
		</UiComponentContainer>
	)
}

export default FilterBar