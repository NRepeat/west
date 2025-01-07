import React from 'react'

type PropType = {
	selected: boolean
	index: number
	slide: React.ReactNode
	onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
	const { selected, index, slide, onClick } = props

	return (
		<div
			className={'embla-thumbs__slide'.concat(
				selected ? ' embla-thumbs__slide--selected' : ''
			)}
		>
			<button
				onClick={onClick}
				className="embla-thumbs__slide__number"
			>
				{slide}
			</button>
		</div>
	)
}
