import clsx from 'clsx'
import { FC } from 'react'
import ContentLoader from 'react-content-loader'

type LoaderProps = {
	width?: number
	height?: number
	speed?: number
	isResponsive?: boolean
}

const DLoader: FC<LoaderProps> = ({ height = 400, speed = 2, width = 200, isResponsive }) => (
	<ContentLoader
		speed={speed}
		width={isResponsive ? '100%' : width}
		height={isResponsive ? '100%' : height}
		preserveAspectRatio="xMidYMid meet"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		className={clsx({ 'h-full ': isResponsive })}
	>
		<rect x="0" y="0" rx="5" ry="5" width={isResponsive ? '100%' : String(width)} height={isResponsive ? '100%' : String(height)} />
	</ContentLoader >
)
export default DLoader