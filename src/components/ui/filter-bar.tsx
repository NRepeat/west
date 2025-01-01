import { FC, HTMLAttributes } from "react"
import UiComponentContainer from "./ui-component-container"
import clsx from "clsx"

interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
	type?: boolean
}

const FilterBar: FC<FilterBarProps> = (props) => {
	return (
		<UiComponentContainer className={clsx(props.className, '')}>
			{props.children}
		</UiComponentContainer>
	)
}

export default FilterBar