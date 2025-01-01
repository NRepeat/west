import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'


interface WrapperProps extends HTMLAttributes<HTMLDivElement> { }

const Wrapper: FC<WrapperProps> = (props) => {
	return (
		<div {...props} className={clsx(props.className, 'px-2.5 py-2.5 grid grid-cols-2  gap-5 [grid-template-rows:40px_auto]')}>{props.children}</div>
	)
}

export default Wrapper