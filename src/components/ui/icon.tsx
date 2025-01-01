
import clsx from 'clsx'
import { FC, ImgHTMLAttributes } from 'react'


interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
	width?: string,
	height?: string,
	fill?: string
}
const Icon: FC<IconProps> = ({ width = 12, height = 12, fill, ...props }) => {
	return (
		<div style={{ height: `${height}px`, width: `${width}px` }} className={clsx(fill, 'flex justify-center items-center ')}>
			<img className={clsx('w-full h-auto')} {...props} src={props.src} alt={props.alt} />
		</div>
	)

}

export default Icon