import React, { FC } from 'react'

interface ContainerProps{
	children?:React.ReactNode
}

const Container:FC<ContainerProps> = ({children}) => {
		return (
				<div className='bg-backgroundContainer px-10 py-[5px]'>{children}</div>
		)
}

export default Container